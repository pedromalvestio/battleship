import { PlaceShipBoard } from "Components/ShipSelection/PlaceShipBoard";
import { ShipMenu } from "Components/ShipSelection/ShipMenu";
import { ShipSelectionProvider } from "Context/ShipSelection/ShipSelectionContext";
import { ShipSelectionContainer } from "./styles";

const ShipSelection = () => {
    
    return (
        <ShipSelectionProvider>
            <ShipSelectionContainer>
                <h2>Place your Ships</h2>
                <ShipMenu />
                <PlaceShipBoard />
            </ShipSelectionContainer>
        </ShipSelectionProvider>
    )
}
 
export default ShipSelection;