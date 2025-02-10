import React from "react";
import { Typography, Box } from "@mui/material";

const DashboardContent = () => {
  return (
    <Box p={4} mt={27}>
      <Typography variant="h4">Welcome to the Admin Dashboard</Typography>
      <Typography>
        This is where you can view overall system statistics.
      </Typography>
    </Box>
  );
};

export default DashboardContent;
