import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  planType: {
    type: String,
    enum: ["1month", "3month", "6month", "12month"],
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
   name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
