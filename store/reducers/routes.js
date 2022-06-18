import { ADD_TO_ROUTE, REMOVE_FROM_ROUTE } from '../actions/routes' 

const initialState = {
    routes:[],
}

const routesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_ROUTE: {
            const new_route = [...state.routes]
            new_route.push(action.spot_id)
            return { ...state, routes: new_route}
        } case REMOVE_FROM_ROUTE: {
            const new_route = [...state.routes]
            new_route.splice(state.routes.indexOf(action.spot_id), 1)
            return { ...state, routes: new_route}
        }
        default:
            return state
    }
}

export default routesReducer