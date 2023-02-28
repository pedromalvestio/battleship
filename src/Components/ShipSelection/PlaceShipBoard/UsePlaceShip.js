import { SHIPS } from "../../../Constants/Ships";
import { usePlayer } from "../../../Context/Player/PlayerContext";
import { useShipSelectionContext } from "../../../Context/ShipSelection/ShipSelectionContext";
import { canPlaceShipAtRow } from "../../../Helper/ArrayHelper";
import { addShipAtBoard } from "../../../Helper/BoardHelper";
import { useShipSelection } from "../UseShipSelection";

export const usePalceShip = () => {
    const { updatePlayer, board, ships } = usePlayer()
    const { selectedShip } = useShipSelectionContext()
    const { SelectedShipCount } = useShipSelection(selectedShip)

    const placeShip = (rowIndex, boxIndex) => {
        const { size, quantity } = SHIPS[selectedShip]
        const boatPosition = boxIndex+size;
        if (canPlaceShipAtRow(board[rowIndex], boxIndex, boatPosition) && quantity > SelectedShipCount()) {
            const newShip = {
                row: rowIndex,
                box: boxIndex,
                size: size
            }
            const boardWithNewShip = addShipAtBoard(board,newShip)
            const newShipsArray = [...ships, newShip]
            updatePlayer(boardWithNewShip, newShipsArray)
        }
    }

    return {
        board,
        placeShip
    }
}