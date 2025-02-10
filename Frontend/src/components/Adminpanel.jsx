import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";
import {
  createProductStart,
  fetchProductsStart,
} from "../redux/features/productSlice";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    if (image) {
      formData.append("image", image);
    }

    dispatch(createProductStart(formData));
    reset();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Manage Products
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Box mb={2}>
          <TextField
            label="Product Name"
            {...register("name", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Price"
            type="number"
            {...register("price", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            {...register("description", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Products List
        </Typography>
        {loading && <p>Loading products...</p>}
        <ul>
          {products &&
            products.map((product) => (
              <li key={product._id}>
                <Typography variant="body1">
                  {product.name} - ${product.price}
                </Typography>
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </li>
            ))}
        </ul>
      </Box>
      <button onClick={logout}>Logout</button>
    </Box>
  );
};

export default AdminPanel;
