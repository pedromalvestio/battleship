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

    const value = {
        winnerName: state.winnerName,
        playing: state.playing,
        startGame,
        finishGame
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => {
    const context = useContext(GameContext)

    if (context === undefined) {
        throw new Error("usePlayer must be used within GameContext");
    }

    return context
}

