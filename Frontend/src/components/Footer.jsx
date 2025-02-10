import React from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  IconButton,
  Container,
} from "@mui/material";
// import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#282c34",
        color: "white",
        py: 4,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Customer Service Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Link href="#" color="inherit">
              Contact Us
            </Link>
            <br />
            <Link href="#" color="inherit">
              FAQs
            </Link>
            <br />
            <Link href="#" color="inherit">
              Shipping Information
            </Link>
            <br />
            <Link href="#" color="inherit">
              Return Policy
            </Link>
          </Grid>

          {/* About and Policies Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Link href="#" color="inherit">
              Our Story
            </Link>
            <br />
            <Link href="#" color="inherit">
              Privacy Policy
            </Link>
            <br />
            <Link href="#" color="inherit">
              Terms of Service
            </Link>
            <br />
            <Link href="#" color="inherit">
              Careers
            </Link>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <IconButton href="#" color="inherit" aria-label="Facebook">
              {/* <Facebook /> */}f
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="Twitter">
              {/* <Twitter /> */}t
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="Instagram">
              {/* <Instagram /> */}i
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="LinkedIn">
              {/* <LinkedIn /> */}L
            </IconButton>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
