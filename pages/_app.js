import { CssBaseline } from "@mui/material";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<CssBaseline />
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
