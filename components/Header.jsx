import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { ViewContext } from "../context/view";

function Header() {
	const { view, setView } = useContext(ViewContext);
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
					{view === "cart" ? (
						<IconButton
							size="large"
							color="inherit"
							onClick={() => setView("home")}
						>
							<CloseIcon />
						</IconButton>
					) : (
						<IconButton
							size="large"
							color="inherit"
							onClick={() => setView("cart")}
						>
							<ShoppingCartIcon />
						</IconButton>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Header;
