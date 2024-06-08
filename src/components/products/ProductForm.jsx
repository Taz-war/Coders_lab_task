import React, { useState } from "react";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        type: "",
        origin: "",
        variants: [{ color: "", specification: "", size: "" }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const variants = [...formData.variants];
        variants[index] = { ...variants[index], [name]: value };
        setFormData({ ...formData, variants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { color: "", specification: "", size: "" }],
        });
    };

    const removeVariant = (index) => {
        const variants = [...formData.variants];
        variants.splice(index, 1);
        setFormData({ ...formData, variants });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form id="product-form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Brand"
                        name="brand"
                        fullWidth
                        value={formData.brand}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Type"
                        name="type"
                        fullWidth
                        value={formData.type}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Origin"
                        name="origin"
                        fullWidth
                        value={formData.origin}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" style={{ margin: "20px 0" }}>
                Variants
            </Typography>
            {formData.variants.map((variant, index) => (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={3}>
                        <TextField
                            label="Color"
                            name="color"
                            fullWidth
                            value={variant.color}
                            onChange={(e) => handleVariantChange(index, e)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Specification"
                            name="specification"
                            fullWidth
                            value={variant.specification}
                            onChange={(e) => handleVariantChange(index, e)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label="Size"
                            name="size"
                            fullWidth
                            value={variant.size}
                            onChange={(e) => handleVariantChange(index, e)}
                        />
                    </Grid>
                    <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={addVariant} color="primary">
                            <Add />
                        </IconButton>
                        {formData.variants.length > 1 && (
                            <IconButton onClick={() => removeVariant(index)} color="secondary">
                                <Remove />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            ))}
        </form>
    );
};

export default ProductForm;
