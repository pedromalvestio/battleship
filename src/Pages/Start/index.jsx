import { useNavigate } from "react-router-dom";
import Button from "Atoms/Button";
import { usePlayer } from "Context/Player/PlayerContext";
import { StartContainer, Title } from "./styles";

const Start = () => {
    const { newGame } = usePlayer()
    const navigate = useNavigate()

    const startGame = () => {
        newGame()
        navigate("/ship-selection")
    }
    return (
        <StartContainer>
            <Title>Battleship</Title>
            <Button text={"Start Game"} click={startGame}/>
        </StartContainer>
    )
}
 
export default Start;