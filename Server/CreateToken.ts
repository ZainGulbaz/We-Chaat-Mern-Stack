import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import mongoose from "mongoose";

const createWebToken = (id: mongoose.Schema.Types.ObjectId) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET + "", {
    expiresIn: "30d",
  });
};

export default createWebToken;
