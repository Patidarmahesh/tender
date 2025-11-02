import { Contact } from "../models/contactModel.js";

export const createContactData = async (req, res) => {
  try {
    const { userName, subject, message, email } = req.body;
    if (!userName || !subject || !message || !email) {
      return res
        .status(401)
        .json({ message: "something is missing", success: false });
    }
    const response = await Contact.create(req.body);
    if (!response) {
      return res
        .status(401)
        .json({ message: "contact not add", success: false });
    }
    return res
      .status(200)
      .json({ message: "contact add successfully", success: true });
  } catch (error) {
    console.error("contact Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllContactData = async (req, res) => {
  try {
    const response = await Contact.find({});
    if (!response) {
      return res
        .status(401)
        .json({ message: "contact not found", success: false });
    }
    return res.status(200).json({
      message: "get all contact successfully",
      success: true,
      response,
    });
  } catch (error) {
    console.error("conatct Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllContactData = async (req, res) => {
  try {
    const response = await Contact.deleteMany();

    if (!response) {
      return res
        .status(401)
        .json({ message: "data not found", success: false });
    }

    return res.status(200).json({
      message: "contact all Data delete successfully",
      success: true,
    });
  } catch (error) {
    console.error("delete Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteByIdContactData = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const response = await Contact.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(401)
        .json({ message: "data not found", success: false });
    }
    return res.status(200).json({
      message: "contact data delete successfully",
      success: true,
    });
  } catch (error) {
    console.error("delete Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};