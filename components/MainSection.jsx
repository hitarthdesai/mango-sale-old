import MangoCard from "./MangoCard"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { CartContext } from "../context/cart";

function MainSection () {
    const { cart } = useContext(CartContext);
    return (<>
        <Grid container spacing="1rem" padding="1rem">{
            Object.keys(cart).map(mangoName => <Grid key={mangoName} item xs={12} sm={6} md={4} lg={3} xl={2}><MangoCard mango={cart[mangoName]} /></Grid>)
        }</Grid>
    </>);
}

export default MainSection;