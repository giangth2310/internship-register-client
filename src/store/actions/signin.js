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
        // gửi request lên server lấy token
        Axios.post('/auth', authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.payload.expiresIn * 1000);
                localStorage.setItem('token', response.data.payload.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userType', response.data.payload.userType);
                dispatch(signinSuccess(response.data.payload.token, response.data.payload.userType));
                dispatch(checkTokenExpiration(response.data.payload.expiresIn));
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
    clearTimeout(autoSignout);
    return {
        type: actionTypes.SIGN_OUT
    }
}

export const tokenExpired = () => {
    return {
        type: actionTypes.TOKEN_EXPIRED
    }
}

// Tự đăng xuất nếu token hết hạn
let autoSignout;

export const checkTokenExpiration = (expirationTime) => {
    return dispatch => {
        autoSignout = setTimeout(() => {
            dispatch(tokenExpired());
        }, expirationTime * 1000);
    };
};

// Tự động đăng nhập nếu token chưa hết hạn 
export const tryAutoSignIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (token && userType && expirationDate) {
            if (expirationDate > new Date()) {
                dispatch(signinSuccess(token, userType));
                dispatch(checkTokenExpiration((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        } 
    }
}