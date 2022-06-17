import { createContext, useState } from "react";
import MangoCard from "./MangoCard"
import Grid from "@mui/material/Grid";

function MainSection () {
    const mango = ["Hafus", "Kesar", "Langdo", "Rajapuri", "Amrapali"];
    const [cart, setCart] = useState({Hafus: 0, Kesar: 0, Langdo: 0, Rajapuri: 0, Amrapali: 0});
    const CartContext = createContext({});
    console.log(cart);

    return (
        <CartContext.Provider value={{cart, setCart}}><Grid container spacing="1rem" padding="1rem">{
            mango.map((item, index) => <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}><MangoCard mango={item} cartContext={CartContext} /></Grid>)
        }</Grid></CartContext.Provider>
    );
}

export default MainSection;