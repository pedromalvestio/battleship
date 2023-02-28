import { createContext, useContext, useReducer } from "react";
import { SHIPS } from "../../Constants/Ships";
import { actions, initialState, reducer } from "./ShipSelectionReducer";

const ShipSelectionContext = createContext(initialState)

export const ShipSelectionProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateSelectedShip = (selectedShip) => {
        dispatch({
            type: actions.UPDATE_SELECTED_SHIP,
            payload: {
                selectedShip: selectedShip
            }
        })
    }

    const value = {
        selectedShip: state.selectedShip,
        shipSize: SHIPS[state.selectedShip].size,
        shipQuantity: SHIPS[state.selectedShip].quantity,
        updateSelectedShip,
    }

    return (
        <ShipSelectionContext.Provider value={value}>
            {children}
        </ShipSelectionContext.Provider>
    )
}

export const useShipSelectionContext = () => {
    const context = useContext(ShipSelectionContext)

    if (context === undefined) {
        throw new Error("useShipSelection must be used within ShipSelectionContext");
    }

    return context
}
