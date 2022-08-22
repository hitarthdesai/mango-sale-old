import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/cart";
import Link from "next/link";
import Cart from "./Cart";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<IconButton size="large" color="inherit">
						<AgricultureIcon />
					</IconButton>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Header;
