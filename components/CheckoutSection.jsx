import { useEffect, useState } from 'react';
import Cart from "./Cart";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LoadingButton from "@mui/lab/LoadingButton";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Paper } from '@mui/material';

import { db } from "../firebase"
import { addDoc, collection, QuerySnapshot, serverTimestamp } from "firebase/firestore"

function CheckoutSection() {
    const [checkoutCart, setCheckoutCart] = useState({});
    const [amountPayable, setAmountPayable] = useState(0);
    useEffect(() => {
        let total = 0;
        const cart = JSON.parse(localStorage.getItem("cart"));
        Object.keys(cart).map(mangoName => {
            const mangoItem = cart[mangoName];
            const quantity = mangoItem.quantity;
            const price = mangoItem.price;
            total += quantity*price;
        });
        setCheckoutCart(cart);
        setAmountPayable(total);
    }, [])

    const [whatsAppPreferable, setWhatsAppPreferable] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const handlePhoneNumber = event => {
        const currentPhoneNumber = event.target.value;
        if(isNaN(currentPhoneNumber) || currentPhoneNumber.length > 10)
            return;
        setPhoneNumber(currentPhoneNumber);
    }

    const [loading, setLoading] = useState(false);
    const [orderReference, setOrderReference] = useState("")
    const handleSubmit = event => {
        setLoading(true);
        event.preventDefault();
        const data = {
            orderTimestamp: serverTimestamp(),
            order: JSON.stringify(checkoutCart),
            phoneNumber: phoneNumber,
            whatsapp: whatsAppPreferable,
        };

        const ordersReference = collection(db, "orders");
        addDoc(ordersReference, data).then(QuerySnapshot => {
            setTimeout(() => setLoading(false), 3000);
            setOrderReference(QuerySnapshot.id);
        })
    }

    const AfterOrderPlaced = () => (
        <Container>
            <Typography variant='body2'>Your order Reference Is:</Typography>
            <Typography variant='h5' color="green" sx={{padding: "1rem 0"}}>{orderReference}</Typography>
            <Typography variant='h6' lineHeight="1.25">Please wait for a {whatsAppPreferable ? "WhatsApp" : "Text"} message from our team to finalise your order</Typography>
        </Container>
    );
    
    return (
        <>{orderReference === "" ?
            <><Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Final Cart</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Cart cart={checkoutCart} />
                    <Container>
                        <Typography variant='subtitle2' align="right" sx={{
                            marginTop: "1rem",
                            textTransform: "uppercase"
                        }}>Amount Payable</Typography>
                        <Typography variant='h5' align="right">₹{amountPayable}</Typography>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Your Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Please enter your phone number to receive details of your order. 
                    </Typography>
                    <form onSubmit={event => handleSubmit(event)}>
                        <Grid container alignItems="flex-start" direction="column" sx={{width: "100%", marginTop: "1rem"}}>
                            <Paper elevation={12} sx={{padding: "1rem"}}>
                                <TextField
                                required
                                onChange={event => handlePhoneNumber(event)} 
                                type="tel" 
                                variant="filled" 
                                sx={{ width: "300px", marginTop: "0" }} 
                                helperText={phoneNumber.length === 10 ? "Done" : `${10 - phoneNumber.length} digits more`}
                                placeholder="Enter a 10 Digit Phone Number"
                                value={phoneNumber}
                                />
                                <Grid container alignItems="center" direction="row" sx={{width: "100%", marginTop: "1rem"}}>
                                    <WhatsAppIcon sx={{color: "white", backgroundColor: "green", borderRadius: "50%", marginRight: "0.25rem"}} />
                                    <Typography fontSize="small">WhatsApp is working and preferable</Typography>
                                    <Checkbox color="success" defaultChecked value={whatsAppPreferable} onChange={() => setWhatsAppPreferable(!whatsAppPreferable)} />
                                </Grid>
                                <LoadingButton loading={loading} variant="contained" color="info" type="submit" sx={{ width: "300px", marginTop: "1rem" }}>Place Order</LoadingButton>
                            </Paper>
                        </Grid>
                    </form>
                </AccordionDetails>
            </Accordion></> : <AfterOrderPlaced />
        }</>
    );
}

export default CheckoutSection;
