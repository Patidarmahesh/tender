import express from "express";
import {
  checkStatus,
  createOrder,
  getAllPayment,
  getKey,
  updatePaymentStatus,
  verifyPayment,
} from "../controllers/paymentController.js";
import userAuth from "../middleware/Authanticated.js";

const paymentRoute = express.Router();

paymentRoute.get("/get-key", userAuth, getKey);
paymentRoute.post("/create-order", userAuth, createOrder);
paymentRoute.post("/verify-payment", userAuth, verifyPayment);
paymentRoute.get("/all-payment", userAuth, getAllPayment);
paymentRoute.get("/check-payment-status", userAuth, checkStatus);
paymentRoute.post("/update-payment-status/:id", updatePaymentStatus);

export default paymentRoute;
