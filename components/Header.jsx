import React, { useEffect, useRef, useState } from 'react';
import Cart from './Cart';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

import AgricultureIcon from '@mui/icons-material/Agriculture';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

function Header({ currentInventory }) {
    const [open, setOpen] = useState(false);
    const appBarRef = useRef(null);
    const [minHeight, setMinHeight] = useState(64);

    useEffect(() => {
        setMinHeight(appBarRef?.current?.clientHeight);
    }, [appBarRef])

    return (
    <AppBar position="static" ref={appBarRef}>
        <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <IconButton size="large" color="inherit"><AgricultureIcon /></IconButton>
            {open ? 
            <IconButton variant='contained' onClick={() => setOpen(false)}><CloseIcon /></IconButton> : 
            <IconButton variant='contained' onClick={() => setOpen(true)}><ShoppingCartIcon /></IconButton>}
        </Toolbar>
        <Drawer anchor='top' open={open} sx={{ transform: `translateY(${minHeight}px)` }}>
            <Cart currentInventory={currentInventory} />
            <Container sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Link href="/checkout">
                    <Button variant="contained" sx={{ width: "100%", margin: "0.5rem 0" }}>PROCEED TO CHECKOUT</Button>
                </Link>
            </Container>
        </Drawer>
        </Container>
    </AppBar>
    );
}
export default Header;
