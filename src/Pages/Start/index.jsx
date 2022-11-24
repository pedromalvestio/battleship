import { useNavigate } from "react-router-dom";
import Button from "../../Atoms/Button";
import { StartContainer, Title } from "./styles";

const Start = () => {
    const navigate = useNavigate()
    return (
        <StartContainer>
            <Title>Battleship</Title>
            <Button text={"Start Game"} click={() => navigate("/boat-selection")}/>
        </StartContainer>
    )
}
 
export default Start;