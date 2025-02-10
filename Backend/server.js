const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const alluserRoutes = require("./routes/alluserRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
// Set up CORS to allow requests from specific origins
const corsOptions = {
  // origin: 'http://localhost:5173', // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/users", alluserRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
