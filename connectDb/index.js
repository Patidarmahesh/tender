import mongoose from "mongoose";

const connectDataBase = async (req, res) => {
  if (mongoose.connection.readyState >= 1) {
    console.log("⚡ Already connected to MongoDB");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDataBase;
