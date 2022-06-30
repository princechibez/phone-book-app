import * as actionTypes from '../index';

const initialState = {
    error: false,
    loading: false,
    contacts: null
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONTACT_START:
            return {
                ...state,
                error: false,
                loading: true
            }

        case actionTypes.FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
            }

        case actionTypes.FETCH_CONTACT_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case actionTypes.SET_CONTACTS:
            return {
                ...state,
                error: false,
                contacts: action.contacts
            }
        
        default:
            return state
    }
}

export default contactsReducer;