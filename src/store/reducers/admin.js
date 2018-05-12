import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    admin: null,
    student: null,
    lecturer: null,
    partner: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ALL_INFO_SUCCESS:
            return {
                ...state,
                ...action.data
            }
        case actionTypes.LOAD_ALL_INFO_FAIL: 
            return {
                ...state,
                error: action.error
            }
        case actionTypes.ADMIN_KNOW_ERROR:
            return {
                ...state,
                error: null
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}

export default reducer;