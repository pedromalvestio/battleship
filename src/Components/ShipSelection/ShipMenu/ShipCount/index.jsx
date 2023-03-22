import { useShipSelection } from "Components/ShipSelection/UseShipSelection";
import { useShipSelectionContext } from "Context/ShipSelection/ShipSelectionContext";

import { ShipCountCountainer } from "./styles";

const ShipCount = () => {
    const { shipQuantity } = useShipSelectionContext()
    const { SelectedShipCount } = useShipSelection()

    return (
        <ShipCountCountainer>
            {SelectedShipCount()}/{shipQuantity}
        </ShipCountCountainer>
    )
}
 
export default ShipCount;