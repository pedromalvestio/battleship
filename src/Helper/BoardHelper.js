import { BOX_STATE } from "../Constants/Box"
import { isShipSinked, sinkShipOnRow } from "./ShipHelper"

export const updateHittedBoard = (board, ship, rowIndex, boxIndex) => 
    board.map(
        (row, index) => index !== rowIndex ? row 
        : isShipSinked(ship) ? sinkShipOnRow(ship,row) 
            : row.map((box, index) => index !== boxIndex ? box 
                : ship.size > 0 ? BOX_STATE.HIT
                    : BOX_STATE.MISS
            )
    )
