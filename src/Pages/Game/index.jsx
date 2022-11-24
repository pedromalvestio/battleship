import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EnemyBoard } from "../../Components/EnemyBoard"
import { PlayerBoard } from "../../Components/PlayerBoard"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { allShipsSinked } from "../../Helper/ShipHelper"
import { GameContainer } from "./styles"

const Game = () => {
    const { ships, enemyShips, enemyShot, playerShot, finishGame } = usePlayer()
    const navigate = useNavigate()

    const [playerTurn, setPlayerTurn] = useState(true)
    const turnEnding = useRef(false)

    const checkWonCondition = () => { 
        if ((allShipsSinked(ships)) || (allShipsSinked(enemyShips))) {
            finishGame()
            navigate("/game-result")
        }
    }

    const toogleTurn = () => {
        setPlayerTurn(turn => !turn)
    }
     
    const changeTurn = () => {
        toogleTurn()
        checkWonCondition()
        setTimeout(
            () => {
                enemyShot()
                setTimeout(
                    () => {
                        toogleTurn()
                        checkWonCondition()
                        turnEnding.current = false
                },2000)
        },1000)
    }

    const getBoardPostition = (rowIndex, boxIndex) => {
        if (turnEnding.current) return
        playerShot(rowIndex, boxIndex)
        turnEnding.current = true
        setTimeout(() => changeTurn(),2000)
    }
    
    return (
        <GameContainer>
            {!playerTurn && <PlayerBoard getBoardPostition={getBoardPostition}/>}
            {playerTurn && <EnemyBoard getBoardPostition={getBoardPostition} />}
        </GameContainer>  
    )
}
 
export default Game;