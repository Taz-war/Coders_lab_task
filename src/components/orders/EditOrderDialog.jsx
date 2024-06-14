import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import SkeletonComponent from "../SkeletonComponent";
import axios from "axios";

const EditOrderDialog = ({ open, onClose, order, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        total_quantity: 0,
        details: []
    });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (order && open) {
            const fetchOrderDetails = async () => {
                setLoader(true);
                try {
                    const res = await fetch(`https://reactjr.coderslab.online/api/orders/${order.id}`);
                    const data = await res.json();
                    console.log(data);
                    setFormData({
                        name: data.name || "",
                        email: data.email || "",
                        address: data.address || "",
                        total_quantity: data.total_quantity || 0,
                        details: data?.data?.details?.map(detail => ({
                            id: detail.id || "",
                            variant_id: detail.variant_id || "",
                            quantity: detail.quantity || 0
                        })) || []
                    });
                } catch (error) {
                    console.error("Error fetching order details:", error);
                } finally {
                    setLoader(false);
                }
            };

            fetchOrderDetails();
        }
    }, [order, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = formData.details.map((detail, i) => {
            if (i === index) {
                return ({ ...detail, [field]: value });
            }
            return detail;
        });
        setFormData((prev) => ({ ...prev, details: updatedDetails }));
    };

    const handleUpdate = async () => {
        console.log({
            _method: "PUT",
            ...formData
        })
        try {
            // const response = await fetch(`https://reactjr.coderslab.online/api/orders/${order.id}`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         _method: "PUT",
            //         ...formData
            //     }),
            // });

            const response = axios.post(`https://reactjr.coderslab.online/api/orders/${order.id}`,{
                _method: "PUT",
                ...formData
            })
            console.log(response)
            const resbody = await response.json()
            console.log(resbody)
            // if (!response.ok) {
            //     const text = await response.text();
            //     console.error("Error response from server:", text);
            //     throw new Error(`Network response was not ok: ${response.statusText}`);
            // }

            // const result = await response.json();
            // console.log(result);

            // onUpdate(result);
            // onClose();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogContent>
                {loader ? (
                    <SkeletonComponent />
                ) : (
                    <Box>
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="address"
                            label="Address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="total_quantity"
                            label="Total Quantity"
                            value={formData.total_quantity || 0}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        {formData.details.map((detail, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                <TextField
                                    label="Variant ID"
                                    value={detail.variant_id || ""}
                                    onChange={(e) => handleDetailChange(index, "variant_id", e.target.value)}
                                    margin="normal"
                                    style={{ marginRight: 8 }}
                                />
                                <TextField
                                    label="Quantity"
                                    value={detail.quantity || 0}
                                    onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                                    margin="normal"
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOrderDialog;
