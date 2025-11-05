// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import connectDataBase from "./connectDb/index.js";
// import userRoute from "./routes/userRoute.js";
// import postRoute from "./routes/postRoute.js";
// import contactRoute from "./routes/contactRoute.js";
// import serviceRoute from "./routes/serviceRoute.js";
// import paymentRoute from "./routes/paymentRoutes.js";
// import subscriptionRoute from "./routes/subscriptionRoute.js";

// dotenv.config({});
// const app = express();
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// const PORT = process.env.PORT;

// // const corsOption = {
// //   origin: "http://localhost:5173",
// //   // origin: "*",
// //   credentials: true,
// // };

// const corsFrontend = cors({
//   origin:["https://tender-frontend-five.vercel.app", "http://localhost:5173"],
//   credentials: true,
// });

// // const corsRazorpay = cors({ origin: "*", credentials: false });
// // app.use(cors(corsOption));

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/post", postRoute);
// app.use("/api/v1/contact", contactRoute);
// app.use("/api/v1/service", serviceRoute);
// app.use("/api/v1/payment", paymentRoute);
// app.use("/api/v1/subscription",subscriptionRoute)

// app.listen(PORT, () => {
//   connectDataBase();
//   console.log(`server listen at port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDataBase from "./connectDb/index.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import contactRoute from "./routes/contactRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import paymentRoute from "./routes/paymentRoutes.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";

dotenv.config();

const app = express();

// ✅ Start server

const PORT = process.env.PORT || 10000; // default fallback for Render

const allowedOrigins = [
  "http://localhost:5173",
  "https://tender-frontend-five.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Handle preflight requests explicitly
// app.options("*", cors());

// ✅ Core middlewares
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDataBase();


// ✅ Default home route to confirm deployment
app.get("/", (req, res) => {
  res.send("✅ Tender Backend is running successfully on Render!");
});

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/subscription", subscriptionRoute);

// ✅ Start server
// connectDataBase();
// app.listen(PORT, () => {
//   connectDataBase();
//   console.log(`🚀 Server running on port ${PORT}`);
// });

export default app;
