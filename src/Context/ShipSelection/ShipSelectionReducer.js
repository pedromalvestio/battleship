import { SHIPS } from "../../Constants/Ships";

export const initialState = {
    selectedShip: SHIPS.BIG.index,
}

export const actions = {
    UPDATE_SELECTED_SHIP: "UPDATE_SELECTED_SHIP",
}

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.UPDATE_SELECTED_SHIP:
            return {
                ...state,
                selectedShip: payload.selectedShip,
            }
        default:
            throw new Error(`No case for type ${type} found in ShipSelectionReducer.`);
    }
}