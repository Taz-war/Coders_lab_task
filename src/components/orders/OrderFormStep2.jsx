import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Button, Box } from "@mui/material";
import SkeletonComponent from "../SkeletonComponent";

const OrderFormStep2 = ({ product, onVariantsSelect }) => {
    console.log(product)
    const [rows, setRows] = useState([]);
    const [loader, setLoader] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState([]);

    useEffect(() => {
        setLoader(true);
        const fetchData = async () => {
            try {
                const res = await fetch(`https://reactjr.coderslab.online/api/products/${product.id}`);
                const data = await res.json();
                
                const transformedData = data?.data?.variants.map((item) => ({
                    id: item.id,
                    color: item.color,
                    specification: item.specification,
                    size: item.size,
                    quantity: 0,
                }));
                setRows(transformedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, [product]);

    const handleSelect = (variant) => {
        setSelectedVariants((prev) =>
            prev.some((v) => v.id === variant.id)
                ? prev.filter((v) => v.id !== variant.id)
                : [...prev, variant]
        );
    };

    const handleQuantityChange = (id, quantity) => {
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, quantity } : row))
        );
    };

    return (
        <Box>
            {loader ? (
                <SkeletonComponent />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Specification</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Select</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.color}</TableCell>
                                    <TableCell>{row.specification}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(row.id, parseInt(e.target.value))
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedVariants.some((v) => v.id === row.id)}
                                            onChange={() => handleSelect(row)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onVariantsSelect(selectedVariants)}
                    disabled={selectedVariants.length === 0}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default OrderFormStep2;
