import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// Send Message

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, email, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const data = await Message.create({ senderName, subject, email, message });
  res.status(200).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

// Delete Message

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }

  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: "Message Deleted",
  });
});

// Get All Message

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
