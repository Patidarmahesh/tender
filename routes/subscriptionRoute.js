import express from "express";
import {
  createAndUpdateSubscription,
  deleteSubscriptionDetail,
  getSubscriptionDetail,
} from "../controllers/subscriptionController.js";
import userAuth from "../middleware/Authanticated.js";

const subscriptionRoute = express.Router();

subscriptionRoute.post(
  "/create-upadte-subscription",
  userAuth,
  createAndUpdateSubscription
);
subscriptionRoute.get("/get-all-subscription", getSubscriptionDetail);
subscriptionRoute.delete(
  "/delete-subscription/:id",
  userAuth,
  deleteSubscriptionDetail
);

export default subscriptionRoute;
