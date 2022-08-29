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

export const setContact = (dataFromServer) => {
    return {
        type: actionTypes.FETCH_SINGLE_CONTACT,
        contact: dataFromServer
    }
}

export const fetchContactFail = (err) => {
    return {
        type: actionTypes.FETCH_CONTACT_FAIL,
        error: err
    }
}

export const logout = (err) => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const loginHandler = (err) => {
    return {
        type: actionTypes.LOGIN
    }
}

export const fetchContacts = (axios) => {
    return dispatch => {
        dispatch(fetchContactStart());
        axios.get('https://phonebook-node-api.herokuapp.com/users/getallcontacts', {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          })
         .then(response => {
            dispatch(setContacts(response.data.contacts));
            dispatch(fetchContactSuccess());
         })
         .catch(err => {
            dispatch(fetchContactFail(err))
         })
    }
}

export const fetchContact = (axios, contactId) => {
    return dispatch => {
        axios.get(`https://phonebook-node-api.herokuapp.com/users/getsinglecontact/${contactId}`, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          })
         .then(response => {
            dispatch(setContact(response.data.contact));
         })
         .catch(err => {
            console.log(err)
         })
    }
}

export const autoLogout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, (300000 * 6));
    }
}