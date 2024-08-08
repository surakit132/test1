import express from "express";
import { authRouter } from "./routes/auth.mjs";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { chatRouter } from "./routes/chatroom.mjs";
import "./models/chatrooms.mjs";
import bodyParser from "body-parser";
import { petSitterProfileRouter } from "./routes/petSitterProfile.mjs";
import { petSitterBookingRouter } from "./routes/petSitterBooking.mjs";
import { petSitterPayoutRouter } from "./routes/petsitterPayout.mjs";
import { ChatRoom } from "./models/chatrooms.mjs";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.mjs";
import { bookingRouter } from "./routes/booking.mjs";
import bookingHistoryRouter from "./routes/bookingHistory.mjs"; // นำเข้า Route สำหรับ Booking History
import { handleImageUpload } from "./utils/image.mjs";
import sql from "./utils/db.mjs";
import cron from "node-cron";
import { userReview } from "./routes/review.mjs";

mongoose.connect(process.env.MONGODB_URL);
dotenv.config();

const app = express();
const port = 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/", petSitterProfileRouter);
app.use("/petsitter/booking", petSitterBookingRouter);
app.use("/petsitter/payout-option", petSitterPayoutRouter);
app.use("/booking-history", bookingHistoryRouter); // ใช้ Route สำหรับ Booking History
app.use("/bookings", bookingRouter);
app.use("/user", userRouter);
app.use("/review", userReview);

app.get("/test", (req, res) => {
  return res.json("Server API is working");
});

app.use("/chatrooms", chatRouter);

io.use((socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log("token invalid");
  }
});

const users = {};

io.on("connection", (socket) => {
  // console.log("a user connected:", socket.userId);
  users[socket.userId] = socket;

  socket.on("disconnect", () => {
    // console.log("user disconnected:", socket.userId);
  });

  socket.on(
    "sendMessage",
    async ({ chatRoomId, targetId, message, images }) => {
      if (message || images) {
        try {
          const newMessage = {
            message,
            senderId: Number(socket.userId),
            receiverId: targetId,
            isRead: false,
          };
          if (images) {
            const imageSrc = [];
            for (const img of images) {
              imageSrc.push(await handleImageUpload(img));
            }
            // console.log(imageSrc)
            newMessage.images = imageSrc;
          }
          const reverseChatRoomId = chatRoomId.split("/").reverse().join("/");
          const chatRoom = await ChatRoom.findOneAndUpdate(
            {
              $or: [
                { chatRoomId: chatRoomId },
                { chatRoomId: reverseChatRoomId },
              ],
            },
            { $push: { messages: newMessage } },
            { new: true, upsert: true }
          );
          const newChatRoom = chatRoom.chatRoomId;
          io.to(chatRoom.chatRoomId).emit("newMessage", {
            newMessage,
            newChatRoom,
          });
          users[String(targetId)].emit("countMessage", {
            newMessage,
            newChatRoom,
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    }
  );

  socket.on("joinRoom", async ({ chatRoomId, targetId, isReadCount }) => {
    try {
      const reverseChatRoomId = chatRoomId.split("/").reverse().join("/");
      const chatRoom = await ChatRoom.findOne({
        $or: [{ chatRoomId: chatRoomId }, { chatRoomId: reverseChatRoomId }],
      });
      if (chatRoom) {
        if (isReadCount) {
          await ChatRoom.updateMany(
            {},
            {
              $set: { "messages.$[].isRead": true },
            }
          );
        }
        socket.join(chatRoom.chatRoomId);
        io.to(socket.id).emit("joinOneRoom");
      } else {
        const newChatRoomId = `${socket.userId}/${targetId}`;
        const newChatRoom = new ChatRoom({
          chatRoomId: newChatRoomId,
          messages: [],
          users: [Number(socket.userId), Number(targetId)],
        });
        await newChatRoom.save();
        socket.join(newChatRoomId);
        io.to(socket.id).emit("roomCreated", { newChatRoomId, targetId });
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  });
  socket.on("readMessage", async ({ messageIndex, chatRoomId }) => {
    const updateQuery = {};
    updateQuery[`messages.${messageIndex}.isRead`] = true;

    await ChatRoom.findOneAndUpdate(
      { chatRoomId: chatRoomId },
      { $set: updateQuery }
    );
  });
});

function convertToGMT7(date) {
  const dateInGMT7 = new Date(date.getTime());
  return dateInGMT7;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function formatTime(date) {
  return date.toTimeString().split(" ")[0];
}

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

cron.schedule("* * * * *", async () => {
  try {
    const currentDate = new Date();
    const zonedDate = convertToGMT7(currentDate);
    const targetDate = addHours(zonedDate, 2);
    const formattedDate = formatDate(targetDate);
    const formattedTime = formatTime(targetDate);

    const bookings = await sql`
      SELECT * FROM bookings
      WHERE status = 'Waiting for confirm'
      AND booking_date = ${formattedDate}
      AND booking_time_start < ${formattedTime}
    `;

    for (const booking of bookings) {
      await sql`
        UPDATE bookings
        SET status = 'Canceled'
        WHERE id = ${booking.id}
      `;
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
  }
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
