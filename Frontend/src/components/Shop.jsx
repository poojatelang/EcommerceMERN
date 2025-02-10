import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Pagination,
  CircularProgress,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";
import { fetchProductsStart } from "../redux/features/productSlice";
import { addToCartStart } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productsPerPage] = useState(4);

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch, page]);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const [productinfo, setProductinfo] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ name: "", color: "", price: "" });
  console.log("proinfo", productinfo);

  const storedUser = localStorage.getItem("loggeduserid");
  useEffect(() => {
    if (products && products.length > 0) {
      const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      setProductinfo(currentProducts);
      setFilteredProducts(currentProducts);
    }
  }, [products, page]);

  useEffect(() => {
    setFilteredProducts(
      productinfo.filter((product) => {
        return (
          (filter.name === "" ||
            product.name.toLowerCase().includes(filter.name.toLowerCase())) &&
          (filter.color === "" ||
            product.color.toLowerCase() === filter.color.toLowerCase()) &&
          (filter.price === "" || product.price <= Number(filter.price))
        );
      })
    );
  }, [filter, productinfo]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    const newFilteredProducts = productinfo.filter((product) => {
      return (
        (filter.name === "" ||
          product.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (filter.color === "" ||
          product.color.toLowerCase() === filter.color.toLowerCase()) &&
        (filter.price === "" || product.price <= Number(filter.price))
      );
    });

    setFilteredProducts(newFilteredProducts);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleViewDetails = (id) => {
    navigate(`/product-details/${id}`);
  };
  const handleaddtocart = (id) => {
    const payload = {
      productId: id,
      quantity: 1,
      userId: storedUser,
    };
    dispatch(addToCartStart(payload));
    navigate("/cart");
  };

  return (
    <div style={{ padding: "20px", marginTop: "100px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      <Box sx={{ marginBottom: "50px" }}>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Filter by Name"
              variant="outlined"
              fullWidth
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Filter by Color"
              variant="outlined"
              fullWidth
              name="color"
              value={filter.color}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Filter by Max Price"
              variant="outlined"
              fullWidth
              name="price"
              value={filter.price}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {productinfo
              ? filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={`http://localhost:5000/${product.image}`}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ${product.price}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleViewDetails(product._id)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleaddtocart(product._id)}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>

          {/* Pagination */}
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Shop;
