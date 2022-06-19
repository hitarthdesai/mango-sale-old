import { createContext, useEffect, useState } from "react";
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Cart from './Cart';
import Footer from '../components/Footer';
import Form from "./Form";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "../firebase";

function HomePage() {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState("");
    onAuthStateChanged(auth, user => {
        if(!user)
            setCurrentUser("");
        else
            setCurrentUser(user.email);
    });
        
    const [inventory, setInventory] = useState([]);
    const inventoryReference = collection(db, "inventory");
    useEffect(() => {
        let inventoryArray = [];
        getDocs(inventoryReference).then(snapshot => {
            const arrayOfDocs = snapshot.docs;
            const numberOfDocs = arrayOfDocs.length;
            arrayOfDocs.forEach(document => {
                const documentID = document.id;
                const documentReference = doc(db, `inventory/${documentID}`);
                getDoc(documentReference).then(querySnapshot => {
                    const documentData = querySnapshot.data();
                    inventoryArray.push(documentData);
                    if(inventoryArray.length === numberOfDocs)
                        setInventory(inventoryArray);
                })
            })
        }).catch(error => console.error(error.code));
    }, [])

    const [cart, setCart] = useState({Hafus: 0, Kesar: 0, Langdo: 0, Rajapuri: 0, Amrapali: 0});
    const CartContext = createContext({});
    const [viewCart, setViewCart] = useState(false);

    return (
        <><CartContext.Provider value={{cart, setCart}}>
        <Header />
        {currentUser === "rudradevelopers777@gmail.com" ? <Form currentInventory={inventory} /> :
        <>{viewCart ? <Cart cartContext={CartContext} setViewCart={setViewCart} /> : <MainSection cartContext={CartContext} setViewCart={setViewCart} currentInventory={inventory}/>}</>}
        <Footer />
        </CartContext.Provider></>
    );
}

export default HomePage;