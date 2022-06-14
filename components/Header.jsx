import React, { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import AgricultureIcon from '@mui/icons-material/Agriculture';

function ResponsiveAppBar() {
    const pages = ['Products', 'Pricing', 'Blog'];
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const menuIconButtonRef = useRef(null);

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit"><AgricultureIcon /></IconButton>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setOpenNavMenu(true)}
                color="inherit"
                ref={menuIconButtonRef}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={menuIconButtonRef.current}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={openNavMenu}
                onClose={() => setOpenNavMenu(false)}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                <MenuItem key={page} onClick={() => setOpenNavMenu(false)}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                key={page}
                onClick={() => setOpenNavMenu(false)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                {page}
                </Button>
            ))}
            </Box>

        </Toolbar>
        </Container>
    </AppBar>
    );
}
export default ResponsiveAppBar;
