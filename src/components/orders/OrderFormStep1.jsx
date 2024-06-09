import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Box } from "@mui/material";
import SkeletonComponent from "../SkeletonComponent";

const OrderFormStep1 = ({ selectedProduct, setSelectedProduct,onProductSelect }) => {
    const [rows, setRows] = useState([]);
    const [loader, setLoader] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setLoader(true);
        const fetchData = async () => {
            try {
                const res = await fetch(`https://reactjr.coderslab.online/api/products?search=Ru&per_page=10&page`);
                const data = await res.json();
                const transformedData = data?.data?.data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    brand: item.brand,
                    type: item.type,
                }));
                setRows(transformedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, []);

    const handleSelect = (product) => {
      
        setSelectedProduct(product);
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
                                <TableCell>Name</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Select</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.brand}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedProduct?.id === row.id}
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
                    onClick={() => onProductSelect(selectedProduct)}
                    disabled={!selectedProduct}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default OrderFormStep1;
