import { createContext, useEffect, useState } from "react";
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Cart from './Cart';
import Footer from '../components/Footer';
import Form from "./Form";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";

function HomePage() {
    const [inventory, setInventory] = useState({});
    const inventoryReference = collection(db, "inventory");
    useEffect(() => {
        let inventoryArray = {};
        getDocs(inventoryReference).then(snapshot => {
            const arrayOfDocs = snapshot.docs;
            arrayOfDocs.forEach(document => {
                const documentID = document.id;
                const documentReference = doc(db, `inventory/${documentID}`);
                getDoc(documentReference).then(querySnapshot => {
                    const documentData = querySnapshot.data();
                    inventoryArray[documentData.name] = documentData;
                }).then(() => setInventory(inventoryArray));
            })
        })
    }, [])

    const [cart, setCart] = useState({Hafus: 0, Kesar: 0, Langdo: 0, Rajapuri: 0, Amrapali: 0});
    const CartContext = createContext({});
    const [viewCart, setViewCart] = useState(false);

    return (
        <><CartContext.Provider value={{cart, setCart}}>
        {/* <Header /> */}
        {/* {viewCart ? <Cart cartContext={CartContext} setViewCart={setViewCart} /> : <MainSection cartContext={CartContext} setViewCart={setViewCart} />} */}
        {/* <Footer /> */}
        <Form currentInventory={inventory}/>
        </CartContext.Provider></>
    );
}

export default HomePage;