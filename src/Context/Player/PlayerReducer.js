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
    START_GAME: "START_GAME",
    UPDATE_BOARD: "UPDATE_BOARD",
    ADD_SHIP: "ADD_SHIP",
    UPDATE_SHIPS: "UPDATE_SHIPS",
    PLAYER_SHOT: "PLAYER_SHOT",
    ADD_ENEMY_SHIP:"ADD_ENEMY_SHIP",
    ENEMY_SHOT:"ENEMY_SHOT",
    FINISH_GAME:"FINISH_GAME",
}

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.START_GAME:
            return {
                ...state,
                board: emptyBoard,
                ships: [],
                enemyBoard: emptyBoard,
                enemyShips: [],
                winnerName: "",
                playing: true
            }
        case actions.UPDATE_BOARD:
            return {
                ...state,
                board: payload.board
            }
        case actions.ADD_SHIP: {
            return {
                ...state,
                board: payload.board,
                ships: [
                    ...state.ships,
                    {...payload.ship, hits: 0}
                ]
            }
        }
        case actions.ADD_ENEMY_SHIP: {
            return {
                ...state,
                enemyShips: payload.ships,
            }
        }
        case actions.ENEMY_SHOT: {
            return {
                ...state,
                enemyBoard: payload.board,
                enemyShips: payload.ships
            }
        }
        case actions.PLAYER_SHOT: {
            return {
                ...state,
                board: payload.board,
                ships: payload.ships
            }
        }
        case actions.UPDATE_SHIPS: {
            return {
                ...state,
                ships: payload.ships
            }
        }
        case actions.FINISH_GAME: {
            return {
                ...state,
                playing: false
            }
        }
        default:
            throw new Error(`No case for type ${type} found in PlayerReducer.`);
    }
}