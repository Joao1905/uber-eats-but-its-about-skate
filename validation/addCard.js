import Values from '../constants/Values'
const ALPHANUM_WITH_EXCEPTIONS = /^[a-zA-Z0-9À-ú\s-.,]+$/

const imageChangeValidator = (input, dispatchFunction, actionType) => {
    let is_valid = true
    let error_message = false

    const is_array = input instanceof Array
    if (!is_array) {
        is_valid = false
        error_message = 'Image input is not an array'
    }
    const has_6_items = input.length === 6
    if (!has_6_items) {
        is_valid = false
        error_message = "Image input array doesn't have 6 elements"
    }

    dispatchFunction({
        type: actionType,
        value: input,
        isValid: is_valid,
        inputName: 'images',
        errorMessage: error_message
    })
}

const titleChangeValidator = (input, dispatchFunction, actionType) => {
    let is_valid = true
    let error_message = false

    if (!input) {
        is_valid = false
        error_message = 'Title is empty'
        dispatchFunction({
            type: actionType,
            value: input,
            isValid: is_valid,
            inputName: 'location',
            errorMessage: error_message
        })
        return
    }

    if (input.length === 0) {
        is_valid = false
        error_message = 'Title is empty'
    }

    const is_string = input instanceof String || typeof input === 'string'
    if (!is_string) {
        is_valid = false
        error_message = 'Title is not a string'
    }
        
    const max_36_characters = input.length <= 36
    if (!max_36_characters) {
        is_valid = false
        error_message = 'Title has more than 36 characters'
    }

    const is_alphanum = ALPHANUM_WITH_EXCEPTIONS.test(input)
    if (!is_alphanum) {
        is_valid = false
        error_message = 'Title has invalid characters'
    }

    dispatchFunction({
        type: actionType,
        value: input,
        isValid: is_valid,
        inputName: 'title',
        errorMessage: error_message
    })
}

const tagsChangeValidator = (input, dispatchFunction, actionType) => {
    let is_valid = true
    let error_message = false

    const has_correct_item_count = Object.keys(input).length === Values.TAGS.length
    if (!has_correct_item_count) {
        is_valid = false
        error_message = 'Number of tags passed is not equal to number of existing tags'
    }

    dispatchFunction({
        type: actionType,
        value: input,
        isValid: is_valid,
        inputName: 'tags',
        errorMessage: error_message
    })
}

const locationChangeValidator = (input, dispatchFunction, actionType) => {
    let is_valid = true
    let error_message = false

    if (!input) {
        is_valid = false
        error_message = 'Object passed is empty'
        dispatchFunction({
            type: actionType,
            value: input,
            isValid: is_valid,
            inputName: 'location',
            errorMessage: error_message
        })
        return
    }

    if (Object.keys(input).length === 0) {
        is_valid = false
        error_message = 'Object passed is empty'
    }

    const has_correct_item_count = Object.keys(input).length === Values.LOCATION_KEYS.length
    if (!has_correct_item_count) {
        is_valid = false
        error_message = 'Number of coordinates passed is not equal to number of existing coordinates'
    }

    dispatchFunction({
        type: actionType,
        value: input,
        isValid: is_valid,
        inputName: 'location',
        errorMessage: error_message
    })
}

export {
    imageChangeValidator,
    titleChangeValidator,
    tagsChangeValidator,
    locationChangeValidator,
}