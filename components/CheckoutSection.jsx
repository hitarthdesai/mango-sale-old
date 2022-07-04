import { useEffect, useState, useRef } from 'react';
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

function CheckoutSection() {
    const addressInputField = useRef(null);
    useEffect(() => {

    }, [addressInputField])

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
            fetch('https://graph.facebook.com/v13.0/109961868433439/messages', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer EAAHQxna6ZBDgBAP9JLGF0fqNL0yc4fSSgMWc9KN633q78POyGdTZCZAzIlEHOYWt79ZAw0kuCc2FYPVSzsZCJKKnpennZBsmdfiJKO5wUDRJkaRIDc9psmifnijrOehR0ihGESmFIDAzfkQcth9NeYPrasZAdERYb47of3niwlWBee1OLTgyl16VuM4iu33G7bVEYYLdfaKigZDZD',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        messaging_product: 'whatsapp',
                        to: '16478796796',
                        type: 'text',
                        text: {
                            body: `Hello From Rudra Developers\n\nWe are processing your most recent order with reference number *${orderReference}*. We will contact you shortly for more details. Thank you!`
                        },
                        // 'type': 'template',
                        // 'template': {
                        //     'name': 'hello_world',
                        //     'language': {
                        //         'code': 'en_US'
                        //     }
                        // }
                    }
                )
            }).then(() => console.log("SUCCESS")).catch(error => console.log(error));
        })
    }

    const AfterOrderPlaced = () => (
        <Container>
            <Typography variant='body2'>Your Order Reference Is:</Typography>
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
                                <TextField
                                required
                                ref={addressInputField}
                                // onChange={event => handlePhoneNumber(event)} 
                                variant="filled" 
                                sx={{ width: "300px", marginTop: "1rem" }} 
                                // helperText={phoneNumber.length === 10 ? "Done" : `${10 - phoneNumber.length} digits more`}
                                placeholder="Enter Address"
                                // value={phoneNumber}
                                />
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

/*

  <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>

// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let autocomplete: google.maps.places.Autocomplete;
let address1Field: HTMLInputElement;
let address2Field: HTMLInputElement;
let postalField: HTMLInputElement;

function initAutocomplete() {
  address1Field = document.querySelector("#ship-address") as HTMLInputElement;
  address2Field = document.querySelector("#address2") as HTMLInputElement;
  postalField = document.querySelector("#postcode") as HTMLInputElement;

  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us", "ca"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }

      case "locality":
        (document.querySelector("#locality") as HTMLInputElement).value =
          component.long_name;
        break;

      case "administrative_area_level_1": {
        (document.querySelector("#state") as HTMLInputElement).value =
          component.short_name;
        break;
      }

      case "country":
        (document.querySelector("#country") as HTMLInputElement).value =
          component.long_name;
        break;
    }
  }

  address1Field.value = address1;
  postalField.value = postcode;

  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.focus();
}

declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}
window.initAutocomplete = initAutocomplete;
export {};

*/

/*
curl -i -X POST \
  https://graph.facebook.com/v13.0/109961868433439/messages \
  -H 'Authorization: Bearer EAAHQxna6ZBDgBAP9JLGF0fqNL0yc4fSSgMWc9KN633q78POyGdTZCZAzIlEHOYWt79ZAw0kuCc2FYPVSzsZCJKKnpennZBsmdfiJKO5wUDRJkaRIDc9psmifnijrOehR0ihGESmFIDAzfkQcth9NeYPrasZAdERYb47of3niwlWBee1OLTgyl16VuM4iu33G7bVEYYLdfaKigZDZD' \
  -H 'Content-Type: application/json' \
  -d '{ "messaging_product": "whatsapp", "to": "16478796796", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }'
*/

/*
fetch('https://graph.facebook.com/v13.0/109961868433439/messages', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer EAAHQxna6ZBDgBAP9JLGF0fqNL0yc4fSSgMWc9KN633q78POyGdTZCZAzIlEHOYWt79ZAw0kuCc2FYPVSzsZCJKKnpennZBsmdfiJKO5wUDRJkaRIDc9psmifnijrOehR0ihGESmFIDAzfkQcth9NeYPrasZAdERYb47of3niwlWBee1OLTgyl16VuM4iu33G7bVEYYLdfaKigZDZD',
        'Content-Type': 'application/json'
    },
    // body: '{ "messaging_product": "whatsapp", "to": "16478796796", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }',
    body: JSON.stringify({
        'messaging_product': 'whatsapp',
        'to': '16478796796',
        'type': 'template',
        'template': {
            'name': 'hello_world',
            'language': {
                'code': 'en_US'
            }
        }
    })
});
*/