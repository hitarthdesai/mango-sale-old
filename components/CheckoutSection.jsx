import { useEffect, useState, useRef, useContext } from "react";
import { CartContext } from "../context/cart";
import { InventoryContext } from "../context/inventory";
import { ViewContext } from "../context/view";
import Cart from "./Cart";

import {
	Paper,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Container,
	TextField,
	Checkbox,
	Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function CheckoutSection() {
	const { cart } = useContext(CartContext);
	const { inventory } = useContext(InventoryContext);
	// const { view, setView } = useContext(ViewContext);

	const [checkoutCart, setCheckoutCart] = useState({});
	const [amountPayable, setAmountPayable] = useState(0);
	useEffect(() => {
		let total = 0;
		let checkoutCart = {};
		Object.keys(cart).map(mangoName => {
			const quantity = cart[mangoName];
			const price = inventory[mangoName].price;
			total += quantity * price;
			checkoutCart[mangoName] = { quantity, price };
		});
		setCheckoutCart(checkoutCart);
		setAmountPayable(total);
	}, []);

	const [phoneNumber, setPhoneNumber] = useState("");
	const handlePhoneNumber = event => {
		const currentPhoneNumber = event.target.value;
		if (isNaN(currentPhoneNumber) || currentPhoneNumber.length > 10) return;
		setPhoneNumber(currentPhoneNumber);
	};

	const [address, setAddress] = useState("");
	const handleAddress = event => {
		setAddress(event.target.value);
	};

	const [loading, setLoading] = useState(false);
	const [orderReference, setOrderReference] = useState("");
	const handleSubmit = event => {
		setLoading(true);
		event.preventDefault();
		const data = {
			orderTimestamp: serverTimestamp(),
			order: JSON.stringify(checkoutCart),
			phoneNumber: phoneNumber,
		};

		const ordersReference = collection(db, "orders");
		addDoc(ordersReference, data).then(QuerySnapshot => {
			setTimeout(() => setLoading(false), 3000);
			setOrderReference(QuerySnapshot.id);
		});
	};

	const AfterOrderPlaced = () => (
		<Container>
			<Typography variant="body2">Your Order Reference Is:</Typography>
			<Typography variant="h5" color="green" sx={{ padding: "1rem 0" }}>
				{orderReference}
			</Typography>
			<Typography variant="h6" lineHeight="1.25">
				Please wait for a {whatsAppPreferable ? "WhatsApp" : "Text"}{" "}
				message from our team to finalise your order
			</Typography>
		</Container>
	);

	return (
		<>
			{orderReference === "" ? (
				<>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Final Cart</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Cart />
							<Container>
								<Typography
									variant="subtitle2"
									align="right"
									sx={{
										marginTop: "1rem",
										textTransform: "uppercase",
									}}
								>
									Amount Payable
								</Typography>
								<Typography variant="h5" align="right">
									₹{amountPayable}
								</Typography>
							</Container>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Your Details</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<form onSubmit={event => handleSubmit(event)}>
								<Paper elevation={12} sx={{ padding: "1rem" }}>
									<Grid
										container
										alignItems="flex-start"
										direction="column"
										sx={{
											width: "100%",
										}}
									>
										<TextField
											fullWidth
											required
											onChange={handlePhoneNumber}
											type="tel"
											variant="filled"
											helperText={
												phoneNumber.length === 10
													? "Done"
													: `${
															10 -
															phoneNumber.length
													  } digits more`
											}
											placeholder="Enter a 10 Digit Phone Number"
											value={phoneNumber}
										/>
										{/* <TextField
											required
											onChange={handleAddress}
											variant="filled"
											sx={{
												width: "300px",
												marginTop: "1rem",
											}}
											helperText="Enter your address as best as you can"
											placeholder="Enter Address"
											value={address}
										/> */}
										<LoadingButton
											fullWidth
											loading={loading}
											variant="contained"
											color="success"
											type="submit"
											sx={{
												marginTop: "1rem",
											}}
										>
											Place Order
										</LoadingButton>
									</Grid>
								</Paper>
							</form>
						</AccordionDetails>
					</Accordion>
				</>
			) : (
				<AfterOrderPlaced />
			)}
		</>
	);
}

export default CheckoutSection;
