import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const createEmployInfo = (post) => {
    return dispatch => {
        Axios.post('/employInfo/create', post)
            .then(response => {
                if (response.data.success) {
                    dispatch(createEmployInfoSuccess());
                } else {
                    dispatch(createEmployInfoFail(response.data.error));
                }
            })
            .catch(error => {
                dispatch(createEmployInfoFail(error));                
            })
    }
}

export const createEmployInfoFail = (error) => {
    return {
        type: actionTypes.CREATE_EMPLOY_INFO_FAIL,
        error: error
    }
}

export const createEmployInfoSuccess = () => {
    return {
        type: actionTypes.CREATE_EMPLOY_INFO_SUCCESS
    }
}

export const partnerCloseDialog = () => {
    return {
        type: actionTypes.PARTNER_CLOSE_DIALOG
    }
}