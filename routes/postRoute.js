import express from "express";
import userAuth from "../middleware/Authanticated.js";
import { deleteAllExelData, deleteByIdExelData, getExelData, postExelData, updateByIdExelData } from "../controllers/postController.js";

const postRoute = express.Router();

postRoute.route("/exelData").post(postExelData);
postRoute.route("/getExelData").get(getExelData);
postRoute.route("/delete-exel-data/:id").delete(deleteByIdExelData);
postRoute.route("/update-exel-data/:id").put(updateByIdExelData);
postRoute.route("/delet-all-exel-data").delete(deleteAllExelData);


export default postRoute;
