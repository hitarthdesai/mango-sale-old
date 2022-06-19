import { useEffect, useState } from "react";
import { db } from "../firebase"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";

function Form({ currentInventory }) {
    let allMangoes = [];
    currentInventory.map(mango => allMangoes.push(mango.name));
    const [selectedMango, setSelectedMango] = useState("");
    const [detailsOfSelectedMango, setDetailsOfSelectedMango] = useState({});
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");

    useEffect(() => {
        if(Object.keys(detailsOfSelectedMango).length !== 0) {
            setStock(detailsOfSelectedMango.stock);
            setPrice(detailsOfSelectedMango.price);
            setDiscount(detailsOfSelectedMango.discount);
        } else {
            setStock("");
            setPrice("");
            setDiscount("");
        }
    }, [selectedMango])
    

    const handleSubmit = event => {
        event.preventDefault();
        let newData = detailsOfSelectedMango;
        newData.price = Number(price);
        newData.stock = Number(stock);
        newData.discount = Number(discount);

        const inventoryReference = collection(db, "inventory");
        const mangoQuery = query(inventoryReference, where("name", "==", selectedMango));
        getDocs(mangoQuery).then(querySnapshot => {
            const mangoDocRef = querySnapshot.docs[0].ref;
            setDoc(mangoDocRef, newData, { merge: true}).then(() => {
                console.log("UPDATED SUCCESSFULLY");
                setSelectedMango("");
                setDetailsOfSelectedMango({});
            }).catch(error => console.error(error));
        })
        
    }

    const handleMangoSelect = event => {
        const nameOfSelectedMango = event.target.value;
        setSelectedMango(nameOfSelectedMango);
        currentInventory.map(mangoObject => {
            if(mangoObject.name === nameOfSelectedMango) {
                setDetailsOfSelectedMango(mangoObject)
            }
        });
    }

    const ComboBox = () => {
        return(
            <Select
            required
            defaultOpen={selectedMango === ""}
            variant="filled"
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

    const handleChange = event => {
        const newValue = event.target.value;
        if(isNaN(newValue) || Number(newValue) < 0)
            return;
        const elementID = event.target.id;
        if(elementID === "stock")
            setStock(newValue);
        else if(elementID === "price")
            setPrice(newValue);
        else if(elementID === "discount")
            setDiscount(newValue);
    }

    return(
        <form onSubmit={event => handleSubmit(event)}>
            <Grid container alignItems="center" justifyContent="center" direction="column" sx={{width: "100vw", height: "100vh"}}>
                <ComboBox />
                <TextField 
                id="stock"
                type="number" 
                onChange={event => handleChange(event)} 
                variant="filled" 
                sx={{ width: "300px", marginTop: "1rem" }} 
                value={stock} 
                helperText="Enter New Stock"
                placeholder="Select a Mango to get current value"
                />
                <TextField 
                id="price"
                type="number" 
                onChange={event => handleChange(event)} 
                variant="filled" 
                sx={{ width: "300px", marginTop: "1rem" }} 
                value={price} 
                helperText="Enter New Price"
                placeholder="Select a Mango to get current value"
                />
                <TextField 
                id="discount"
                type="number" 
                onChange={event => handleChange(event)} 
                variant="filled" 
                sx={{ width: "300px", marginTop: "1rem" }} 
                value={discount} 
                helperText="Enter New Discount"
                placeholder="Select a Mango to get current value"
                />
                <Button variant="contained" color="primary" type="submit" sx={{ width: "300px", marginTop: "1rem" }}>Update Inventory</Button>
            </Grid>
        </form>
    );
}

export default Form;
