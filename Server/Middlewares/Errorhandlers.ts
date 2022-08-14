import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(
    `Not Found - ${req.protocol + "://" + req.get("host") + req.originalUrl}`
  );
  res.status(404);
  next(error);
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(res.statusCode);
  res.json({
    message: error.message,
  });
};
