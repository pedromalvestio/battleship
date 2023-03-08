import { BOX_STATE } from "../Constants/Box"
import { addShipOnRow } from "./ShipHelper"

export const addShipAtBoard = (board, ship) => board.map((row, index) => 
    ship.row !== index ? row : addShipOnRow(ship, row)
)

export const isBoardPositionShotable = (board, row, box) => board[row][box] !== BOX_STATE.HIT && board[row][box] !== BOX_STATE.MISS
