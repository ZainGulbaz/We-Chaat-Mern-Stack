import { Response, Request } from "express";
import User from "../Models/User";

const searchCont = async (req: Request, res: Response) => {
  const keyword = req.query.search
    ? {
        $or: [
          { email: { $regex: req.query.search, $options: "i" } },
          { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  try {
    let users = await User.find(keyword).find({ id: { $ne: req.body.authId } });
    console.log(users);
    if (users) {
      res.status(200).json({
        statusCode: 200,
        message: "The users have been found successfully",
        users,
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "There is no such user found",
      });
    }
  } catch (err) {
    res.status(200).json({
      statusCode: 404,
      message: "There is no such user found",
    });
  }
};

export default searchCont;
