import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    admin: null,
    student: null,
    lecturer: null,
    partner: null,
    editingProfile: null,
    updateProfileError: null,
    updateProfileSuccess: false
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
        default:
            return state;
    }
}

export default reducer;