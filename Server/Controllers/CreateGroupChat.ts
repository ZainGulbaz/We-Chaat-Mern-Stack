import { Response, Request } from "express";
import Chat from "../Models/Chat";

const createGroupChat = async (req: Request, res: Response) => {
  try {
    let { users, authId, name } = req.body;
    users = JSON.parse(users);

    if (!users) {
      return res.json({ message: "Kindly fill all fields" });
    } else if (users.length < 2) {
      return res.json({ message: "The users should be more than two" });
    }
    users.push(authId);
    const chatObj = {
      is_group_chat: true,
      users,
      group_admin: authId,
      chat_name: name,
    };
    let groupChat = await Chat.create(chatObj);
    let result = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("group_admin", "-password");
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};
export default createGroupChat;
