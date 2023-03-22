import { useGameContext } from "Context/Game/GameContext"
import { PlayerBoard } from "./PlayerBoard"
import { EnemyBoard } from "./EnemyBoard"

export const GameBoard = () => {
    const { turn } = useGameContext()

    return (
        <>
            {turn ? <EnemyBoard /> : <PlayerBoard />}
        </>
    )
}