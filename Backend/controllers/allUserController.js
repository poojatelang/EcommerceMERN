const User = require("../models/User");
const multer = require("multer");
const path = require("path");

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
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.updateUser = [
  upload.single("image"),
  async (req, res) => {
    const { username, email, password, age, phone } = req.body;
    const userId = req.params.id;

    try {
      const image = req.file ? req.file.path : null; // Handle the image file if provided
      const updateData = {
        username,
        email,
        password,
        age,
        phone,
      };

      if (image) {
        updateData.image = image; // Add image to the update data
      }
      // Find the product and update it
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  },
];

// Delete product
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
};
