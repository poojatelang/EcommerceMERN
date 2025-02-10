const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    // Fetch all orders and populate user and products
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.productId", "name price");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create an Order
exports.addToOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      products: req.body.payload.products,
      address: req.body.payload.address,
      paymentMethod: req.body.payload.paymentMethod,
      totalAmount: req.body.payload.totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

exports.updateOrder = async (req, res) => {
  console.log(req.body);
  const { data, currentOrderId } = req.body;
  console.log("updataord", data);
  console.log("cuuordid", currentOrderId);
  try {
    const order = await Order.findOne({ _id: currentOrderId });
    console.log(order);
    if (order) {
      order.address.fullName = data.fullName;
      order.address.street = data.street;
      order.address.city = data.city;
      order.address.postalCode = data.postalCode;
      order.address.country = data.country;
      order.orderStatus = data.orderStatus;
      await order.save();
      res.json({ message: "Order updated" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an Order
exports.removeFromOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
