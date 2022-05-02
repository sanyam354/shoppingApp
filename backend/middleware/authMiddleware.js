const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asynchandler = require("express-async-handler");

const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decode.id).select("-password");
      // console.log("req.user from authMiddleWare", req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send("Not Authorized User");
    }

  if (!token) {
    res.status(401).send("Not Authorized, Token not Found");
  }
});

module.exports = { protect };
