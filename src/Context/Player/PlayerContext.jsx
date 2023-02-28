import { createContext, useContext, useReducer } from "react";
import { actions, initialState, reducer } from "./PlayerReducer";

const PlayerContext = createContext(initialState);

export const PlayerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const newGame = () => {
        dispatch({type: actions.NEW_GAME})
    }

    const setEnemyShips = (ships) => {
        dispatch({
            type: actions.SET_ENEMY_SHIPS,
            payload: {
                ships: ships
            }
        })
    }

    const updatePlayer = (boardArray, shipsArray) => {
        dispatch({
            type: actions.UPDATE_PLAYER,
            payload: {
                board: boardArray,
                ships: shipsArray
            }
        })
    }
   
    const updateEnemy = (boardArray, shipsArray) => {
        dispatch({
            type: actions.UPDATE_ENEMY,
            payload: {
                board: boardArray,
                ships: shipsArray
            }
        })
    }

    const finishGame = (currentPlayer) => {
        dispatch({
            type: actions.FINISH_GAME,
            payload: {
                winnerName: currentPlayer
            }
        })
    }

    const value = {
        board: state.board,
        ships: state.ships,
        enemyBoard: state.enemyBoard,
        enemyShips: state.enemyShips,
        winnerName: state.winnerName,
        playing: state.playing,
        newGame,
        updateEnemy,
        updatePlayer,
        setEnemyShips,
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