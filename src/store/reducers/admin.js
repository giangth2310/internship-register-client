import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    admin: null,
    student: null,
    lecturer: null,
    partner: null,
    editingProfile: null,
    updateProfileError: null,
    updateProfileSuccess: false,
    redirectPath: ''
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
                error: null,
                updateProfileError: null
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                ...initialState
            }
        case actionTypes.ADMIN_OPEN_EDIT_PROFILE:
            return {
                ...state,
                editingProfile: action.data,
                updateProfileError: null,
                updateProfileSuccess: false
            }
        case actionTypes.ADMIN_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateProfileError: null,
                updateProfileSuccess: true
            }
        case actionTypes.ADMIN_UPDATE_PROFILE_ERROR:
            return {
                ...state,
                updateProfileError: action.error,
                updateProfileSuccess: false
            }
        case actionTypes.ADMIN_KNOW_SUCCESS:
            return {
                ...state,
                updateProfileSuccess: false
            }
        case actionTypes.DELETE_USER_SUCCESS:
            const { index, type } = action.data;
            const newArray = [...state[type]];
            newArray.splice(index, 1)
            return {
                ...state,
                [type]: newArray
            }
        case actionTypes.CHANGE_ADMIN_REDIRECT_PATH:
            return {
                ...state,
                redirectPath: action.data
            }
        default:
            return state;
    }
}

export default reducer;