import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function Cart({ cart }) {
    let newCart = [];
    Object.keys(cart).map(mangoName => {
        const mango = cart[mangoName];
        if(mango.quantity > 0)
        newCart.push(mango);
    });
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
                newCart.map((mangoItem, index) => {
                    const quantity = mangoItem.quantity;
                    return(
                        <TableRow key={index}>
                            <TableCell align='center'>{index+1}</TableCell>
                            <TableCell align='center'>{mangoItem.name}</TableCell>
                            <TableCell align='center'>{mangoItem.price}</TableCell>
                            <TableCell align='center'>{quantity}</TableCell>
                            <TableCell align='center'>{mangoItem.price * quantity}</TableCell>
                        </TableRow>
                    );
                })
            }</TableBody>
        </Table>
    );
}

export default Cart;