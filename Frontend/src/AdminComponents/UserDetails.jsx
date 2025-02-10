import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";
import {
  fetchUserStart,
  updateUserStart,
  deleteUserStart,
} from "../redux/features/alluserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ImageUploadField from "./Image";

const UserDetails = () => {
  const { register, handleSubmit, reset, setValue, control, getValues } =
    useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { alluser, loading } = useSelector((state) => state.allusers);

  useEffect(() => {
    dispatch(fetchUserStart());
  }, [dispatch]);

  const edituser = (data) => {
    setSelectedUser(data);
    setIsEditing(true);
  };
  const deleteuser = (data) => {
    dispatch(deleteUserStart(data));
  };

  useEffect(() => {
    if (isEditing && selectedUser) {
      setValue("id", selectedUser._id);
      setValue("username", selectedUser.username);
      setValue("email", selectedUser.email);
      setValue("password", selectedUser.password);
      setValue("age", selectedUser.age);
      setValue("phone", selectedUser.phone);
    }
  }, [isEditing, selectedUser, setValue]);

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      const { id, image, username, email, password, age, phone } = getValues();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("age", age);
      formData.append("phone", phone);

      if (image) {
        formData.append("image", image);
      }

      if (isEditing) {
        formData.append("id", id);
        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });
        dispatch(updateUserStart(data));
        toast.success("User Edited Successfully");
        setSelectedUser(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box p={4} mt={8}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Manage Users
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Box mb={2}>
          <TextField
            label="User Name"
            {...register("username", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            {...register("email", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            {...register("password", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Age"
            type="number"
            {...register("age", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="phone"
            type="number"
            {...register("phone", { required: true })}
            fullWidth
            margin="normal"
          />
        </Box>

        <Box mb={2}>
          <ImageUploadField
            control={control}
            name="image"
            currentImage={selectedUser ? selectedUser.image : null}
            setValue={setValue}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Edit Product
        </Button>
      </form>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          User List
        </Typography>
        {loading && <p>Loading user...</p>}

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
              UserName
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Email
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Password
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Age
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Phone
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Image
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Edit
            </Typography>
            <Typography variant="h5" sx={{ marginRight: 2 }}>
              Delete
            </Typography>
          </Box>
          {alluser &&
            alluser.map((user) => (
              <li key={user._id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${user.username}
                  </Typography>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${user.email}
                  </Typography>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${user.password}
                  </Typography>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${user.age}
                  </Typography>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${user.phone}
                  </Typography>
                  <img
                    src={`http://localhost:5000/${user.image}`}
                    alt={user.name}
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
                    onClick={() => edituser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => deleteuser(user._id)}
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

export default UserDetails;
