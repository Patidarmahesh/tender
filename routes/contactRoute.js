import express from "express";
import { createContactData, deleteAllContactData, deleteByIdContactData, getAllContactData } from "../controllers/contactController.js";

const contactRoute = express.Router();

contactRoute.route("/create-contact").post(createContactData);
contactRoute.route("/get-contact").get(getAllContactData);
contactRoute.route("/delete-contact-data/:id").delete(deleteByIdContactData);
contactRoute.route("/delet-all-exel-data").delete(deleteAllContactData);


export default contactRoute;
