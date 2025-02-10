
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Bearer <token>'
  }
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    console.log("before decoded");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    // Find the user associated with the token and attach it to the request object
    req.user = await User.findById(decoded.id).select("-password");
    console.log(req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
