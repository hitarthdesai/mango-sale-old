import MangoCard from "./MangoCard";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { InventoryContext } from "../context/inventory";

function MainSection() {
	const { inventory } = useContext(InventoryContext);
	return (
		<>
			<Grid container spacing="1rem" padding="1rem">
				{Object.keys(inventory).map(mangoName => (
					<Grid
						key={mangoName}
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						xl={2}
					>
						<MangoCard mango={inventory[mangoName]} />
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default MainSection;
