import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    senderId: {
        type: Number,
        require: true
    },
    receiverId: {
        type: Number,
        require: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    images: {
        type: [String],
        default: []
    }
})

const chatSchema = new mongoose.Schema({
    chatRoomId: {
        type: String,
        require: true,
        unique: true
    },
    messages: [messageSchema],
    users: [Number]
})

export const ChatRoom = mongoose.model('ChatRoom', chatSchema);

