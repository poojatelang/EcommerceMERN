const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique name for each file
  },
});

const upload = multer({ storage: storage });

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.getDetailsProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }
      const { name, price, description, stock, color, category, brand } =
        req.body;

      const newProduct = new Product({
        name,
        price,
        description,
        stock,
        color,
        category,
        brand,
        image: req.file.path,
      });

      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(400).json({ message: "Product creation failed", error });
    }
  },
];

exports.updateProduct = [
  upload.single("image"),
  async (req, res) => {
    const { name, price, description, stock, color, category, brand } =
      req.body;
    const productId = req.params.id;

    try {
      const image = req.file ? req.file.path : null;
      const updateData = {
        name,
        price,
        description,
        stock,
        color,
        category,
        brand,
      };

      if (image) {
        updateData.image = image;
      }
      // Find the product and update it
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  },
];

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
};
