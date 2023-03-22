import { useNavigate } from "react-router-dom";
import Button from "Atoms/Button";
import { usePlayer } from "Context/Player/PlayerContext";

const GameResult = () => {
    const { winnerName } = usePlayer()
    const navigate = useNavigate()
    
    return (
        <>
            <h1>Congratulations!</h1>
            <h1>{winnerName} won!</h1>
            <Button text={"Restart Game"} click={() => navigate("/boat-selection")}/>
        </> 
     );
}
 
export default GameResult;