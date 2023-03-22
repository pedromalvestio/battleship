import { SHIPS } from "Constants/Ships";
import { useShipSelectionContext } from "Context/ShipSelection/ShipSelectionContext";
import { Select } from "./styles";

const ShipSelect = () => {
    const { selectedShip, updateSelectedShip } = useShipSelectionContext()
    const onSelectChange = event => {
        updateSelectedShip(event.target.value)
    }
    return (
        <Select value={selectedShip} onChange={onSelectChange}>
            {Object.keys(SHIPS).map(ship =>
                <option key={ship} value={ship}>{SHIPS[ship].name}</option>
            )}
        </Select>
    )
}
 
export default ShipSelect;