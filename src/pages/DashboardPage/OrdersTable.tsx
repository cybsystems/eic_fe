import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(orderId: number, customer: string, date: string, status: string) {
  return { orderId, customer, date, status };
}

const rows = [
  createData(1, 'John Doe', '2024-08-10', 'Shipped'),
  createData(2, 'Jane Smith', '2024-08-11', 'Pending'),
  createData(3, 'Alice Johnson', '2024-08-12', 'Delivered'),
  createData(4, 'Chris Lee', '2024-08-13', 'Processing'),
  createData(5, 'Paul Walker', '2024-08-14', 'Cancelled'),
];

const OrdersTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.orderId}>
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="right">{row.customer}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
