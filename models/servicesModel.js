import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    message: { type: String },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    PAN_TAN_Registration: {
      type: String,
    },
    GST_Registration: {
      type: String,
    },
    Digital_Signature: {
      type: String,
    },
    MSME_Registration: {
      type: String,
    },
    PWD_License_Registration: {
      type: String,
    },
    Partnership_Registration: {
      type: String,
    },
    Company_Registration: {
      type: String,
    },
    Startup_Registration: {
      type: String,
    },
    Gumasta_Registration: {
      type: String,
    },
    Proprietorship_Registration: {
      type: String,
    },
    FSSAI_Registration: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
