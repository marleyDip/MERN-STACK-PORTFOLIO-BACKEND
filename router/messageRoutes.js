import express from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", getAllMessages);
router.delete("/delete/:id", isAuthenticated, deleteMessage);

export default router;
