import React from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful!');
  };

  return <Button onClick={handleLogout} variant="contained" color="secondary">Logout</Button>;
};

export default Logout;
