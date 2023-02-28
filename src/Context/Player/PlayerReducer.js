import { emptyBoard } from "../../Constants/Board";

export const initialState = {
    board: emptyBoard,
    ships: [],
    enemyBoard: emptyBoard,
    enemyShips: [],
    winnerName: "",
    playing: false
}

export const actions = {
    NEW_GAME: "NEW_GAME",
    UPDATE_PLAYER: "UPDATE_PLAYER",
    UPDATE_ENEMY:"UPDATE_ENEMY",
    SET_ENEMY_SHIPS:"SET_ENEMY_SHIPS",
    FINISH_GAME:"FINISH_GAME",
}

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.NEW_GAME:
            return {
                ...state,
                board: emptyBoard,
                ships: [],
                enemyBoard: emptyBoard,
                enemyShips: [],
                winnerName: "",
                playing: true
            }
        case actions.SET_ENEMY_SHIPS: {
            return {
                ...state,
                enemyShips: payload.ships,
            }
        }
        case actions.UPDATE_ENEMY: {
            return {
                ...state,
                enemyBoard: payload.board,
                enemyShips: payload.ships
            }
        }
        case actions.UPDATE_PLAYER: {
            return {
                ...state,
                board: payload.board,
                ships: payload.ships
            }
        }
        case actions.FINISH_GAME: {
            return {
                ...state,
                winnerName: payload.winnerName,
                playing: false
            }
        }
        default:
            throw new Error(`No case for type ${type} found in PlayerReducer.`);
    }
}