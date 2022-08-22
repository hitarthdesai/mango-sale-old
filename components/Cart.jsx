import { useContext } from "react";
import { CartContext } from "../context/cart";
import { InventoryContext } from "../context/inventory";
import { ViewContext } from "../context/view";

import {
	Button,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

function Cart() {
	const { cart } = useContext(CartContext);
	const { inventory } = useContext(InventoryContext);
	const { setView } = useContext(ViewContext);

	if (Object.keys(cart).length === 0)
		return (
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				sx={{ width: "100%" }}
				padding="1rem"
			>
				<Typography variant="overline" fontSize="2rem">
					Your Cart Is is Empty
				</Typography>
			</Grid>
		);

	return (
		<Grid container sx={{ width: "100%" }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell variant="head" align="center">
							#
						</TableCell>
						<TableCell align="center">Item</TableCell>
						<TableCell align="center">Price</TableCell>
						<TableCell align="center">Quantity</TableCell>
						<TableCell align="center">Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.keys(cart).map((mangoName, index) => {
						const quantity = cart[mangoName];
						const mangoPrice = inventory[mangoName].price;
						const mangoTotal = quantity * mangoPrice;
						return (
							<TableRow key={index}>
								<TableCell align="center">
									{index + 1}
								</TableCell>
								<TableCell align="center">
									{mangoName}
								</TableCell>
								<TableCell align="center">
									{mangoPrice}
								</TableCell>
								<TableCell align="center">{quantity}</TableCell>
								<TableCell align="center">
									{mangoTotal}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<Button
				fullWidth
				variant="contained"
				color="success"
				onClick={() => setView("checkout")}
				sx={{ margin: "1rem" }}
			>
				Proceed to Checkout
			</Button>
		</Grid>
	);
}

export default Cart;
