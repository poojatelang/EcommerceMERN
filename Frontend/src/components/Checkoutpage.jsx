import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";
// import { Payment } from '@mui/icons-material';
import { addToOrderStart } from "../redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = ({ cartItems, onPlaceOrder }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const storedProductIds = JSON.parse(localStorage.getItem("cartProductIds"));
  const totalamt = JSON.parse(localStorage.getItem("totalamount"));

  const onSubmit = (data) => {
    const orderDetails = {
      products: storedProductIds.map((item) => ({
        productId: item,
      })),
      address: {
        fullName: data.fullName,
        country: data.country,
        city: data.city,
        postalCode: data.postalCode,
        street: data.street,
      },
      paymentMethod: data.paymentMethod,
      totalAmount: totalamt,
    };

    dispatch(addToOrderStart(orderDetails));
  };

  return (
    <Grid container spacing={3} style={{ padding: "20px", marginTop: "80px" }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Shipping Information</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="street"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street"
                    fullWidth
                    margin="normal"
                    error={!!errors.street}
                    helperText={errors.street?.message}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    margin="normal"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
              <Controller
                name="postalCode"
                control={control}
                rules={{ required: "Postal Code is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    fullWidth
                    margin="normal"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    margin="normal"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Options */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Payment Options</Typography>
            <Controller
              name="paymentMethod"
              control={control}
              defaultValue="creditCard"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio />}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal"
                  />
                </RadioGroup>
              )}
            />
            {errors.paymentMethod && (
              <Typography color="error">Payment Method is required</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Gateway (Mockup) */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Payment Details</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="cardNumber"
                control={control}
                rules={{ required: "Card Number is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Card Number"
                    fullWidth
                    margin="normal"
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber?.message}
                  />
                )}
              />
              <Controller
                name="expiryDate"
                control={control}
                rules={{ required: "Expiry Date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expiry Date (MM/YY)"
                    fullWidth
                    margin="normal"
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate?.message}
                  />
                )}
              />
              <Controller
                name="cvv"
                control={control}
                rules={{ required: "CVV is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CVV"
                    fullWidth
                    margin="normal"
                    error={!!errors.cvv}
                    helperText={errors.cvv?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
