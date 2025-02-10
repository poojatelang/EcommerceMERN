const express = require("express");
const {
  getCartByUserId,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:userId").get(protect, getCartByUserId);
router.route("/add").post(protect, addToCart);
router.route("/remove").delete(protect, removeFromCart);
router.route("/update").patch(protect, updateQuantity);

module.exports = router;
