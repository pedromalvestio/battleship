export const BOX_STATE = {
    EMPTY: "empty",
    HIT: "hit",
    MISS: "misses",
    SINK: "sinks",
    SHIP: "ship"
}

export const isBoxShip = (element) => element === BOX_STATE.SHIP;