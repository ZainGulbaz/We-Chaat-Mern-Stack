import mongoose from "mongoose";

const { ObjectId: objectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    sender: { type: objectId, ref: "User" },
    content: { type: String, trim: true },
    Chat: { type: objectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = new mongoose.Model("Message", messageSchema);

export default Message;
