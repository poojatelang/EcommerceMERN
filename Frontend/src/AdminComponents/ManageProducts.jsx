import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";
import {
  createProductStart,
  fetchProductsStart,
} from "../redux/features/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateProductStart,
  deleteProductStart,
} from "../redux/features/productSlice";
import ImageUploadField from "./Image";

const ManageProducts = () => {
  const { register, handleSubmit, reset, setValue, control, getValues } =
    useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const editproduct = (data) => {
    setSelectedProduct(data);
    setIsEditing(true);
  };
  const deleteproduct = (data) => {
    dispatch(deleteProductStart(data));
  };

  useEffect(() => {
    if (isEditing && selectedProduct) {
      setValue("id", selectedProduct._id);
      setValue("name", selectedProduct.name);
      setValue("price", selectedProduct.price);
      setValue("description", selectedProduct.description);
      setValue("stock", selectedProduct.stock);
      setValue("color", selectedProduct.color);
      setValue("category", selectedProduct.category);
      setValue("brand", selectedProduct.brand);
    }
  }, [isEditing, selectedProduct, setValue]);

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      const {
        id,
        image,
        name,
        price,
        description,
        stock,
        color,
        category,
        brand,
      } = getValues();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("color", color);
      formData.append("category", category);
      formData.append("brand", brand);

      if (image) {
        formData.append("image", image);
      }

      if (isEditing) {
        formData.append("id", id);
        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });
        dispatch(updateProductStart(data));
        toast.success("Product Edited Successfully");
        setSelectedProduct(null);
        setIsEditing(false);
      } else {
        dispatch(createProductStart(formData));
        toast.success("Product Stored Successfully");
        reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box p={4} mt={8}>
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
            label="stock"
            type="number"
            {...register("stock", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="color"
            {...register("color", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="category"
            {...register("category", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="brand"
            {...register("brand", { required: true })}
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
          <ImageUploadField
            control={control}
            name="image"
            currentImage={selectedProduct ? selectedProduct.image : null}
            setValue={setValue}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          {isEditing ? "Edit Product" : "Add Product"}
        </Button>
      </form>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Products List
        </Typography>
        {loading && <p>Loading products...</p>}

        <ul>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 2,
            }}
          >
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Product Name
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Product Price
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Product Image
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Edit
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Delete
            </Typography>
          </Box>
          {products &&
            products.map((product) => (
              <li key={product._id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${product.price}
                  </Typography>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: 2,
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={() => editproduct(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => deleteproduct(product._id)}
                  >
                    Delete
                  </Button>
                </Box>
                <hr />
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ManageProducts;
