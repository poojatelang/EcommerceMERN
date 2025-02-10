import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  fetchOrderStart,
  removeOrderstart,
  updateOrderStart,
} from "../redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const [editMode, setEditMode] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const onSubmit = async (data) => {
    if (editMode) {
      dispatch(updateOrderStart({ data, currentOrderId }));
    }
  };

  const handleEdit = (order) => {
    setCurrentOrderId(order._id);
    setEditMode(true);
    setValue("fullName", order.address.fullName);
    setValue("street", order.address.street);
    setValue("city", order.address.city);
    setValue("postalCode", order.address.postalCode);
    setValue("country", order.address.country);
    setValue("paymentMethod", order.paymentMethod);
    setValue("totalAmount", order.totalAmount);
    setValue("orderStatus", order.orderStatus);
  };

  const handleDelete = (id) => {
    dispatch(removeOrderstart(id));
  };

  useEffect(() => {
    dispatch(fetchOrderStart());
  }, []);

  if (loading) {
    return <div>Loding...</div>;
  }

  return (
    <Container sx={{ marginTop: "100px" }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              {...register("fullName", { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Street" fullWidth {...register("street")} />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="City"
              fullWidth
              {...register("city", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postal Code"
              fullWidth
              {...register("postalCode", { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Country"
              fullWidth
              {...register("country", { required: true })}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select {...register("paymentMethod", { required: true })}>
                <MenuItem value="creditCard">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Total Amount"
              type="number"
              fullWidth
              {...register("totalAmount", { required: true })}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Order Status</InputLabel>
              <Select {...register("orderStatus", { required: true })}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {editMode ? "Update Order" : "Create Order"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Orders List */}
      <Paper style={{ marginTop: "40px" }}>
        <Typography variant="h6" gutterBottom style={{ padding: "10px" }}>
          Order List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && orders.length > 0
              ? orders[0].map((order) => (
                  <TableRow key={order.user._id}>
                    <TableCell>{order.address.fullName}</TableCell>
                    <TableCell>
                      {order.address.fullName}, {order.address.city},{" "}
                      {order.address.country}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>${order.totalAmount}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(order)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Order;
