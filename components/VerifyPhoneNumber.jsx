import { useEffect, useState } from "react";

import {
	TextField,
	Grid,
	Button,
	InputAdornment,
	Typography,
} from "@mui/material";

import { auth } from "../firebase";
import {
	RecaptchaVerifier,
	signInWithPhoneNumber,
	signOut,
} from "firebase/auth";
import { useRef } from "react";
import { useContext } from "react";
import { ViewContext } from "../context/view";

function VerifyPhoneNumber({ setOrderPhoneNumber }) {
	const { view, setView } = useContext(ViewContext);
	const [phoneNumber, setPhoneNumber] = useState("");
	const handlePhoneNumber = event => {
		const currentPhoneNumber = event.target.value;
		if (isNaN(currentPhoneNumber) || currentPhoneNumber.length > 10) return;
		setPhoneNumber(currentPhoneNumber);
	};

	const [otp, setOtp] = useState("");
	const handleOtp = event => {
		const currentOtp = event.target.value;
		if (isNaN(currentOtp) || currentOtp.length > 10) return;
		setOtp(currentOtp);
	};

	useEffect(() => {
		const newRecaptchaVerifier = new RecaptchaVerifier(
			"verifyPhoneNumber",
			{
				size: "invisible",
				callback: () => {},
			},
			auth
		);
		setRecaptchaVerifier(newRecaptchaVerifier);

		return () => {
			newRecaptchaVerifier.clear();
		};
	}, []);

	const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
	const [confirmationResult, setConfirmationResult] = useState(null);
	const [isOtpSent, setIsOtpSent] = useState(false);
	const handleSendOtp = () => {
		signInWithPhoneNumber(auth, `+91${phoneNumber}`, recaptchaVerifier)
			.then(loginConfirmationResult => {
				setConfirmationResult(loginConfirmationResult);
				setIsOtpSent(true);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
	const [otpVerificationError, setOtpVerficationError] = useState("");
	const handleVerification = () => {
		if (otp.length != 6) return;
		confirmationResult
			.confirm(otp)
			.then(() => {
				setPhoneNumberVerified(true);
				setOrderPhoneNumber(phoneNumber);
				signOut(auth);
			})
			.catch(() => {
				setOtpVerficationError(
					"Unable to verify phone number. Please try again later"
				);
			});
	};

	const recaptchaElementRef = useRef(null);
	const enclosingDivRef = useRef(null);
	const handleRequestNewOtp = () => {
		if (view === "checkout") {
			setView("rerendercheckout");
			return;
		}
		if (view === "rerendercheckout") {
			setView("checkout");
			return;
		}
	};

	return (
		<>
			{!phoneNumberVerified && (
				<div ref={enclosingDivRef}>
					<Grid
						container
						alignItems="flex-start"
						direction="column"
						sx={{
							width: "100%",
						}}
					>
						<TextField
							required
							fullWidth
							disabled={isOtpSent}
							onChange={handlePhoneNumber}
							type="tel"
							variant="filled"
							helperText={
								isOtpSent
									? ""
									: phoneNumber.length === 10
									? "Done"
									: `${10 - phoneNumber.length} digits more`
							}
							placeholder="Enter a 10 Digit Phone Number"
							value={phoneNumber}
							InputProps={{
								startAdornment: (
									<InputAdornment
										position="start"
										sx={{
											paddingBottom: "0.5rem",
										}}
									>
										+91
									</InputAdornment>
								),
							}}
							inputProps={{
								style: {
									paddingTop: "1rem",
								},
							}}
						/>
						{isOtpSent ? (
							<>
								<TextField
									required
									fullWidth
									onChange={handleOtp}
									type="tel"
									variant="filled"
									helperText={
										otp.length === 9
											? "Done"
											: `${6 - otp.length} digits more`
									}
									placeholder="Enter the 6 digit OTP"
									value={otp}
									inputProps={{
										style: {
											paddingTop: "1rem",
										},
									}}
									sx={{
										marginTop: "1rem",
									}}
								/>
								{otpVerificationError && (
									<Typography
										color="red"
										sx={{ textDecoration: "italics" }}
									>
										{otpVerificationError}
									</Typography>
								)}
								{otpVerificationError ? (
									<Button
										fullWidth
										variant="contained"
										onClick={handleRequestNewOtp}
									>
										Request New OTP
									</Button>
								) : (
									<Button
										fullWidth
										variant="contained"
										onClick={handleVerification}
									>
										Verify Phone Number
									</Button>
								)}
							</>
						) : (
							<>
								<Button
									fullWidth
									variant="contained"
									onClick={handleSendOtp}
								>
									Request OTP
								</Button>
							</>
						)}
					</Grid>
					<div id="verifyPhoneNumber" ref={recaptchaElementRef}></div>
				</div>
			)}
		</>
	);
}

export default VerifyPhoneNumber;
