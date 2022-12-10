import express from "express";

declare global {
  namespace Express {
    interface Request {
      name: string;
      password: string;
      email: string;
      image: string;
      id: number;
      user: {
        id: number;
      };
    }
  }
}
