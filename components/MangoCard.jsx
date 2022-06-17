import React, { useContext, useState } from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddAlertIcon from '@mui/icons-material/AddAlert';

function MangoCard({ mango, cartContext }) {
    const name = mango;
    const purpose = "Pickle";
    const photo = "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";
    const price = 500;
    const stock = 1;

    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const {cart, setCart} = useContext(cartContext);

    const RemindMeButton = () => (
        <Button><AddAlertIcon />Remind Me</Button>
    );
    const AddToCartButton = () => (
        <IconButton onClick={() => {
            setQuantity(1);
            setAddedToCart(true);
            let newCart = cart;
            newCart[name] = quantity;
            setCart(newCart);
        }}><AddShoppingCartIcon /></IconButton>
    )

    return(
        <Card key={name} id={name}>
            <CardHeader title={name} subheader={`₹${price}`} />
            <CardMedia image={photo} sx={{ height: "200px" }} />
            <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">price</Typography>
                </div>
                <CardActions>{
                    stock === 0 ?
                    <RemindMeButton /> :
                    addedToCart ? 
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <IconButton onClick={() => {
                            if(quantity == 1) {
                                setQuantity(0);
                                let newCart = cart;
                                newCart[name] = quantity;
                                setCart(newCart);
                                setAddedToCart(false);
                            } else {
                                setQuantity(quantity - 1);
                                let newCart = cart;
                                newCart[name] = quantity;
                                setCart(newCart);
                            }
                        }}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography gutterBottom={false} align="center" variant="h5">{quantity}</Typography>
                        <IconButton onClick={() => {
                            setQuantity(quantity + 1);
                            let newCart = cart;
                            newCart[name] = quantity;
                            setCart(newCart);
                        }}>
                            <AddIcon />
                        </IconButton>
                    </div> : <AddToCartButton />
                }</CardActions>
            </CardContent>
        </Card>
    );
}

export default MangoCard;