import { useContext } from 'react';
import { CartContext } from '../context/cart';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function Cart({ currentInventory, cart }) {
    const newCart = Object.keys(cart).filter(mango => cart[mango] > 0);
    return (
        <Table>
            <TableHead><TableRow>
                <TableCell variant='head' align='center'>#</TableCell>
                <TableCell align='center'>Item</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Quantity</TableCell>
                <TableCell align='center'>Total</TableCell>
            </TableRow></TableHead>
            <TableBody>{
                newCart.map((item, index) => {
                    const quantity = cart[item];
                    if(quantity <= 0)
                    return null;
                    return(
                        <TableRow key={item}>
                            <TableCell align='center'>{index+1}</TableCell>
                            <TableCell align='center'>{item}</TableCell>
                            <TableCell align='center'>50</TableCell>
                            <TableCell align='center'>{quantity}</TableCell>
                            <TableCell align='center'>50</TableCell>
                        </TableRow>
                    );
                })
            }</TableBody>
        </Table>
    );
}

export default Cart;