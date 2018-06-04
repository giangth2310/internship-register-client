import * as actionTypes from '../actions/actionTypes';

const initialState = {
    createEmployInfoSuccess: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                ...initialState
            }
        case actionTypes.CREATE_EMPLOY_INFO_SUCCESS:
            return {
                ...state,
                createEmployInfoSuccess: true
            }
        case actionTypes.CREATE_EMPLOY_INFO_FAIL:
            return {
                ...state,
                error: action.error,
                createEmployInfoSuccess: false
            }
        case actionTypes.PARTNER_CLOSE_DIALOG:
            return {
                ...state,
                error: null,
                createEmployInfoSuccess: false
            }
        default:
            return state;
    }
}

export default reducer;