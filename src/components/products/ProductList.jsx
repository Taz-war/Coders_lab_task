import React, { useEffect, useState } from "react";
import ViewTable from "../../atoms/ViewTable";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import SkeletonComponent from "../SkeletonComponent";

const ProductList = () => {
  const [rows, setRows] = useState([]);
  const [fetchedData, setFetchedData] = useState();
  const [loader, setLoader] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        ProductName: item.name,
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
          row.ProductName.toLowerCase().includes(query.toLowerCase()) ||
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
    // Logic for creating a new row
    console.log("Create button clicked");
  };
  console.log(rows)

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
    </Box>
  );
};

export default ProductList;
