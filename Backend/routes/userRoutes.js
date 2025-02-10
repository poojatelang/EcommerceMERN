const express = require("express");
const {
  register,
  login,
  verifyToken,
  adminOnly,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/dashboard", verifyToken, adminOnly, (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
