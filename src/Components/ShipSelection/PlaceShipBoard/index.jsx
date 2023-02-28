import Board from "../../../Atoms/Board"
import { usePalceShip } from "./UsePlaceShip"

export const PlaceShipBoard = ({selectedShipIndex}) => {
    const { board, placeShip } = usePalceShip(selectedShipIndex)
    return (
        <Board
                board={board}
                getRowPosition={placeShip}
            />
    )
}