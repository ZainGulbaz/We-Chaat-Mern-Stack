import User from "../Models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import createWebToken from "../CreateToken";

const userAuth = async (req: Request, res: Response) => {
  let { name, password, image, email } = req.body;
  if (!name || !password || !email) {
    res.status(200).json({
      statusCode: 400,
      message: "Kindly fill all the fields",
    });
  } else {
    //hash the password
    password = bcrypt.hashSync(password, 10);
    try {
      let user = await User.create({
        name,
        password,
        email,
        image,
      });
      if (user) {
        res.status(200).json({
          statusCode: 200,
          message: "The user has been created successfully",
          payload: {
            email,
            token: createWebToken(user.id),
          },
        });
      } else {
        res.status(200).json({
          statusCode: 400,
          message: "A user with this email is already registered",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(200).json({
        statusCode: 400,
        message: "User cannot be created",
      });
    }
  }
};

export default userAuth;
