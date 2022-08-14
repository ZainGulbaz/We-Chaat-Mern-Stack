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

const Message = mongoose.model("Message", messageSchema);

export default Message;
