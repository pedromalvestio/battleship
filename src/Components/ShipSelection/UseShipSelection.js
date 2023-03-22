import { useNavigate } from "react-router-dom"
import { shipQuantity } from "../../Constants/Ships"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { useShipSelectionContext } from "../../Context/ShipSelection/ShipSelectionContext"
import { getRadomShips, removeShipFromRow } from "../../Helper/ShipHelper"

export const useShipSelection = () => {
    const { ships, board, setEnemyShips, updatePlayer } = usePlayer()
    const { shipSize } = useShipSelectionContext()
    const navigate = useNavigate()

    const startGame = () => {
        const randomShips = getRadomShips()
        setEnemyShips(randomShips)
        navigate("/game")
    }

    const SelectedShipCount = () => ships.filter(shipCountFilter).length
    const shipCountFilter = (ship) => ship.size === shipSize
    
    const anySelectShipPlaced = SelectedShipCount() > 0
    
    const isAllShipsPlaced = shipQuantity() === ships.length
    
    const removeSelectedShipsBySize = () => {
        let newBoard = [...board]
        ships.forEach(s => {
            if (s.size === shipSize) {
                newBoard = newBoard.map((row, index) =>
                    s.row !== index ? row : removeShipFromRow(s, row)
                )
            }
        })
        const newShips = ships.filter(s => s.size !== shipSize)
        updatePlayer(newBoard, newShips)
    }

    return {
        anySelectShipPlaced,
        isAllShipsPlaced,
        startGame,
        removeSelectedShipsBySize,
        SelectedShipCount
    }
}