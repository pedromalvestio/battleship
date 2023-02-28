import { useShipSelectionContext } from "../../../../Context/ShipSelection/ShipSelectionContext";
import { useShipSelection } from "../../UseShipSelection";
import { ShipCountCountainer } from "./styles";

const ShipCount = ({shipCount}) => {
    const { shipQuantity } = useShipSelectionContext()
    const { SelectedShipCount } = useShipSelection()

    return (
        <ShipCountCountainer>
            {SelectedShipCount()}/{shipQuantity}
        </ShipCountCountainer>
    )
}
 
export default ShipCount;