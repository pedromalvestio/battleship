import { useEffect } from "react";
import { PlaceShips } from "../../Components/PlaceShips";
import { usePlayer } from "../../Context/Player/PlayerContext";
import { ShipSelectionContainer } from "./styles";

const ShipSelection = () => {
    const { startGame } = usePlayer()
    useEffect(() => {
        startGame()
    }, [])
    
    return (
        <ShipSelectionContainer>
            <h2>Place your Ships</h2>
            <PlaceShips />
        </ShipSelectionContainer>
    )
}
 
export default ShipSelection;