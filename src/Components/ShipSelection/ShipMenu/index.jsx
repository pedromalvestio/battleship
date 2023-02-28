import Button from "../../../Atoms/Button"
import ShipSelect from "./ShipSelect"
import ShipCount from "./ShipCount"
import { ShipMenuContainer } from "./styles"
import { useShipSelection } from "../UseShipSelection"

export const ShipMenu = () => {

    const { 
        anySelectShipPlaced,
        isAllShipsPlaced,
        startGame, 
        removeSelectedShips, 
    } = useShipSelection()

    return (
        <ShipMenuContainer>
            <ShipSelect />
            <ShipCount />
            {anySelectShipPlaced && <Button text={"Clear"} click={removeSelectedShips} />}
            {isAllShipsPlaced && <Button text={"Done"} click={startGame} />}
        </ShipMenuContainer>
    )
}