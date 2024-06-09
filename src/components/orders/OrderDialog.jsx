import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Stepper, Step, StepLabel, Box } from "@mui/material";
import OrderFormStep1 from "./OrderFormStep1";
import OrderFormStep2 from "./OrderFormStep2";
import OrderFormStep3 from "./OrderFormStep3";

const steps = ["Select Product", "Select Variants", "Information"];

const OrderDialog = ({ open, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        total_quantity: 0,
        details: [],
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async () => {
            try {
                const response = await fetch("https://reactjr.coderslab.online/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });


                if (!response.ok) {
                    const text = await response.text();
                    console.error("Error response from server:", text);
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }


                const result = await response.json();
                console.log(result);


                // onSubmit(result);
                onClose();
            } catch (error) {
                console.error("Error posting data:", error);
            }

        // console.log(formData);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        handleNext();
    };

    const handleVariantsSelect = (variants) => {
        setSelectedVariants(variants);
        setFormData({
            ...formData,
            total_quantity: variants.reduce((acc, variant) => acc + variant.quantity, 0),
            details: variants.map((variant) => ({
                variant_id: variant.id,
                quantity: variant.quantity,
            })),
        });
        handleNext();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Order (Create)</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box my={2}>
                    {activeStep === 0 && <OrderFormStep1 selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} onProductSelect={handleProductSelect} />}
                    {activeStep === 1 && <OrderFormStep2 product={selectedProduct} onVariantsSelect={handleVariantsSelect} />}
                    {activeStep === 2 && (
                        <OrderFormStep3 formData={formData} setFormData={setFormData} />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                {activeStep > 0 && (
                    <Button onClick={handleBack} color="secondary">
                        Back
                    </Button>
                )}
                {activeStep < steps.length - 1 ? (
                    <Button onClick={handleNext} color="primary">
                        Next
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default OrderDialog;
