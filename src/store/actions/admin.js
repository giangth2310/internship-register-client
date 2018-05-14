import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const loadAllInfoSuccess = (data, userType) => {
    return {
        type: actionTypes.LOAD_ALL_INFO_SUCCESS,
        data: {
            [userType]: data
        }
    }
}

export const loadAllInfoFail = (error) => {
    return {
        type: actionTypes.LOAD_ALL_INFO_FAIL,
        error: error
    }
}

// Lấy toàn bộ thông tin của toàn bộ tài khoản có kiểu là userType
export const loadAllInfo = (userType) => {
    return dispatch => {
        Axios.get('/admin/info/' + userType)
            .then(response => {
                dispatch(loadAllInfoSuccess(response.data, userType));
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                dispatch(loadAllInfoFail(error));
            })
    }
}

export const adminKnowError = () => {
    return {
        type: actionTypes.ADMIN_KNOW_ERROR
    }
}

export const adminOpenEditProfile = (user) => {
    return {
        type: actionTypes.ADMIN_OPEN_EDIT_PROFILE,
        data: user
    }
}

export const adminUpdateProfile = (profile) => {
    return dispatch => {
        Axios.put('/user/profile/update/' + profile.id, profile)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    dispatch(adminUpdateProfileSuccess())
                } else {
                    dispatch(adminUpdateProfileError(response.data.error));
                }
            })
            .catch(error => {
                dispatch(adminUpdateProfileError(error));
            })
    }
}

export const adminUpdateProfileSuccess = () => {
    return {
        type: actionTypes.ADMIN_UPDATE_PROFILE_SUCCESS
    }
}

export const adminUpdateProfileError = (error) => {
    return {
        type: actionTypes.ADMIN_UPDATE_PROFILE_ERROR,
        error: error
    }
}

export const adminKnowSuccess = () => {
    return {
        type: actionTypes.ADMIN_KNOW_SUCCESS
    }
}

export const deleteUserSuccess = (type, index) => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
        data: {
            type: type,
            index: index
        }
    }
}

export const deleteUser = (user) => {
    return dispatch => {
        Axios.delete('/user/profile/delete/' + user.id)
            .then(response => {
                dispatch(deleteUserSuccess(user.userType, user.index));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const createUser = (user) => {
    return dispatch => {
        Axios.post('/admin/createUser', user)
            .then(response => {
                console.log(response);
                dispatch(createUserSuccess(response.data.id, response.data.type));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const createUserSuccess = (id, type) => {
    return dispatch => {
        dispatch(adminOpenEditProfile({id: id}));
        dispatch(changeRedirectPath('/dashboard/edit/' + type + '/' + id));
    }
}

export const changeRedirectPath = (path) => {
    return {
        type: actionTypes.CHANGE_ADMIN_REDIRECT_PATH,
        data: path
    }
}