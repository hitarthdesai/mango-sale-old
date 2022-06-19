import { useState } from "react";
import { db } from "../firebase"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { addDoc, collection, doc } from "firebase/firestore";

function Form({ currentInventory }) {
    const allMangoes = Object.keys(currentInventory);
    const [selectedMango, setSelectedMango] = useState("");
    const inventoryReference = collection(db, "inventory");

    const handleMangoSelect = event => {
        const nameOfSelectedMango = event.target.value;
        setSelectedMango(nameOfSelectedMango);
        console.log(currentInventory[nameOfSelectedMango]);
    }

    const ComboBox = () => {
        return(
            <Select
            required
            defaultOpen={selectedMango === ""}
            variant="filled"
            defaultValue="Select Mango"
            id="mango-combo-box"
            sx={{ width: "300px" }}
            value={selectedMango}
            onChange={event => handleMangoSelect(event)}
            >{
                allMangoes.map(mango => (
                    <MenuItem value={mango} key={mango}>{mango}</MenuItem>
                ))
            }</Select>
        );
    }

    return(
        <form onSubmit={event => handleSubmit(event)}>
            <Grid container alignItems="center" justifyContent="center" direction="column" sx={{width: "100vw", height: "100vh"}}>
                <ComboBox />
                <TextField variant="outlined" sx={{ width: "300px" }} />
                <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "1rem" }}>Submit</Button>
            </Grid>
        </form>
    );
}

export default Form;
