import React, { useRef, useState } from 'react';
import Cart from './Cart';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';

import AgricultureIcon from '@mui/icons-material/Agriculture';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

function Header({ currentInventory }) {
    const [open, setOpen] = useState(false);

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <IconButton size="large" color="inherit"><AgricultureIcon /></IconButton>
            {open ? 
            <IconButton variant='contained' onClick={() => setOpen(false)}><CloseIcon /></IconButton> : 
            <IconButton variant='contained' onClick={() => setOpen(true)}><ShoppingCartIcon /></IconButton>}
        </Toolbar>
        <Drawer anchor='top' open={open}>
            <AppBar><Toolbar><IconButton variant='contained' onClick={() => setOpen(false)}><CloseIcon /></IconButton></Toolbar></AppBar>
            <Cart currentInventory={currentInventory} />
        </Drawer>
        </Container>
    </AppBar>
    );
}
export default Header;
