import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

// const userAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log("token",token)
//     if (!token) {
//       return res.status(401).json({
//         message: "User node Authanticated!",
//         success: false,
//       });
//     }
//     const decode = await jwt.verify(token, process.env.SECRET_KEY);
//     if (!decode) {
//       console.log("decode");
//       return res
//         .cookie("token", "", {
//           maxAge: 0,
//         })
//         .json({
//           message: "Invalid token!",
//           success: false,
//         });
//     }
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log("decode", error);
//     return res
//       .cookie("token", "", {
//         maxAge: 0,
//       })
//       .json({
//         message: "Invalid token!",
//         success: false,
//       });
//   }
// };
// export default userAuth;

const userAuth = async (req, res, next) => {
  try {
    // 1️⃣ Header se token nikaalo
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid format!",
        success: false,
      });
    }
    // 2️⃣ Token ko split karo
    const token = authHeader.split(" ")[1];

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token!",
        success: false,
      });
    }
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token!",
      success: false,
      error: error.message,
    });
  }
};
export default userAuth;
