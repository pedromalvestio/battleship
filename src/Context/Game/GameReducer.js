export const initialState = {
    winnerName: "",
    playing: false,
    turn: true
}

export const actions = {
    START_GAME: "START_GAME",
    FINISH_GAME:"FINISH_GAME",
    TOGGLE_TURN: "TOGGLE_TURN",
}

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.START_GAME:
            return {
                ...state,
                winnerName: "",
                playing: true
            }
        case actions.FINISH_GAME: {
            return {
                ...state,
                winnerName: payload.winnerName,
                playing: false
            }
        }
        case actions.TOGGLE_TURN: {
            return {
                ...state,
                turn: payload.turn,
            }
        }
        default:
            throw new Error(`No case for type ${type} found in GameReducer.`);
    }
}