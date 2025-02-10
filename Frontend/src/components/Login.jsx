import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUserStart } from "../redux/features/useSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { loginuser, loading, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/homepage");
    }
  }, [token]);

  useEffect(() => {
    if (loginuser) {
      localStorage.setItem("loggeduserid", loginuser._id);
    }
  }, [loginuser]);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUserStart(data));
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <Box p={4} mt={8}>
      <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
        Login Page
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email", { required: true })}
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
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
