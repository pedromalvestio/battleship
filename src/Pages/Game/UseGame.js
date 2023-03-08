import { useRef } from "react"
import { getRandomBoardPosition } from "../../Constants/Board"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { isBoardPositionShotable } from "../../Helper/BoardHelper"
import { allShipsSinked } from "../../Helper/ShipHelper"
import { useShotBoard } from "./UseShotBoard"

export const useGame = (setPlayerTurn) => {
    const TURN_CHANGE_TIME = 800
    const SHOT_PLAYER_TIME = 1400

    const { 
        board, ships, 
        enemyBoard, enemyShips,
        updateEnemy, updatePlayer, finishGame 
    } = usePlayer()

    const turnEnding = useRef(false)

    const onBoardClick = (rowIndex, boxIndex) => {
        if (turnEnding.current) return
        shotEnemyBoard(rowIndex, boxIndex)
        changeTurn()
    }
    
    const [ enemyBoardShot ] = useShotBoard(enemyBoard, enemyShips)

    const shotEnemyBoard = (rowIndex, boxIndex) => {
        const { shotedShipBoard, shotedShipArray } = enemyBoardShot(rowIndex, boxIndex)
        checkEndGame(shotedShipArray, "Player")
        updateEnemy(shotedShipBoard, shotedShipArray)
    }

    const changeTurn = () => {
        turnEnding.current = true
        setTimeout(() => {
            toogleTurn()
            setTimeout(() => {
                shotPlayerBoard()
                setTimeout(() => {
                    toogleTurn()
                    turnEnding.current = false
                },SHOT_PLAYER_TIME)
            },TURN_CHANGE_TIME)
        },TURN_CHANGE_TIME)
    }
    
    const toogleTurn = () => {
        setPlayerTurn(turn => !turn)
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
        onBoardClick
    }
}