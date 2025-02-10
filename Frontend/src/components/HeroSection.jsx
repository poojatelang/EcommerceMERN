import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../redux/features/productSlice";
import { Box, Typography, Grid } from "@mui/material";

const HeroSection = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", margin: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Featured Products
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Box>
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  style={{ width: "100px", height: "100px" }}
                />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">${product.price}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default HeroSection;
