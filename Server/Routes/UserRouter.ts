import express from "express";
import userAuth from "../Controllers/UserAuth";
import login from "../Controllers/Login";
import searchCont from "../Controllers/Search";
import authMiddleware from "../Middlewares/AuthMiddleware";

const userRouter = express.Router();

userRouter.post("/api/signup", userAuth);
userRouter.post("/api/login", login);
userRouter.get("/api/users", authMiddleware, searchCont);

export default userRouter;
