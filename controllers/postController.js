import paymentModel from "../models/paymentModel.js";
import { userExelData } from "../models/postModel.js";

export const postExelData = async (req, res) => {
  try {
    const data = req.body;
    const response = await userExelData.insertMany(data, { ordered: false });

    if (!response) {
      return res.status(401).json({ message: "server error", success: false });
    }
    return res
      .status(200)
      .json({ message: "Data inserted successfully ✅", success: true });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getExelData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const response = await userExelData.find({}).skip(skip).limit(limit);
    console.log(response.length);
    const total = await userExelData.countDocuments();
    if (!response) {
      return res
        .status(401)
        .json({ message: "data not found", success: false });
    }
    return res.status(200).json({
      allExelData: response,
      page,
      hasMore: page * limit < total, // for infinite scroll
      message: "Data get successfully ✅",
      success: true,
    });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteByIdExelData = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const response = await userExelData.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(401)
        .json({ message: "data not found", success: false });
    }
    return res.status(200).json({
      message: "Delete Data successfully ✅",
      success: true,
    });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateByIdExelData = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const {
      Tender_ID,
      Location,
      Tender_Inviting_Authority,
      Description,
      Bid_Submit_Closing_Date,
    } = req.body;

    const response = await userExelData.findByIdAndUpdate(
      _id,
      {
        Location,
        Tender_ID,
        Tender_Inviting_Authority,
        Description,
        Bid_Submit_Closing_Date,
      },
      { new: true }
    );

    if (!response) {
      return res
        .status(401)
        .json({ message: "update data error", success: false });
    }

    return res.status(200).json({
      message: "update Data successfully ✅",
      success: true,
    });
  } catch (error) {
    console.error("update Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllExelData = async (req, res) => {
  try {
    const data = await userExelData.deleteMany();

    if (!data) {
      return res
        .status(401)
        .json({ message: "data not found", success: false });
    }

    return res.status(200).json({
      message: "delete all Data successfully ✅",
      success: true,
    });
  } catch (error) {
    console.error("delete Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
