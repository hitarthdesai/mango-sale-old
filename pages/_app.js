import { useState } from "react";
import Header from "../components/Header";

import { CartContext } from "../context/cart";
import { ViewContext } from "../context/view";

import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
	const [cart, setCart] = useState({});
	const cartSetter = newCart => {
		setCart(newCart);
	};
	const [view, setView] = useState("home");
	const viewSetter = newView => {
		setView(newView);
	};
	return (
		<ViewContext.Provider value={{ view, setView: viewSetter }}>
			<CartContext.Provider value={{ cart, setCart: cartSetter }}>
				<CssBaseline />
				<Header />
				<Component {...pageProps} />
			</CartContext.Provider>
		</ViewContext.Provider>
	);
}

export default MyApp;
