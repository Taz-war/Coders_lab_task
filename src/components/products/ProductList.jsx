import React, { useEffect, useState } from "react";
import ViewTable from "../../atoms/ViewTable";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Toolbar, Typography } from "@mui/material";
import SkeletonComponent from "../SkeletonComponent";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [rows, setRows] = useState([]);
  const [fetchedData, setFetchedData] = useState();
  const [loader, setLoader] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://reactjr.coderslab.online/api/products?search=Ru&per_page=10&page`
        );
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
        brand: item.brand,
        type: item.type,
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
          row.brand.toLowerCase().includes(query.toLowerCase()) ||
          row.type.toLowerCase().includes(query.toLowerCase()) ||
          row.createdAt.includes(query) ||
          row.id.toString().includes(query)  
      );
      setRows(filteredRows);
    } else {
      setRows(originalData); // Reset to original data when query is empty
    }
  };

  const handleCreate = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const generateId = () => Math.floor(Math.random() * 100000); // Generates a random ID

  const handleSubmit = async (formData) => {
    const timestamp = new Date().toISOString();
    const productId = generateId();
    const newProduct = {
      id: productId,
      ...formData,
      created_at: timestamp,
      updated_at: timestamp,
      variants: formData.variants.map((variant) => ({
        id: generateId(),
        product_id: productId,
        ...variant,
        created_at: timestamp,
        updated_at: timestamp,
      })),
    };

    try {
      const response = await fetch("https://reactjr.coderslab.online/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Error response from server:", text);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);

      // Add the new product to the rows
      setRows([...rows, result]);
      setOriginalData([...rows, result]);
    } catch (error) {
      console.error("Error posting data:", error);
    }

    handleClose();
  };


  return (
    <Box>
         <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Product Table
                </Typography>
                <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleCreate}>
                    Create
                </Button>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e)=>{setSearchQuery(e.target.value); handleSearch(e.target.value)}}
                />
            </Toolbar>
      {loader ? (
        <SkeletonComponent />
      ) : (
        <ViewTable
          rows={rows}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Product (Create/View/Edit)</DialogTitle>
        <DialogContent>
          <ProductForm onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button form="product-form" type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
