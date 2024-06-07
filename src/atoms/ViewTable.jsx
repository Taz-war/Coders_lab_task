import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Box, Toolbar, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ViewTable = ({ rows, onSearch, onCreate }) => {
    const tableHeader = Object.keys(rows[0])
    
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Product Table
                </Typography>
                <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={onCreate}>
                    Create
                </Button>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Toolbar>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {tableHeader?.map((column,index) => (
                                <StyledTableCell key={index} align={'left'}>
                                    {column}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <StyledTableRow key={row.id}>
                                {tableHeader.map((column,index) => (
                                    <StyledTableCell key={index} align={'left'}>
                                        {row[column]}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell align="right">
                                    <Button variant='contained'>edit</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ViewTable;
