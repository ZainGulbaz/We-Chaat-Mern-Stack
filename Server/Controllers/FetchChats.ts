import { Request, Response } from "express";
import Chat from "../Models/Chat";
import User from "../Models/User";

const fetchChats = async (req: Request, res: Response) => {
  try {
    const { authId } = req.body;

    let chats = await Chat.find({ users: { $elemMatch: { $eq: authId } } })
      .populate("users", "-password")
      .populate("group_admin", "-password")
      .populate("latest_message")
      .sort({ updatedAt: -1 });
    let result = await User.populate(chats, {
      path: "latest_message.sender",
      select: "name pic email",
    });
    res.json(result);
  } catch (err: any) {
    res.json(err);
  }
};

export default fetchChats;
