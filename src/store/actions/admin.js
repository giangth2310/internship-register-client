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