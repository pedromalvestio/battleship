export const INVALID_SHIP_SIZE = 0

export const SHIPS = {
    BIG: {
        index: "BIG",
        name: "Big Ship",
        size: 5,
        quantity: 1
    },
    MEDIUM: {
        index: "MEDIUM",
        name: "Medium Ship",
        size: 4,
        quantity: 2
    }
}

export const shipQuantity = () => {
    const quantytReducer = (accumulator, currentValue) => accumulator.quantity + currentValue.quantity;
    return Object.values(SHIPS).reduce(quantytReducer)
}