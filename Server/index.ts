import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";
import connectDatabase from "./db";
import userRouter from "./Routes/UserRouter";
import { notFound, errorHandler } from "./Middlewares/Errorhandlers";

const app: Express = express();

//Middlewares
app.use(express.json());
app.use(cors());

//connect Datbase
connectDatabase();

//Routes
app.use(userRouter);

//Error handling
app.use(notFound);
app.use(errorHandler);

//add event listener to the PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`CONNECTED TO PORT: ${port}`));
