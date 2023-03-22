import { useEffect } from "react"
import Board from "Atoms/Board"
import { useGameContext } from "Context/Game/GameContext"
import { useGameBoard } from "../UseGameBoard"


export const PlayerBoard = () => {
    const { board, shotPlayerBoard, TURN_CHANGE_TIME } = useGameBoard()
    const { toggleTurn } = useGameContext()

    useEffect(() => {
        setTimeout(() => {
            shotPlayerBoard()
            setTimeout(() => {
                toggleTurn()
            },TURN_CHANGE_TIME)
        },TURN_CHANGE_TIME)
    }, [shotPlayerBoard, toggleTurn, TURN_CHANGE_TIME])
    
    return (
        <Board board={board} getRowPosition={() => { return }}/>
    )
}