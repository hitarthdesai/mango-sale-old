import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";

function Cart ({ cartContext, viewCartContext }) {
    const { cart } = useContext(cartContext);
    const { setViewCart } = useContext(viewCartContext);
    return (
        <>
        {/* <Table>
            <TableHead><TableRow>
                <TableCell variant='head' align='center'>#</TableCell>
                <TableCell align='center'>Item</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Quantity</TableCell>
                <TableCell align='center'>Total</TableCell>
            </TableRow></TableHead>
            <TableBody>{
                Object.keys(cart).map((item, index) => {
                    return(
                        <TableRow key={item}>
                            <TableCell align='center'>{index+1}</TableCell>
                            <TableCell align='center'>{item}</TableCell>
                            <TableCell align='center'>50</TableCell>
                            <TableCell align='center'>{cart[item]}</TableCell>
                            <TableCell align='center'>50</TableCell>
                        </TableRow>
                    );
                })
            }</TableBody>
        </Table> */}
        YOU ARE LOOKING AT THE CART
        <Button onClick={() => setViewCart(false)}>Add More</Button></>
    );
}

export default Cart;