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

    const [cart, setCart] = useState({"Hafus(N)": 0, "Hafus(L)": 0, "Kesar(N)": 0, "Kesar(L)": 0, "Rajapuri(N)": 0, "Rajapuri(L)": 0, "Daseri(N)": 0, "Daseri(L)": 0, "Langdo(N)": 0, "Langdo(L)": 0, "Totapuri(N)": 0, "Totapuri(L)": 0});
    const CartContext = createContext({});
    const [viewCart, setViewCart] = useState(false);
    const ViewCartContext = createContext({});

    return (
        <><CartContext.Provider value={{cart, setCart}}><ViewCartContext.Provider value={{viewCart, setViewCart}}>
        <Header />
        {currentUser === "rudradevelopers777@gmail.com" ? <Form currentInventory={inventory} /> :
        <>{viewCart ? <Cart cartContext={CartContext} viewCartContext={ViewCartContext} /> : <MainSection cartContext={CartContext} viewCartContext={ViewCartContext} currentInventory={inventory}/>}</>}
        <Footer />
        </ViewCartContext.Provider></CartContext.Provider></>
    );
}

export default HomePage;