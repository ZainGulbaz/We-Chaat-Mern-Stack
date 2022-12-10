import { Request, Response } from "express";
import Chat from "../Models/Chat";
import User from "../Models/User";

const accessChats = async (req: Request, res: Response) => {
  try {
    const { userId, authId } = req.body;
    if (!userId) {
      return res.status(200).send({
        statusCode: 404,
        message: "The user id is not send in the params",
      });
    }

    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: authId } } },
        {
          users: { $elemMatch: { $eq: userId } },
        },
      ],
    })
      .populate("users", "-password")
      .populate("latest_message");

    let _chat = await User.populate(chat, {
      path: "latest_message.sender",
      select: "name pic email",
    });

    if (_chat.length > 0) {
      res.status(200).send(_chat[0]);
    } else {
      const chatObj = {
        chatName: "sender",
        users: [userId, authId],
        isGroupChat: false,
      };
      let createdChat = await Chat.create(chatObj);
      let fullChat = await Chat.findById({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    }
  } catch (err) {
    res.json({
      statusCode: 200,
      message: err,
    });
  }
};
export default accessChats;
