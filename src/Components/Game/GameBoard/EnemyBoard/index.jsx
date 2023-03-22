import { useRef } from "react"
import Board from "Atoms/Board"
import { BOX_STATE } from "Constants/Box"
import { useGameBoard } from "../UseGameBoard"
import { useGameContext } from "Context/Game/GameContext"

export const EnemyBoard = () => {
    const { enemyBoard, shotEnemyBoard, TURN_CHANGE_TIME } = useGameBoard()
    const { toggleTurn } = useGameContext()

    const turnEnding = useRef(false)

    function onBoardClick(rowIndex, boxIndex){
        if (enemyBoard[rowIndex][boxIndex] === BOX_STATE.EMPTY && !turnEnding.current) {
            turnEnding.current = true
            shotEnemyBoard(rowIndex, boxIndex)
            setTimeout(() => toggleTurn(), TURN_CHANGE_TIME)
        }
    }

    return (
        <Board board={enemyBoard} getRowPosition={onBoardClick} />
    )
}