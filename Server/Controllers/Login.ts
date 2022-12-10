import { Response, Request } from "express";
import User from "../Models/User";
import bcrypt from "bcrypt";
import createWebToken from "../CreateToken";

//1-Find the user on the basis of email as it is unique
//2-Create Token and send it to the frontend if pass matches

const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    let isPass = bcrypt.compareSync(password, user.password);
    if (isPass) {
      res.status(200).json({
        statusCode: 200,
        message: "You are successfully login",
        token: createWebToken(user.id),
        isPass,
      });
    } else {
      res.status(200).json({
        statusCode: 404,
        message: "The password you provided is wrong",
      });
    }
  } else {
    res.status(200).json({
      statusCode: 404,
      message: "The email you provided is not registered",
    });
  }
};

export default login;
