import * as actionTypes from '../index';

const initialState = {
    error: false,
    loading: false,
    contacts: [],
    contact: {},
    auth: localStorage.getItem("auth")
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

        case actionTypes.FETCH_SINGLE_CONTACT:
            return {
                ...state,
                contact: action.contact
            }

        case actionTypes.LOGOUT:
            localStorage.removeItem("auth")
            localStorage.removeItem("token")
            return {
                ...state,
                auth: localStorage.getItem("auth")
            }

        case actionTypes.LOGIN:
            localStorage.setItem("auth", "true")
            return {
                ...state,
                auth: localStorage.getItem("auth")
            }
        
        default:
            return state
    }
}

export default contactsReducer;