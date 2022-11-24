import { BOARD_SIZE } from "../Constants/Board";
import { isBoxShip } from "../Constants/Box";

export const createArray = (size, value) => {
    return Array(size).fill(value);
}

const findBoatInRowPosition = (array, startPosition, endPosition) => {
    return array.slice(startPosition,endPosition).some(isBoxShip)
}

export const isOutOfRowBoundaries = (endPosition) => {
    return BOARD_SIZE < endPosition;
}
export const canPlaceShipAtRow = (array, startPosition, endPosition) => {
    return !findBoatInRowPosition(array, startPosition, endPosition) && !isOutOfRowBoundaries(endPosition)
}