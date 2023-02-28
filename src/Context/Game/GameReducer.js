export const initialState = {
    winnerName: "",
    playing: false
}

export const actions = {
    START_GAME: "START_GAME",
    FINISH_GAME:"FINISH_GAME",
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
        default:
            throw new Error(`No case for type ${type} found in PlayerReducer.`);
    }
}