export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'
export const CHANGE_CITY_FILTER = 'CHANGE_CITY_FILTER'

export const addFilter = (filter_name) => {
    return { type: ADD_FILTER, filter: filter_name}
}

export const removeFilter = (filter_name) => {
    return { type: REMOVE_FILTER, filter: filter_name}
}

export const changeCityFilter = (city_name) => {
    return { type: CHANGE_CITY_FILTER, city: city_name}
}