import { SHIPS } from "../../../../Constants/Ships";
import { useShipSelectionContext } from "../../../../Context/ShipSelection/ShipSelectionContext";
import { Select } from "./styles";

const ShipSelect = () => {
    const { selectedShip, updateSelectedShip } = useShipSelectionContext()
    return (
        <Select value={selectedShip} onChange={e => updateSelectedShip(e.target.value)}>
            {Object.keys(SHIPS).map(ship =>
                <option key={ship} value={ship}>{SHIPS[ship].name}</option>
            )}
        </Select>
    )
}
 
export default ShipSelect;