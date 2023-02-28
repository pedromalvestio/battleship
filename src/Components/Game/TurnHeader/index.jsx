export const TurnHeader = ({isPlayerTurn}) => {

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
            {isPlayerTurn && <PlayerHeader />}
            {!isPlayerTurn && <EnemyHeader />}
        </>
    )
}