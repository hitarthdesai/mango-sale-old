import React, { useState } from 'react'
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { app } from "../firebase"

const auth = getAuth();
function Signin() {
    const [signinEmail, setSigninEmail] = useState("");
    const [signinPassword, setSigninPassword] = useState("");
    const [error, setError] = useState("");

    const auth = getAuth(app);
    const handleSignIn = event => {
        event.preventDefault();
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, signinEmail, signinPassword)
            .then((userCredential) => {
                console.log(userCredential.user)
                console.log("Signed in successfully.");
                window.location = "/";
            })
            .catch(error => {
                setError(error.code);
            });
        })
    }

    return (
        <form onSubmit={event => handleSubmit(event)}>
            <Grid container alignItems="center" justifyContent="center" direction="column" sx={{width: "100vw", height: "100vh"}}>
                <TextField
                required
                type="email"
                label="Admin Email"
                onChange={event => setSigninEmail(event.target.value)}
                sx={{width: "300px", marginTop: "1rem"}}
                autoComplete="none"
                />
                <TextField
                required
                type="password"
                label="Admin Password"
                onChange={event => setSigninPassword(event.target.value)}
                sx={{width: "300px", marginTop: "1rem"}}
                autoComplete="none"
                />
                {error !== "" &&
                <Typography size='xs' sx={{fontStyle: "italic"}} weight="bolder" color="red">
                    {signinPasswordError}
                </Typography>}
                <Button variant='contained' onClick={handleSignIn} style={{width: "300px", marginTop: "1rem"}}>
                    Sign In
                </Button>
            </Grid>
        </form>
    );
}

export default Signin;