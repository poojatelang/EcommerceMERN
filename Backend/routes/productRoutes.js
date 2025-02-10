const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getDetailsProducts,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getDetailsProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
