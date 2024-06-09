import React, { useEffect, useState } from "react";
import ViewTable from "../../atoms/ViewTable";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import SkeletonComponent from "../SkeletonComponent";
import OrderDialog from "./OrderDialog";
import EditOrderDialog from "./EditOrderDialog";

const OrderList = () => {
    const [rows, setRows] = useState([]);
    const [fetchedData, setFetchedData] = useState();
    const [loader, setLoader] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        setLoader(true);
        const fetchData = async () => {
            try {
                const res = await fetch(`https://reactjr.coderslab.online/api/orders`);
                const data = await res.json();
                setFetchedData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (fetchedData) {
            const transformedData = fetchedData?.data?.data.map((item) => ({
                id: item.id,
                Name: item.name,
                email: item.email,
                address: item.address,
                total_quantity: item.total_quantity,
                createdAt: new Date(item.created_at).toLocaleDateString("en-GB"),
            }));
            setRows(transformedData);
            setOriginalData(transformedData); // Save the original data
        }
    }, [fetchedData]);

    const handleSearch = (query) => {
        if (query) {
            const filteredRows = originalData.filter(
                (row) =>
                    row.Name.toLowerCase().includes(query.toLowerCase()) ||
                    row.email.toLowerCase().includes(query.toLowerCase()) ||
                    row.address.toLowerCase().includes(query.toLowerCase()) ||
                    row.createdAt.includes(query) ||
                    row.id.toString().includes(query)
            );
            setRows(filteredRows);
        } else {
            setRows(originalData); // Reset to original data when query is empty
        }
    };

    const handleCreate = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOrderSubmit = (newOrder) => {
        setRows([...rows, newOrder]);
        setOriginalData([...rows, newOrder]);
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setSelectedOrder(null);
    };

    const handleOrderUpdate = (updatedOrder) => {
        const updatedRows = rows.map((row) => (row.id === updatedOrder.id ? updatedOrder : row));
        setRows(updatedRows);
        setOriginalData(updatedRows);
    };

    return (
        <Box>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Orders Table
                </Typography>
                <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleCreate}>
                    Create
                </Button>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); handleSearch(e.target.value) }}
                />
            </Toolbar>
            {loader ? (
                <SkeletonComponent />
            ) : (
                <ViewTable rows={rows} onEdit={handleEdit} />
            )}
            <OrderDialog open={open} onClose={handleClose} onSubmit={handleOrderSubmit} />
            {selectedOrder && (
                <EditOrderDialog open={editOpen} onClose={handleEditClose} order={selectedOrder} onUpdate={handleOrderUpdate} />
            )}
        </Box>
    );
};

export default OrderList;
