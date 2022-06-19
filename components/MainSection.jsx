import MangoCard from "./MangoCard"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function MainSection ({ cartContext, setViewCart, currentInventory }) {
    let allMangoes = [];
    if(currentInventory) {
        allMangoes = Object.keys(currentInventory);
    }
    return (<>
        <Grid container spacing="1rem" padding="1rem">{
            allMangoes.map((item, index) => <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}><MangoCard mango={item} cartContext={cartContext} /></Grid>)
        }</Grid>
        <Button onClick={() => setViewCart(true)}>View Cart</Button>
    </>);
}

export default MainSection;