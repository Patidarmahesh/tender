import mongoose from "mongoose";

let isConnected = false; // ✅ Prevent re-connecting every time

const connectDataBase = async (req, res) => {
  if (isConnected) {
    console.log("⚡ Already connected to MongoDB");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDataBase;
