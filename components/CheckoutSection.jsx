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

import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

	const handleSubmitDetails = event => {
		event.preventDefault();
	};

	return (
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
		</>
	);
}

export default CheckoutSection;
