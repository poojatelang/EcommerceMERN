import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Authentication = () => {
  return (
    <>
      <Box sx={{ marginTop: 16, textAlign: "center" }}>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Authentication Page
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          padding: 4,
          marginTop: 6,
          marginBottom: 10,
        }}
      >
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" fullWidth>
            Login
          </Button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" fullWidth>
            Register
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Authentication;
