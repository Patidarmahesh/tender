import express from "express";
import { company_Registration, createServiceData, fSSAI_Registration, getAll_Digital_Signature_Registration, getAll_GST_Registration, getAll_MSME_Registration, getAll_PaN_TaN_Registration, getAll_PWD_License_Registration, getAllService, gumastaLisence_Registration, partnership_Registration, proprietorship_Registration, startup_Registration } from "../controllers/serviceController.js";

const serviceRoute = express.Router();

serviceRoute.route("/create-service").post(createServiceData);
serviceRoute.route("/all-service").get(getAllService);
serviceRoute.route("/pan-tan-registration").get(getAll_PaN_TaN_Registration);
serviceRoute.route("/gst-registration").get(getAll_GST_Registration);
serviceRoute.route("/msme-registration").get(getAll_MSME_Registration);
serviceRoute.route("/digital-signature-registration").get(getAll_Digital_Signature_Registration);
serviceRoute.route("/pwd-license-registration").get(getAll_PWD_License_Registration);
serviceRoute.route("/fssai-registration").get(fSSAI_Registration);
serviceRoute.route("/gumastaLisence-registration").get(gumastaLisence_Registration);
serviceRoute.route("/startup-registration").get(startup_Registration);
serviceRoute.route("/proprietorship-registration").get(proprietorship_Registration);
serviceRoute.route("/company-registration").get(company_Registration);
serviceRoute.route("/partnership-registration").get(partnership_Registration);





export default serviceRoute;
