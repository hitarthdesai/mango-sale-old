import { useEffect, useState } from "react";
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Cart from './Cart';
import Footer from '../components/Footer';
import Form from "./Form";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "../firebase";
import { CartContext } from "../context/cart";

function HomePage() {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState("");
    onAuthStateChanged(auth, user => {
        if(!user)
        setCurrentUser("");
        else
        setCurrentUser(user.email);
    });
    
    const [cart, setCart] = useState({"Hafus": {}, "Kesar": {}, "Rajapuri": {}, "Daseri": {}, "Langdo": {}, "Totapuri": {}});
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
                    if(inventoryArray.length === numberOfDocs) {
                        setInventory(inventoryArray);
                        let sampleCart = {};
                        inventoryArray.map(mangoItem => {
                            const mangoName = mangoItem.name;
                            sampleCart[mangoName] = { ...mangoItem, quantity: 0 };
                        });
                        setCart(sampleCart);
                    }
                })
            })
        }).catch(error => console.error(error.code));
    }, []);

    return (
        <><CartContext.Provider value={{cart, setCart}}>
            <Header />
            {currentUser === "rudradevelopers777@gmail.com" ? 
            <Form /> :
            <MainSection />}
            <Footer />
        </CartContext.Provider></>
    );
}

export default HomePage;