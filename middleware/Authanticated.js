import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token",token)
    if (!token) {
      return res.status(401).json({
        message: "User node Authanticated!",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      console.log("decode");
      return res
        .cookie("token", "", {
          maxAge: 0,
        })
        .json({
          message: "Invalid token!",
          success: false,
        });
    }
    req.user = decode;
    next();
  } catch (error) {
    console.log("decode", error);
    return res
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Invalid token!",
        success: false,
      });
  }
};
export default userAuth;
