import { Router } from "express";
import { getChatRoomList, getMessages } from "../controllers/chatrooms.mjs";
import { protect } from "../middlewares/protect.mjs";

export const chatRouter = Router();

chatRouter.get("/list",[protect], getChatRoomList);
chatRouter.post("/messages",[protect], getMessages);
