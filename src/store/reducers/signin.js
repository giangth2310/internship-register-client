import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    token: null,
    isTokenExpired: false,
    userType: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.data.token,
                userType: action.data.userType,
                error: null,
                loading: false,
            }
        case actionTypes.SIGN_IN_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                ...initialState
            }
        case actionTypes.TOKEN_EXPIRED:
            return {
                ...state,
                isTokenExpired: true
            }
        default:
            return state;
    }
}

export default reducer;