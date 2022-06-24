import { useContext } from "react";
import MangoCard from "./MangoCard"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function MainSection ({ cartContext, viewCartContext, currentInventory }) {
    const { setViewCart } = useContext(viewCartContext);
    return (<>
        <Grid container spacing="1rem" padding="1rem">{
            currentInventory.map((item, index) => <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}><MangoCard mango={item} cartContext={cartContext} mangoInventory={currentInventory[index]} /></Grid>)
        }</Grid>
        <Button onClick={() => setViewCart(true)}>View Cart</Button>
    </>);
}

export default MainSection;