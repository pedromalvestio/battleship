import { createContext, useContext, useReducer } from "react";
import { allShipsSinked } from "../../Helper/ShipHelper";
import { actions, initialState, reducer } from "./GameReducer";

const GameContext = createContext(initialState)

export const GameProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const startGame = () => {
        dispatch({type: actions.START_GAME})
    }

    const finishGame = (boatsArray, currentPlayer) => {
        if (allShipsSinked(boatsArray))
            dispatch({
                type: actions.FINISH_GAME,
                payload: {
                    winnerName: currentPlayer
                }
            })
    }

    const toggleTurn = () => {
        dispatch({
            type: actions.TOGGLE_TURN,
            payload: {
                turn: !state.turn
            }
        })
    }

    const value = {
        winnerName: state.winnerName,
        playing: state.playing,
        turn: state.turn,
        startGame,
        finishGame,
        toggleTurn
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => {
    const context = useContext(GameContext)

    if (context === undefined) {
        throw new Error("usePlayer must be used within GameContext");
    }

    return context
}

