import React from "react";
import { TextField, Box, Button } from "@mui/material";

const OrderFormStep3 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="total_quantity"
        label="Total Quantity"
        value={formData.total_quantity}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default OrderFormStep3;
