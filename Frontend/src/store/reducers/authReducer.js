const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'REGISTER_REQUEST':
      case 'LOGIN_REQUEST':
      case 'LOAD_USER_REQUEST':
          return { ...state, loading: true, error: null };
      case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
          localStorage.setItem('token', action.payload.token);
          return {
              ...state,
              loading: false,
              isAuthenticated: true,
              token: action.payload.token,
              error: null,
          };
      case 'LOAD_USER_SUCCESS':
          return {
              ...state,
              loading: false,
              isAuthenticated: true,
              user: action.payload.user, // if you have a user object in the backend
              error: null,
          };
      case 'REGISTER_FAIL':
      case 'LOGIN_FAIL':
      case 'LOAD_USER_FAIL':
      case 'LOGOUT':
          localStorage.removeItem('token');
          return {
              ...state,
              token: null,
              isAuthenticated: false,
              loading: false,
              user: null,
              error: action.payload, // error message from backend
          };
      case 'CLEAR_ERROR':
          return {
              ...state,
              error: null,
          };
      default:
          return state;
  }
};