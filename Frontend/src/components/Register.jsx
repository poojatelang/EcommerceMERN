import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUserStart } from "../redux/features/useSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("age", data.age);
      formData.append("phone", data.phone);
      formData.append("image", data.image[0]);

      dispatch(registerUserStart(formData));

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <Box p={4} mt={8}>
      <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
        Register Page
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email", { required: true })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          {...register("username", { required: true })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          {...register("password", { required: true })}
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          {...register("confirmPassword", { required: true })}
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          {...register("age", { required: true })}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          {...register("phone", { required: true })}
          type="text"
          fullWidth
          margin="normal"
        />
        <input type="file" {...register("image", { required: true })} />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
