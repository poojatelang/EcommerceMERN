import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
// import { Search, ShoppingCart, AccountCircle, Menu as MenuIcon, Logout } from '@mui/icons-material';
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/features/useSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { loginuser, loading, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  };

  const drawerContent = (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "block",
          marginLeft: "50px",
          marginTop: "30px",
        }}
      >
        <Button color="inherit">Home</Button>
      </Link>
      <Link
        to="/shop"
        style={{ textDecoration: "none", display: "block", marginLeft: "50px" }}
      >
        <Button color="inherit">Shop</Button>
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
        <IconButton size="large" color="inherit" sx={{ mb: 1 }}>
          <Badge badgeContent={4} color="secondary">
            {/* <ShoppingCart /> */}cart
          </Badge>
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ mb: 1 }}>
          {/* <AccountCircle /> */}account
        </IconButton>
        <Button
          color="inherit"
          size="large"
          // startIcon={<Logout />}
          sx={{ textTransform: "none" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#ff5722" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            MyStore
          </Typography>

          {/* Search Bar for all screen sizes */}
          <SearchBar
            sx={{ flexGrow: 1, display: { xs: "block", md: "block" } }}
          >
            <SearchIconWrapper>{/* <Search /> */}search</SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchBar>

          {/* Menu Icon for smaller screens */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            {/* <MenuIcon /> */}menu
          </IconButton>

          {/* Navigation Menu, User Icon, Cart, and Logout for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/shop" style={{ textDecoration: "none" }}>
              <Button color="inherit">Shop</Button>
            </Link>

            {/* Cart and User Icons */}
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="secondary">
                {/* <ShoppingCart /> */}cart
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              {/* <AccountCircle /> */}
              {loginuser ? loginuser.username : null}
              {/* <img src={`http://localhost:5000/${loginuser.image}`} alt={loginuser.name} style={{ width: '20px',height:'20px',borderRadius:'50%' }} /> */}
            </IconButton>
            <Button
              color="inherit"
              size="large"
              // startIcon={<Logout />}
              sx={{ textTransform: "none" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for smaller screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
