import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/HomePage';
import Authentication from './components/Authhentication';
import DashboardContent from './AdminComponents/DashboardContent';
import ManageProducts from './AdminComponents/ManageProducts';
import Orders from './AdminComponents/Orders';
import UserDetails from './AdminComponents/UserDetails';
import SalesReport from './AdminComponents/SalesReport';
import AdminDashboard from './AdminComponents/AdminDashboard';
import { Errorpage } from './components/Errorpage';
import Shop from "./components/Shop"
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import CheckoutPage from './components/Checkoutpage';

const App = () => (
  <Router>
    <Header />
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/product-details/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contentdash" element={<DashboardContent />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/user-details" element={<UserDetails />} />
      <Route path="/sales-report" element={<SalesReport />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Errorpage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
