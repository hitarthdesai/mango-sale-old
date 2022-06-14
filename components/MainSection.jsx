import MangoCard from "./MangoCard"
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function MainSection () {
    const mango = ["Hafus", "Kesar", "Langdo", "Rajapuri", "Amrapali"];

    return (
        <Grid container spacing="1rem" padding="1rem">{
            mango.map(item => <Grid item xs={12} sm={6} md={4} lg={3} xl={2}><MangoCard mango={item} /></Grid>)
        }</Grid>
    );
}

export default MainSection;