import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const signinStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    }
}

export const signinSuccess = (token, userType) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        data: {
            token: token,
            userType: userType
        }
    }
}

export const signinFail = (error) => {
    return {
        type: actionTypes.SIGN_IN_FAIL,
        error: error
    }
}

export const signin = (username, password) => {
    return dispatch => {
        dispatch(signinStart());
        const authData = {
            username: username,
            password: password
        }
        Axios.post('/auth', authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.payload.expiresIn * 1000);
                localStorage.setItem('token', response.data.payload.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userType', response.data.payload.userType);
                dispatch(signinSuccess(response.data.payload.token, response.data.payload.userType));
            })
            .catch(error => {
                console.log(error);
                dispatch(signinFail(error));
            });
    }
}

export const signout = () => {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    return {
        type: actionTypes.SIGN_OUT
    }
}