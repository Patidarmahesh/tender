import { Service } from "../models/servicesModel.js";

export const createServiceData = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res
        .status(401)
        .json({ success: false, message: "something is missing" });
    }
    const response = await Service.create(data);

    if (!response) {
      return res.status(401).json({ message: "server error", success: false });
    }
    return res
      .status(200)
      .json({ message: "service inserted successfully", success: true });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllService = async (req, res) => {
  try {
    const allService = await Service.find({});
    if (!allService) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all service",
      allService,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAll_PaN_TaN_Registration = async (req, res) => {
  try {
    const service = await Service.find({
      PAN_TAN_Registration: "PAN_TAN_Registration",
    });
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all PAN_TAN_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAll_Digital_Signature_Registration = async (req, res) => {
  try {
    const service = await Service.find({
      Digital_Signature: "Digital_Signature",
    });
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all PAN_TAN_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAll_GST_Registration = async (req, res) => {
  try {
    const service = await Service.find({
      GST_Registration: "GST_Registration",
    });
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all GST_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAll_MSME_Registration = async (req, res) => {
  try {
    const service = await Service.find({MSME_Registration:"MSME_Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all MSME_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAll_PWD_License_Registration = async (req, res) => {
  try {
    const service = await Service.find({PWD_License_Registration:"PWD_License_Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all PWD_License_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fSSAI_Registration = async (req, res) => {
  try {
    const service = await Service.find({FSSAI_Registration:"FSSAI Registration / License"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all FSSAI_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const gumastaLisence_Registration = async (req, res) => {
  try {
    const service = await Service.find({Gumasta_Registration:"Shop & Establishment Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all GumastaLisence_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const startup_Registration = async (req, res) => {
  try {
    const service = await Service.find({Startup_Registration:"Startup_Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all startup_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const proprietorship_Registration = async (req, res) => {
  try {
    const service = await Service.find({Proprietorship_Registration:"Proprietorship Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all Proprietorship_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const company_Registration = async (req, res) => {
  try {
    const service = await Service.find({Company_Registration:"Company Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all Company_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};

export const partnership_Registration = async (req, res) => {
  try {
    const service = await Service.find({Partnership_Registration:"Partnership_Registration"});
    if (!service) {
      return res.status(401).json({
        success: false,
        message: "service not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all Partnership_Registration",
      service,
    });
  } catch (error) {
    console.log(error);
  }
};
