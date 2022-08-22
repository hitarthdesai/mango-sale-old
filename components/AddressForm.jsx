import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

function AddressForm({ setOrderAddress }) {
	const [address, setAddress] = useState("");
	const handleAddressChange = event => {
		const newAddress = event.target.value;
		setAddress(newAddress);
		setOrderAddress(newAddress);
	};
	return (
		<Grid
			container
			alignItems="center"
			direction="column"
			sx={{
				width: "100%",
			}}
		>
			<TextField
				required
				fullWidth
				value={address}
				onChange={handleAddressChange}
				placeholder="Enter the Address for Delivery"
				helperText="Don't worry! We will confirm the address by calling you before delivery"
			/>
		</Grid>
	);
}

export default AddressForm;
