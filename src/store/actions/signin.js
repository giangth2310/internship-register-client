import * as actionTypes from './actionTypes';
import Axios from 'axios';

import { parseJwt } from '../../shared/utility';

export const signinStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    }
}

export const signinSuccess = (data, error) => {
    Axios.defaults.headers.common['Authorization'] = data.token;    
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        data: data
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
                if (!response.data.error) {
                    const payload = parseJwt(response.data.token);
                    const expirationDate = new Date(new Date().getTime() + payload.expiresIn * 1000);
                    const data = {
                        token: response.data.token,
                        expirationDate: expirationDate,
                        userType: payload.userType,
                        id: payload.id
                    }
                    for (let key in data) {
                        localStorage.setItem(key, data[key]);
                    }
                    dispatch(signinSuccess(data, response.data.error));
                    dispatch(checkTokenExpiration(payload.expiresIn));
                } else {
                    console.log(response.data.error);
                    dispatch(signinFail(response.data.error));
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(signinFail(error));
            });
    }
}

export const signout = () => {
    delete Axios.defaults.headers.common['Authorization'];    
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('id');
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
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (token && expirationDate) {
            if (expirationDate > new Date()) {
                const data = {
                    token: token,
                    userType: localStorage.getItem('userType'),
                    id: localStorage.getItem('id')
                }
                dispatch(signinSuccess(data));
                dispatch(checkTokenExpiration((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        } 
    }
}

export const loadAvatar = () => {
    return dispatch => {
        Axios.get('/user/profile/avatar?id=' + localStorage.getItem('id'))
            .then(response => {
                dispatch(loadAvatarSuccess(response.data.avatar, response.data.name));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const loadAvatarSuccess = (path, displayName) => {
    return {
        type: actionTypes.LOAD_AVATAR_SUCCESS,
        data: {
            path: path,
            displayName: displayName
        }
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path
    }
}