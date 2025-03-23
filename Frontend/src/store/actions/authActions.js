import * as authService from '../../services/authService';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_REQUEST' });
        await authService.register(userData);
        dispatch({ type: 'REGISTER_SUCCESS' }); // Or dispatch login directly after register if desired
    } catch (error) {
        dispatch({
            type: 'REGISTER_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        const data = await authService.login(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};


export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
};

export const clearError = () => (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
};