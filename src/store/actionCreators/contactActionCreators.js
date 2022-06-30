import * as actionTypes from '../index';

export const fetchContactStart = () => {
    return {
        type: actionTypes.FETCH_CONTACT_START
    }
}

export const fetchContactSuccess = () => {
    return {
        type: actionTypes.FETCH_CONTACT_SUCCESS
    }
}

export const setContacts = (dataFromServer) => {
    return {
        type: actionTypes.SET_CONTACTS,
        contacts: dataFromServer
    }
}

export const fetchContactFail = (err) => {
    return {
        type: actionTypes.FETCH_CONTACT_FAIL,
        error: err
    }
}

export const fetchContacts = (axios) => {
    return dispatch => {
        dispatch(fetchContactStart());
        axios.get('/contactInfo.json')
         .then(response => {
             dispatch(setContacts(response.data));
            dispatch(fetchContactSuccess());
         })
         .catch(err => {
             dispatch(fetchContactFail(err))
         })
    }
}