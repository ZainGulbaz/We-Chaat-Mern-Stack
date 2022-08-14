import express from "express";
import userAuth from "../Controllers/UserAuth";

const userRouter = express.Router();

userRouter.post("/signup", userAuth);

export default userRouter;
