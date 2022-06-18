export const ADD_TO_ROUTE = 'ADD_TO_ROUTE'
export const REMOVE_FROM_ROUTE = 'REMOVE_FROM_ROUTE'

export const addToRoute = (spot_id) => {
    return { type: ADD_TO_ROUTE, spot_id}
}

export const removeFromRoute = (spot_id) => {
    return { type: REMOVE_FROM_ROUTE, spot_id}
}