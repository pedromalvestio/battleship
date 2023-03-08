import { createArray } from "../Helper/ArrayHelper";
import { BOX_STATE } from "./Box";

export const BOARD_SIZE = 10

export const emptyRow = createArray(BOARD_SIZE,BOX_STATE.EMPTY)
export const emptyBoard = createArray(BOARD_SIZE,emptyRow)

export const getRandomPosition = () => Math.floor(Math.random() * BOARD_SIZE)

export const getRandomBoardPosition = () => [getRandomPosition(), getRandomPosition()]