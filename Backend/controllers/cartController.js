const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Fetch the cart for the given userId and populate product details
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.productId",
      "name price description image stock color brand category"
    );

    if (!cart) {
      // If no cart exists for the user, return an empty array
      return res.status(200).json({
        message: "User does not have any cart items",
        // items: []
      });
    }

    // Return the cart items associated with this user and the product details
    res.status(200).json({
      message: "Cart items retrieved successfully",
      items: cart.items, // This will include the populated product details
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userIdStr = req.user._id;
    const cart = await Cart.findOne({ user: userIdStr });
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
        });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        user: userIdStr,
        items: [{ productId, quantity }],
      });
      await newCart.save();
    }

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  console.log(req.body);
  const { productId } = req.body;
  console.log("delproid", productId);
  console.log("deluseid", req.user._id);
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
      await cart.save();
      res.json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update item quantity
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log("upproid", productId);
  console.log("upuserid", req.user._id);
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    console.log(cart);
    if (cart) {
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      console.log(item);
      if (item) {
        item.quantity = quantity;
        await cart.save();
        res.json({ message: "Quantity updated" });
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
