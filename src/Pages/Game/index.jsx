import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TurnHeader } from "../../Components/Game/TurnHeader"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { GameProvider } from "../../Context/Game/GameContext"
import { GameBoard } from "../../Components/Game/GameBoard"

const Game = () => {
    const navigate = useNavigate()
    
    
    const { playing, winnerName } = usePlayer()

    useEffect(() => {
        if (!playing && winnerName !== "") {
            navigate(`/game-result`)
        } else if (!playing) navigate(`/`)
    }, [playing, winnerName, navigate])
    
    return (
        <GameProvider>
            <TurnHeader />
            <GameBoard />
        </GameProvider>
    )
}
 
export default Game;