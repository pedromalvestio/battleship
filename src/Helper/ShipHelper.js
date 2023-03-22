import { getRandomBoardPosition } from "Constants/Board";
import { BOX_STATE } from "Constants/Box";
import { INVALID_SHIP_SIZE, shipQuantity, SHIPS } from "Constants/Ships";
import { isOutOfRowBoundaries } from "./ArrayHelper";

export const isShipSinked = (ship) => ship.hits === ship.size;

const isShipHitted = (ship) => ship.size > INVALID_SHIP_SIZE

export const getRowBoxByHittedShip = (ship) => isShipHitted(ship) ? BOX_STATE.HIT : BOX_STATE.MISS

export const allShipsSinked = (shipsArray) => (
    shipQuantity() === shipsArray.filter(s => s.size === s.hits).length
)

export const addShipOnRow = (ship, arrayRow) => changeRowBoxesByShipPosition(ship, arrayRow, BOX_STATE.SHIP)
export const sinkShipOnRow = (ship, arrayRow) => changeRowBoxesByShipPosition(ship, arrayRow, BOX_STATE.SINK)
export const removeShipFromRow = (ship, arrayRow) => changeRowBoxesByShipPosition(ship, arrayRow, BOX_STATE.EMPTY)

const changeRowBoxesByShipPosition = (ship, arrayRow, boxState) => {
    const { box, size } = ship
    const newRow = arrayRow.map((column,index) => 
            index >= box && index < (box+size) ? boxState : column)
    return newRow
}

export const isAnyShipAtPosition = (ship, rowIndex, boxIndex) => {
    const { row, box, size } = ship
    return row === rowIndex && box <= boxIndex && boxIndex < (box + size)
}

const canPlaceShipAtRowPosition = ({shipToCompare, boxIndex, shipPosition}) => {
    const { box, size } = shipToCompare
    return box <= boxIndex && shipPosition < (box + size)
}

const placeRandomShip = (shipList, shipSize) => {
    const [randomRow, randomBox] = getRandomBoardPosition()
    const shipPosition = randomBox + shipSize
    if (!isOutOfRowBoundaries(shipPosition)) {
        const boatCount = shipList.length === 0 ? [] : shipList.filter(ship => 
            ship.row === randomRow && canPlaceShipAtRowPosition(ship, randomBox, shipPosition))
        if (boatCount.length === 0){
            return {
                row: randomRow,
                box: randomBox,
                size: shipSize,
                hits: 0
            }
        }
    }
    return placeRandomShip(shipList, shipSize)
}

export const getRadomShips = () => {
    let randomShips = []
    Object.values(SHIPS).forEach(
        ship => {
            for (let quantity = 0; quantity < ship.quantity; quantity++) {
                randomShips.push(placeRandomShip(randomShips, ship.size))
            }
        }
    )

    return randomShips
}