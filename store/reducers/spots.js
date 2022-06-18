import { spots } from '../../mocks/Spots' 
import { ADD_FILTER, REMOVE_FILTER, CHANGE_CITY_FILTER } from '../actions/spots' 

const initialState = {
    spots,
    filteredSpots: spots,
    filters: new Set([
        'Flatground',
        'Stairs',
        'Handrails',
        'Ramps',
        'Hills',
        'Bowls'
    ]),
    cityFilter: ''
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTER: {
            const new_filters = new Set([...state.filters])
            new_filters.add(action.filter)
            const filtered_spots = refilterSpots(state.spots, new_filters)
            return { ...state, filteredSpots: filtered_spots, filters: new_filters}
        } case REMOVE_FILTER: {
            const new_filters = new Set([...state.filters])
            new_filters.delete(action.filter)
            const filtered_spots = refilterSpots(state.spots, new_filters)
            return { ...state, filteredSpots: filtered_spots, filters: new_filters}
        } case CHANGE_CITY_FILTER: {
            const city = action.city
            return { ...state, cityFilter: city}
        }
        default:
            return state
    }
}

const refilterSpots = (all_spots, new_filters) => {
    return all_spots.filter((item) => {
        for (let filter of new_filters) {
            if (item.tags.includes(filter)) return true
        }
        return false
    })
}

export default spotsReducer