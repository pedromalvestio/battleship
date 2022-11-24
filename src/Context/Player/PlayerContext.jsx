import { createContext, useContext, useReducer } from "react";
import { getRandomPosition } from "../../Constants/Board";
import { SHIPS } from "../../Constants/Ships";
import { isBoardPositionShotable, updateHittedBoard } from "../../Helper/BoardHelper";
import { addShipOnRow, removeShipFromRow, isAnyShipAtPosition, placeRandomShip, allShipsSinked } from "../../Helper/ShipHelper";
import { actions, initialState, reducer } from "./PlayerReducer";

const PlayerContext = createContext(initialState);

export const PlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const startGame = () => {
        dispatch({type: actions.START_GAME})
    }
    const updateBoard = (board) => {        
        dispatch({
            type: actions.UPDATE_BOARD,
            payload: {
                board: board
            }
        })
    }

    const updateShips = (ships) => {
        dispatch({
            type: actions.UPDATE_SHIPS,
            payload: {
                ships: ships
            }
        })
    }
    
    const addShip = (ship) => {
        const newBoard = value.board.map((row, index) => 
            ship.row !== index ? row : addShipOnRow(ship, row)
        )
        dispatch({
            type: actions.ADD_SHIP,
            payload: {
                ship: ship,
                board: newBoard
            }
        })
    }

    const setEnemyRandomShips = () => {
        let randonShips = []
        Object.values(SHIPS).forEach(
            ship => {
                for (let quantity = 0; quantity < ship.quantity; quantity++) {
                    randonShips.push(placeRandomShip(randonShips, ship.size))
                }
            }
        )
        dispatch({
            type: actions.ADD_ENEMY_SHIP,
            payload: {
                ships: randonShips
            }
        })
    }

    const clearShip = (ship) => {
        let newBoard = [...value.board]
        value.ships.forEach(s => {
            if (s.size === ship.size) {
                newBoard = newBoard.map((row, index) =>
                    s.row !== index ? row : removeShipFromRow(s, row)
                )
            }
        })
        updateBoard(newBoard)
        const newShips = value.ships.filter(s => s.size !== ship.size)
        updateShips(newShips)
    }

    const enemyShot = () => {
        const randomRow = getRandomPosition()
        const randomBox = getRandomPosition()
        console.log("Random Shot", randomRow, randomBox)
        if (isBoardPositionShotable(value.board, randomRow, randomBox)) {
            const hittedShip = value.ships.findIndex(ship => isAnyShipAtPosition(ship, randomRow, randomBox))
            const newShipsArray = value.ships.map(
                (ship,index) => index !== hittedShip ? ship : {...ship, hits: ship.hits+1}
            )
            const ship = hittedShip >= 0 ? newShipsArray[hittedShip] : {hits: 1, size: 0}
            const newBoard = updateHittedBoard(value.board, ship, randomRow, randomBox)
            dispatch({
                type: actions.PLAYER_SHOT,
                payload: {
                    ships: newShipsArray,
                    board: newBoard
                }
            })
        } else enemyShot()
    }
    
    const playerShot = (rowIndex, boxIndex) => {
        const hittedShip = value.enemyShips.findIndex(ship => isAnyShipAtPosition(ship, rowIndex, boxIndex))
        const newShipsArray = value.enemyShips.map(
            (ship,index) => index !== hittedShip ? ship : {...ship, hits: ship.hits+1}
        )
        const ship = hittedShip >= 0 ? newShipsArray[hittedShip] : {hits: 1, size: 0}
        const newBoard = updateHittedBoard(value.enemyBoard, ship, rowIndex, boxIndex)
        dispatch({
            type: actions.ENEMY_SHOT,
            payload: {
                ships: newShipsArray,
                board: newBoard
            }
        })
    }

    const finishGame = () => {
        const winner = allShipsSinked(value.enemyShips) ? "Player" 
            : allShipsSinked(value.ships) ? "Enemy" : ""
        dispatch({
            type: actions.FINISH_GAME,
            payload: {
                winner: winner
            }
        })
    }

    const value = {
        board: state.board,
        ships: state.ships,
        enemyBoard: state.enemyBoard,
        enemyShips: state.enemyShips,
        winnerName: state.winnerName,
        startGame,
        addShip,
        clearShip,
        playerShot,
        enemyShot,
        setEnemyRandomShips,
        finishGame
    }

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    const context = useContext(PlayerContext)

    if (context === undefined) {
        throw new Error("usePlayer must be used within PlayerContext");
    }

    return context
}