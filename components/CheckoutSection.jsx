import { useEffect, useState, useRef, useContext } from "react";
import Cart from "./Cart";
import VerifyPhoneNumber from "./VerifyPhoneNumber";

import { CartContext } from "../context/cart";
import { InventoryContext } from "../context/inventory";
import { ViewContext } from "../context/view";

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Container,
	Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AddressForm from "./AddressForm";

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

	const [orderPhoneNumber, setOrderPhoneNumber] = useState("");
	const orderPhoneNumberSetter = newOrderPhoneNumber => {
		setOrderPhoneNumber(newOrderPhoneNumber);
	};

	const [orderAddress, setOrderAddress] = useState("");
	const orderAddressSetter = newOrderAddress => {
		setOrderAddress(newOrderAddress);
	};

	const [detailsSubmitted, setDetailsSubmitted] = useState(false);
	const handleSubmitDetails = event => {
		event.preventDefault();
		setDetailsSubmitted(true);
	};

	return (
		<>
			<Accordion disabled={detailsSubmitted} expanded={!detailsSubmitted}>
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
			<Accordion disabled={detailsSubmitted} expanded={!detailsSubmitted}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Your Details</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<form onSubmit={handleSubmitDetails}>
						{orderPhoneNumber.length === 0 ? (
							<VerifyPhoneNumber
								setOrderPhoneNumber={orderPhoneNumberSetter}
							/>
						) : (
							<>
								<AddressForm
									setOrderAddress={orderAddressSetter}
								/>
								<Button
									fullWidth
									variant="contained"
									type="submit"
								>
									Proceed to Payment
								</Button>
							</>
						)}
					</form>
				</AccordionDetails>
			</Accordion>
			<Accordion disabled={!detailsSubmitted} expanded={detailsSubmitted}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Payment Information</Typography>
				</AccordionSummary>
				<AccordionDetails>Bruh</AccordionDetails>
			</Accordion>
		</>
	);
}

export default CheckoutSection;
