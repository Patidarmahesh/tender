import Razorpay from "razorpay";
import crypto from "crypto";
import paymentModel from "../models/paymentModel.js";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { plan, amount, currency } = req.body;
    const options = {
      amount: Number(amount) * 100,
      currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };
    const order = await razorpay.orders.create(options);
    const payment = new paymentModel({
      // razorpay_payment_id: order.razorpay_payment_id,
      razorpay_order_id: order.id,
      planType: plan,
      userId: req?.user.userId,
      currency,
      status: "pending",
      amount,
    });
    await payment.save();
    if (!payment) {
      return res.status(401).json({ success: false, message: "payment error" });
    }
    return res
      .status(200)
      .json({ order, success: true, message: "payment create sucessfully" });
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    const payment = await paymentModel.findOne({
      razorpay_order_id: razorpay_order_id,
    });
    if (!payment) {
      return res.status(401).json({ success: false, message: "payment error" });
    }
    const duration =
      payment.planType === "3month"
        ? 90
        : payment.planType === "1month"
        ? 30
        : payment.planType === "6month"
        ? 180
        : 365;
    payment.razorpay_signature = razorpay_signature;
    (payment.razorpay_payment_id = razorpay_payment_id),
    (payment.status = "paid");
    payment.activeStatus = true;
    payment.startDate = new Date();
    payment.endDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
    await payment.save();
    res.json({
      success: true,
      message: "Payment Verified & Subscription Activated",
    });
  } else {
    const payment = await paymentModel.findOne({
      razorpay_order_id: razorpay_order_id,
    });
    payment.activeStatus = false;
    payment.status = "failed";
    await payment.save();
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }
};

export const getAllPayment = async (req, res) => {
  try {
    const response = await paymentModel
      .find({})
      .populate({ path: "userId", select: "userName mobileNumber email role" });
    if (!response) {
      return res
        .status(401)
        .json({ message: "No Subscription Found", success: false });
    }
    return res.status(200).json({
      message: "Get All Payment Found",
      success: true,
      payment: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export async function checkStatus(req, res) {
  try {
    const { userId } = req.user;
    const response = await paymentModel.findOne({
      $and: [
        {
          userId: userId,
        },
        {
          activeStatus: true,
        },
      ],
    });
    if (!response) {
      return res.status(401).json({
        success: false,
        message: "Status Not Found!!",
      });
    }
    return res.status(200).json({
      success: true,
      response,
      message: "Status Found Successfullly!!",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updatePaymentStatus(req, res) {
  try {
    const {id:_id} = req.params
    const response = await paymentModel.findByIdAndUpdate(
      _id,
      {
        activeStatus: req.body.activeStatus,
      },
      { new: true }
    );
    if (!response) {
      return res.status(401).json({
        success: false,
        message: "Status Not Update!!",
      });
    }
    return res.status(200).json({
      success: true,
      response,
      message: "Status Update Successfullly!!",
    });
  } catch (error) {
    console.log(error);
  }
}

export const getKey = async (req, res) => {
  return res
    .status(200)
    .json({ message: "key is geted", key: process.env.RAZORPAY_KEY_ID });
};
