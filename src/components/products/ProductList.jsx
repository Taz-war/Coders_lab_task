import React, { useState } from 'react'
import ViewTable from '../../atoms/ViewTable';

const initialRows = [
    { id: 1, ProductName: 'oil', brand: 'sunflower', type: 'soya bean', createdAt: '10/02/2024' },
    { id: 2, ProductName: 'sugar', brand: 'sweetie', type: 'cane sugar', createdAt: '15/02/2024' },
    { id: 3, ProductName: 'milk', brand: 'dairy delight', type: 'cow milk', createdAt: '20/02/2024' },
    { id: 4, ProductName: 'bread', brand: 'bakehouse', type: 'whole grain', createdAt: '25/02/2024' },
    { id: 5, ProductName: 'butter', brand: 'farm fresh', type: 'unsalted', createdAt: '28/02/2024' },
    { id: 6, ProductName: 'eggs', brand: 'chicken coop', type: 'organic', createdAt: '02/03/2024' },
    { id: 7, ProductName: 'flour', brand: 'baker\'s choice', type: 'all-purpose', createdAt: '05/03/2024' }
];

// const columns = [
//     { field: 'id', headerName: 'ID' },
//     { field: 'ProductName', headerName: 'Name', align: 'right' },
//     { field: 'brand', headerName: 'Brand', align: 'right' },
//     { field: 'type', headerName: 'Type', align: 'right' },
//     { field: 'createdAt', headerName: 'Created at', align: 'right' }
// ];
const ProductList = () => {
    const [rows, setRows] = useState(initialRows);

    const handleSearch = (query) => {
        const filteredRows = initialRows.filter((row) =>
            row.ProductName.toLowerCase().includes(query.toLowerCase()) ||
            row.brand.toLowerCase().includes(query.toLowerCase()) ||
            row.type.toLowerCase().includes(query.toLowerCase()) ||
            row.createdAt.includes(query)
        );
        setRows(filteredRows);
    };

    const handleCreate = () => {
        // Logic for creating a new row
        console.log('Create button clicked');
    };

    return (
        <ViewTable 
            rows={rows}
            onSearch={handleSearch}
            onCreate={handleCreate}
        />
    );
}

export default ProductList