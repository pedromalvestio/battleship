import { getRandomBoardPosition } from "Constants/Board"
import { usePlayer } from "Context/Player/PlayerContext"
import { isBoardPositionShotable } from "Helper/BoardHelper"
import { allShipsSinked } from "Helper/ShipHelper"
import { useShotBoard } from "./UseShotBoard"

export const useGameBoard = () => {
    const TURN_CHANGE_TIME = 1000

    const { 
        board, ships, 
        enemyBoard, enemyShips,
        updateEnemy, updatePlayer, finishGame 
    } = usePlayer()

    const [ enemyBoardShot ] = useShotBoard(enemyBoard, enemyShips)

    const shotEnemyBoard = (rowIndex, boxIndex) => {
        const { shotedShipBoard, shotedShipArray } = enemyBoardShot(rowIndex, boxIndex)
        checkEndGame(shotedShipArray, "Player")
        updateEnemy(shotedShipBoard, shotedShipArray)
    }

    const  [ playerBoardShot ] = useShotBoard(board, ships)

    const shotPlayerBoard = () => {
        const [randomRow, randomBox] = getRandomBoardPosition()
        if (isBoardPositionShotable(board, randomRow, randomBox)) {
            const { shotedShipBoard, shotedShipArray } = playerBoardShot(randomRow, randomBox)
            checkEndGame(shotedShipArray, "Enemy")
            updatePlayer(shotedShipBoard,shotedShipArray)
        } 
        else shotPlayerBoard()
    }

    const checkEndGame = (array, currentPlayer) => {
        if (allShipsSinked(array))
            finishGame(currentPlayer)
    }

    return {
        enemyBoard,
        shotEnemyBoard,
        board,
        shotPlayerBoard,
        TURN_CHANGE_TIME
    }
}