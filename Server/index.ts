import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
