// src/store/reducers/authReducer.js
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  CLEAR_ERROR,
} from "../actions/types"; // Adjust path to your types.js file if needed, or remove import if defining action types directly in authActions.js

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true, // Initially set loading to true
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS: // Modified REGISTER_SUCCESS case
      // localStorage.setItem('token', action.payload.token);  <-- Removed localStorage.setItem for registration
      return {
        ...state,
        loading: false,
        // isAuthenticated: true,  <-- Removed isAuthenticated update for registration
        // token: action.payload.token,  <-- Removed token update for registration
        error: null,
      };

    case LOGIN_SUCCESS: // LOGIN_SUCCESS case remains the same
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        error: null,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      };

    case LOAD_USER_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
