import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailsStart } from "../redux/features/productSlice";
import { addToCartStart } from "../redux/features/cartSlice";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    singlepro: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const storedUser = localStorage.getItem("loggeduserid");
  useEffect(() => {
    dispatch(fetchProductDetailsStart(id));
  }, [dispatch, id]);

  const handleaddtocart = () => {
    const payload = {
      productId: product._id,
      quantity: 1,
      userId: storedUser,
    };
    dispatch(addToCartStart(payload));
    navigate("/cart");
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" style={{ marginTop: "150px" }}>
      {product && (
        <Card>
          {/* Product Image */}
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:5000/${product.image}`}
            alt={product.name}
            style={{ objectFit: "contain" }}
          />

          {/* Product Details */}
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary">
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            {/* Additional Product Information */}
            <Box my={2}>
              <Typography variant="body2">
                <strong>Stock:</strong> {product.stock}
              </Typography>
              <Typography variant="body2">
                <strong>Color:</strong> {product.color}
              </Typography>
              <Typography variant="body2">
                <strong>Category:</strong> {product.category}
              </Typography>
              {product.brand && (
                <Typography variant="body2">
                  <strong>Brand:</strong> {product.brand}
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={handleaddtocart}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCheckout}
              >
                Buy Now
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetails;
