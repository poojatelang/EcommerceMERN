import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartStart,
  updateCart,
  removestart,
} from "../redux/features/cartSlice";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [toggle, setToggle] = useState(false);
  const { items, totalAmount, shippingCost, taxes, loading, error } =
    useSelector((state) => state.cart);

  const storedUser = localStorage.getItem("loggeduserid");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (storedUser && token) {
      dispatch(fetchCartStart(storedUser));
    }
  }, [dispatch, storedUser, token]);

  useEffect(() => {
    if (!loading && items.length > 0) {
      const productIds = items[0].map((item) => item.productId._id);
      localStorage.setItem("cartProductIds", JSON.stringify(productIds));
    }
  }, [items]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCart({ productId, quantity }));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };
  const handleRemoveItem = (productId) => {
    dispatch(removestart({ productId }));
  };

  const calculateTotal = () => {
    if (!loading && items.length > 0) {
      const calculatedSubtotal = items[0].reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      );
      const calculatedTax = calculatedSubtotal * 0.15;
      const calculatedTotal = calculatedSubtotal + shippingCost + calculatedTax;

      setSubtotal(calculatedSubtotal);
      setTax(calculatedTax);
      setTotal(calculatedTotal);
      setToggle(!toggle);
      localStorage.setItem("totalamount", JSON.stringify(calculatedTotal));
    }
  };

  return (
    <div style={{ padding: "20px", marginTop: "150px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : items.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {items[0].map((item) => (
              <Grid item xs={12} key={item.productId._id}>
                <Card>
                  <Grid container>
                    <Grid item xs={3}>
                      <img
                        src={`http://localhost:5000/${item.productId.image}`}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <CardContent>
                        <Typography variant="h6">
                          {item.productId.name}
                        </Typography>
                        <Typography variant="body1">
                          ${item.productId.price}
                        </Typography>
                        <TextField
                          type="number"
                          label="Quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.productId._id,
                              parseInt(e.target.value)
                            )
                          }
                          InputProps={{ inputProps: { min: 1 } }}
                          style={{ marginTop: "10px" }}
                        />

                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => handleRemoveItem(item.productId._id)}
                        >
                          {/* <DeleteIcon /> */}delete
                        </IconButton>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={calculateTotal}
          >
            See Details
          </Button>
          {toggle && (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6">
                Subtotal: ${subtotal.toFixed(2)}
              </Typography>
              <Typography variant="body1">Taxes: ${tax.toFixed(2)}</Typography>
              <Typography variant="body1">
                Shipping: ${shippingCost.toFixed(2)}
              </Typography>
              <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </div>
  );
};

export default Cart;

// // src/components/Cart.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   IconButton,
//   Box,
// } from '@mui/material';
// import { Add, Remove } from '@mui/icons-material';
// import { removeFromCart, updateQuantity, clearCart } from '../redux/features/cartSlice';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { items, total, shippingCost } = useSelector((state) => state.cart);

//   const handleRemove = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleIncrease = (id, quantity) => {
//     dispatch(updateQuantity({ id, quantity: quantity + 1 }));
//   };

//   const handleDecrease = (id, quantity) => {
//     if (quantity > 1) {
//       dispatch(updateQuantity({ id, quantity: quantity - 1 }));
//     }
//   };

//   const handleCheckout = () => {
//     // Add your checkout logic here
//     console.log('Proceeding to checkout...');
//   };

//   return (
//     <div style={{ padding: '20px', marginTop: '100px' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Shopping Cart
//       </Typography>
//       <Grid container spacing={3}>
//         {items.length === 0 ? (
//           <Typography variant="h6">Your cart is empty</Typography>
//         ) : (
//           items.map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item.id}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={`http://localhost:5000/${item.image}`} // Update this to your backend URL
//                   alt={item.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{item.name}</Typography>
//                   <Typography variant="body2">${item.price.toFixed(2)}</Typography>
//                   <Box display="flex" alignItems="center">
//                     <IconButton onClick={() => handleDecrease(item.id, item.quantity)}>
//                       <Remove />
//                     </IconButton>
//                     <Typography variant="body2" style={{ margin: '0 10px' }}>
//                       {item.quantity}
//                     </Typography>
//                     <IconButton onClick={() => handleIncrease(item.id, item.quantity)}>
//                       <Add />
//                     </IconButton>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleRemove(item.id)}
//                   >
//                     Remove
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>

//       {items.length > 0 && (
//         <div style={{ marginTop: '20px' }}>
//           <Typography variant="h5">Summary</Typography>
//           <Typography variant="body1">Subtotal: ${total.toFixed(2)}</Typography>
//           <Typography variant="body1">Shipping: ${shippingCost.toFixed(2)}</Typography>
//           <Typography variant="body1">Taxes: $0.00</Typography>
//           <Typography variant="h6">Total: ${(total + shippingCost).toFixed(2)}</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleCheckout}
//             style={{ marginTop: '20px' }}
//           >
//             Proceed to Checkout
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
