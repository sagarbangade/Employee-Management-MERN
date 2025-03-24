// src/store/actions/authActions.js
import axios from 'axios';
import * as authService from '../../services/authService';

// Action Type Constants (Defined Directly in this file)
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';

export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';


export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const data = await authService.register(userData);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const data = await authService.login(userData);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    dispatch({ type: LOAD_USER_REQUEST });
    try {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch({ type: LOAD_USER_SUCCESS });
        } else {
            dispatch({ type: LOAD_USER_FAIL });
        }
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error });
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};

export const clearError = () => (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};