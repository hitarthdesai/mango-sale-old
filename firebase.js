import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAzjDWIruwof_nUYLxkm-KLKbWLC5Mzag8",
    authDomain: "mango-sale.firebaseapp.com",
    projectId: "mango-sale",
    storageBucket: "mango-sale.appspot.com",
    messagingSenderId: "605701476054",
    appId: "1:605701476054:web:9ba056b77b90ea137f8377"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}; 