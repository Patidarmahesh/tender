import { Subscription } from "../models/subscriptionModel.js";

export const createAndUpdateSubscription = async (req, res) => {
  try {
    const { price, planType, details, name } = req?.body;
    if (!price || !planType || !details || !name) {
      return res.status(401).json({
        success: false,
        message: "Subscription is required",
      });
    }
    let response = await Subscription.findOne({ planType: planType });
    if (!response) {
      response = await Subscription.create({ ...req.body });
      if (!response) {
        return res.status(401).json({
          success: false,
          message: "subscription not create",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Subscription create successfully! ✅",
      });
    }
    (response.price = price),
      (response.planType = planType),
      (response.details = details);
    response.name = name;
    await response.save();
    return res.status(200).json({
      success: true,
      message: "Subscription update successfully! ✅",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriptionDetail = async (req, res) => {
  try {
    const response = await Subscription.find({});
    if (!response) {
      return res.status(401).json({
        success: false,
        message: "Subscription not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get all subscription detail successsfully",
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscriptionDetail = async (req, res) => {
  try {
    const {id} = req.params
    const response = await Subscription.findByIdAndDelete({_id:id});
    if (!response) {
      return res.status(401).json({
        success: false,
        message: "Subscription not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete subscription successsfully",
      response,
    });
  } catch (error) {
    console.log(error);
  }
};