import { useState } from "react";
import { db } from "../firebase"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { addDoc, collection, doc } from "firebase/firestore";

function Form() {
    const inventoryReference = collection(db, "inventory");

    return(
        // <form onSubmit={event => handleSubmit(event)}>
        //     <Grid container alignItems="center" justifyContent="center" direction="column" sx={{width: "100vw", height: "100vh"}}>
        //         <TextField
        //         id="mango-input"
        //         name="mango"
        //         label="Name of Mango"
        //         type="text"
        //         onChange={event => setMango(event.target.value)}
        //         value={mango}
        //         />
        //         <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "1rem" }}>Submit</Button>
        //     </Grid>
        // </form>
        <>HUH</>
    );
}

export default Form;