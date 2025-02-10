import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex", padding: 4, marginTop: 6 }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ padding: "16px" }}>
          Admin Panel
        </Typography>
        <List>
          <ListItem button component={Link} to="contentdash">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/manage-products">
            <ListItemText primary="Manage Products" />
          </ListItem>
          <ListItem button component={Link} to="/orders">
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={Link} to="/user-details">
            <ListItemText primary="User Details" />
          </ListItem>
          <ListItem button component={Link} to="/sales-report">
            <ListItemText primary="Sales Report" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
