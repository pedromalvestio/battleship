import { useGameContext } from "Context/Game/GameContext"

export const TurnHeader = () => {

    const { turn } = useGameContext()

    const PlayerHeader = () => {
        return (
            <>
                <h2>Your turn</h2>
                Shot enemy board
            </>
        )
    }
    
    const EnemyHeader = () => {
        return (
            <>
                <h2>Enemy turn:</h2>
                Wait for enemy shot
            </>
        )
    }

    return (
        <>
            {turn ? <PlayerHeader /> : <EnemyHeader />}
        </>
    )
}