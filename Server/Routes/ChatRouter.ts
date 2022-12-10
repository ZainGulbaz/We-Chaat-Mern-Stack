import express from "express";
import authMiddleware from "../Middlewares/AuthMiddleware";
import accessChats from "../Controllers/AccessChats";
import fetchChats from "../Controllers/FetchChats";
import createGroupChat from "../Controllers/CreateGroupChat";

const chatRouter = express.Router();

chatRouter.post("/api/chats", authMiddleware, accessChats);
chatRouter.get("/api/chats", authMiddleware, fetchChats);
chatRouter.post("/api/group/create", authMiddleware, createGroupChat);
// chatRoutes.put("/api/group/rename", authMiddleware, renameGroup);
// chatRoutes.put("/api/group/remove", authMiddleware, removeFromGroup);
// chatRoutes.put("api/group/add", authMiddleware, addToGroup);

export default chatRouter;
