import mongoose from "mongoose";

const ExcelDataSchema = new mongoose.Schema(
  { data: mongoose.Schema.Types.Mixed },
  { strict: false }
);
export const userExelData = mongoose.model("Exel", ExcelDataSchema);

// export const User = mongoose.model("User", postSchema);
