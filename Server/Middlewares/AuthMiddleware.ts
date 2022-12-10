import jwt from "jsonwebtoken";
import User from "../Models/User";
import { Response, NextFunction, Request } from "express";
import "dotenv/config";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.header("authorization")?.startsWith("Bearer") &&
      req.header("authorization")
    ) {
      let token: string = req.header("authorization")?.split(" ")[1] + "";

      let decoded: any = jwt.verify(token, process.env.JWT_SECRET + "");

      interface UserInterface {
        name: string;
        email: string;
        password: string;
        image: string;
      }
      let user: UserInterface | null = await User.findById(decoded.id);
      if (user?.password) {
        req.body.authId = decoded.id;
        next();
      } else {
        res.status(200).json({
          statusCode: 400,
          message: "Authorization Failed! No user found",
        });
      }
    } else {
      res.status(200).json({
        statusCode: 400,
        message: "Authorization Failed! No token found",
      });
    }
  } catch (err) {
    res.status(200).json({
      statusCode: 400,
      message: err,
    });
  }
};

export default authMiddleware;
