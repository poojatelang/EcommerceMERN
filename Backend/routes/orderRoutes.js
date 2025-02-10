const express = require("express");
const {
  getOrders,
  getCartByUserId,
  addToOrder,
  removeFromOrder,
  updateOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getOrders);
router.route("/add").post(protect, addToOrder);
router.route("/remove/:id").delete(protect, removeFromOrder);
router.route("/update").patch(updateOrder);

module.exports = router;
