import { useContext } from "react";
import { CartContext } from "../context/cart";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddAlertIcon from "@mui/icons-material/AddAlert";

function MangoCard({ mango }) {
	const name = mango.name;
	const photo =
		"https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";
	const stock = mango.stock;
	const price = mango.price;
	const discount = mango.discount;

	const { cart, setCart } = useContext(CartContext);
	console.log(cart);

	const RemindMeButton = () => (
		<Button sx={{ width: "100%", color: "black" }}>
			<AddAlertIcon />
			Remind Me
		</Button>
	);

	const AddToCartButton = () => (
		<Button
			fullWidth
			onClick={() => {
				const mangoName = mango.name;
				setCart({ ...cart, [mangoName]: 1 });
			}}
		>
			<AddShoppingCartIcon sx={{ color: "black" }} />
		</Button>
	);

	const MangoCardAlert = () => {
		{
			stock === 0
				? "OUT OF STOCK"
				: discount === 0
				? "POPULAR"
				: `${discount}% off`;
		}
		if (stock === 0)
			return (
				<Alert variant="standard" icon={false} severity="error">
					Out of Stock
				</Alert>
			);
		if (stock <= 10)
			return (
				<Alert variant="standard" icon={false} severity="warning">
					Low in Stock
				</Alert>
			);
		if (discount !== 0)
			return (
				<Alert variant="standard" icon={false} severity="success">
					{discount}% Off
				</Alert>
			);
		return <></>;
	};

	return (
		<>
			{Object.keys(mango).length !== 0 && (
				<Card key={name} id={name} sx={{ position: "relative" }}>
					<CardHeader title={name} />
					<CardMedia image={photo} sx={{ height: "200px" }} />
					<CardContent>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								variant="overline"
								fontSize="1.25rem"
							>{`₹${price}`}</Typography>
							<MangoCardAlert />
						</div>
						<Paper
							elevation={1}
							sx={{
								marginTop: "1rem",
								backgroundColor:
									stock === 0 ? "#8BD3E6" : "#FDFD96",
							}}
						>
							<CardActions>
								{stock === 0 ? (
									<RemindMeButton />
								) : Object.keys(cart).includes(name) ? (
									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<IconButton
											onClick={() => {
												const quantity = cart[name];
												if (quantity == 1) {
													const {
														[name]: _,
														...newCart
													} = cart;
													setCart(newCart);
												} else {
													setCart({
														...cart,
														[name]: quantity - 1,
													});
												}
											}}
										>
											<RemoveIcon />
										</IconButton>
										<Typography
											gutterBottom={false}
											align="center"
											variant="h5"
										>
											{cart[name]}
										</Typography>
										<IconButton
											onClick={() => {
												const quantity = cart[name];
												if (quantity == stock) {
													console.log("THAT'S IT");
												} else {
													setCart({
														...cart,
														[name]: quantity + 1,
													});
												}
											}}
										>
											<AddIcon />
										</IconButton>
									</div>
								) : (
									<AddToCartButton />
								)}
							</CardActions>
						</Paper>
					</CardContent>
				</Card>
			)}
		</>
	);
}

export default MangoCard;
