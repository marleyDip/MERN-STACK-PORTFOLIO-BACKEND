import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
<<<<<<< HEAD

  if (!token) {
    return next(new ErrorHandler("User not Authenticated!", 400));
  }

=======
  if (!token) {
    return next(new ErrorHandler("User not Authenticated!", 400));
  }
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
