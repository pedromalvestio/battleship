import { useRef } from "react"
import { getRandomPosition } from "../../Constants/Board"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { isBoardPositionShotable, updateHittedBoard } from "../../Helper/BoardHelper"
import { allShipsSinked, isAnyShipAtPosition } from "../../Helper/ShipHelper"

export const useGame = (setPlayerTurn) => {
    const { 
        board, ships, 
        enemyBoard, enemyShips,
        updateEnemy, updatePlayer, finishGame 
    } = usePlayer()

    const turnEnding = useRef(false)

    const updateHittedShip = (shipArray, hittedShip) => {
        const newShipsArray = shipArray.map(
            (ship,index) => index !== hittedShip ? ship : {...ship, hits: ship.hits+1}
        )
        const ship = hittedShip >= 0 ? newShipsArray[hittedShip] : {hits: 1, size: 0}
        
        return { newShipsArray, ship }
    }

    const toogleTurn = () => {
        setPlayerTurn(turn => !turn)
    }
     
    const changeTurn = () => {
        setTimeout(() => {
            toogleTurn()
            setTimeout(
                () => {
                    shotPlayerBoard()
                    setTimeout(
                        () => {
                            toogleTurn()
                            turnEnding.current = false
                    },2000)
            },1000)
        }, 1000)
    }

    const onBoardClick = (rowIndex, boxIndex) => {
        if (turnEnding.current) return
        shotEnemyBoard(rowIndex, boxIndex)
        turnEnding.current = true
        changeTurn()
    }

    const shotEnemyBoard = (rowIndex, boxIndex) => {
        const hittedShip = enemyShips.findIndex(ship => isAnyShipAtPosition(ship, rowIndex, boxIndex))
        const {newShipsArray, ship} = updateHittedShip(enemyShips, hittedShip)
        checkEndGame(newShipsArray, "Player")
        const newBoard = updateHittedBoard(enemyBoard, ship, rowIndex, boxIndex)
        updateEnemy(newBoard, newShipsArray)
    }

    const shotPlayerBoard = () => {
        const randomRow = getRandomPosition()
        const randomBox = getRandomPosition()
        if (isBoardPositionShotable(board, randomRow, randomBox)) {
            const hittedShip = ships.findIndex(ship => isAnyShipAtPosition(ship, randomRow, randomBox))
            const {newShipsArray, ship} = updateHittedShip(ships, hittedShip)
            checkEndGame(newShipsArray, "Enemy")
            const newBoard = updateHittedBoard(board, ship, randomRow, randomBox)
            updatePlayer(newBoard,newShipsArray)
        } else shotPlayerBoard()
    }

    const checkEndGame = (array, currentPlayer) => {
        if (allShipsSinked(array))
            finishGame(currentPlayer)
    }

    return {
        onBoardClick
    }
}