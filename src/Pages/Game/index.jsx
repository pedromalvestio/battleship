import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EnemyBoard } from "../../Components/Game/EnemyBoard"
import { TurnHeader } from "../../Components/Game/TurnHeader"
import { PlayerBoard } from "../../Components/Game/PlayerBoard"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { GameContainer } from "./styles"
import { useGame } from "./UseGame"

const Game = () => {
    const navigate = useNavigate()
    const [playerTurn, setPlayerTurn] = useState(true)
    
    const { onBoardClick } = useGame(setPlayerTurn)
    const { playing, winnerName } = usePlayer()

    useEffect(() => {
        if (!playing && winnerName !== "") {
            navigate(`/game-result`)
        } else if (!playing) navigate(`/`)
    }, [playing, winnerName, navigate])
    
    return (
        <GameContainer>
            <TurnHeader isPlayerTurn={playerTurn} />
            {!playerTurn && <PlayerBoard />}
            {playerTurn && <EnemyBoard getBoardPostition={onBoardClick} />}
        </GameContainer> 
    )
}
 
export default Game;