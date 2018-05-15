import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    token: null,
    isTokenExpired: false,
    userType: null,
    error: null,
    id: null,
    avatar: null,
    displayName: null
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
                id: action.data.id,
                error: null,
                loading: false,
                isTokenExpired: false
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
        case actionTypes.LOAD_AVATAR_SUCCESS:
            return {
                ...state,
                avatar: action.data.path,
                displayName: action.data.displayName
            }
        default:
            return state;
    }
}

export default reducer;