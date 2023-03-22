import { getRowBoxByHittedShip, isAnyShipAtPosition, isShipSinked, sinkShipOnRow } from "../../../Helper/ShipHelper"


export const useShotBoard = (board, shipsArray) => {

    const shotBoard = (rowIndex, boxIndex) => {
        const hittedShipIndex = getHittedShipIndex(rowIndex, boxIndex)
        const { shotedShipArray, ship } = updateShottedShipAndArray(hittedShipIndex)
        const shotedShipBoard = updateShottedBoard(ship, rowIndex, boxIndex)

        return { shotedShipArray, shotedShipBoard }
    }
    
    const getHittedShipIndex = (rowIndex, boxIndex) => shipsArray.findIndex(ship => isAnyShipAtPosition(ship, rowIndex, boxIndex))
    
    const updateShottedShipAndArray = (hittedShipIndex) => {
        const shotedShipArray = shipsArray.map(
            (ship,index) => index !== hittedShipIndex ? ship : {...ship, hits: ship.hits+1}
        )
        const ship = hittedShipIndex >= 0 ? shotedShipArray[hittedShipIndex] : {hits: 1, size: 0}
        return { shotedShipArray, ship }
    }
    
    const updateShottedBoard = (hittedShip, rowIndex, boxIndex) => 
        board.map(
            (row, index) => index !== rowIndex ? row 
            : isShipSinked(hittedShip) ? sinkShipOnRow(hittedShip,row) 
                : row.map((box, index) => index !== boxIndex ? box 
                    : getRowBoxByHittedShip(hittedShip)
                )
        )

    return [
        (rowIndex, boxIndex) => shotBoard(rowIndex, boxIndex)
    ]
}