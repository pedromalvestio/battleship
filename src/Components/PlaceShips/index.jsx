import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Board from "../../Atoms/Board"
import Button from "../../Atoms/Button"
import SelectShips from "./SelectShip"
import { SHIPS } from "../../Constants/Ships"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { canPlaceShipAtRow } from "../../Helper/ArrayHelper"
import { allShipsPlaced } from "../../Helper/ShipHelper"
import { ShipsContainer, ShipsCount, PlaceShipsContainer } from "./styles"

export const PlaceShips = () => {
    const { 
        board, 
        ships, 
        addShip, 
        clearShip, 
        setEnemyRandomShips 
    } = usePlayer()
    
    const [selectedShipsIndex, setSelectedShipsIndex] = useState(SHIPS.BIG.index)
    const navigate = useNavigate()

    const selectedShipCount = (boat) => boat.size === SHIPS[selectedShipsIndex].size
    const ShipCount = () => ships.filter(selectedShipCount).length
    
    const placeShip = (rowIndex, boxIndex) => {
        const { size, quantity } = SHIPS[selectedShipsIndex]
        const boatPosition = boxIndex+size;
        if (canPlaceShipAtRow(board[rowIndex], boxIndex, boatPosition) && quantity > ShipCount()) {
            addShip({
                row: rowIndex,
                box: boxIndex,
                size: SHIPS[selectedShipsIndex].size
            })
        }
    }

    const clearBoats = () => {
        clearShip(SHIPS[selectedShipsIndex])
    }

    const startGame = () => {
        setEnemyRandomShips()
        navigate("/game")
    }

    return (
        <PlaceShipsContainer>
            <ShipsContainer>
                <SelectShips 
                    index={selectedShipsIndex}
                    options={SHIPS}
                    onChange={setSelectedShipsIndex}
                />
                <ShipsCount>
                   {ShipCount()}/{SHIPS[selectedShipsIndex].quantity}
                </ShipsCount>
                {ShipCount() > 0 && <Button text={"Clear"} click={() => clearBoats()} />}
                {allShipsPlaced(ships) && <Button text={"Done"} click={() => startGame()} />}
            </ShipsContainer>
            <Board
                board={board}
                getRowPosition={placeShip}
            />
        </PlaceShipsContainer>
    )
}