const initialState = {
  employees: [],
  employee: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalEmployees: 0,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'EMPLOYEES_REQUEST':
      case 'EMPLOYEE_DETAILS_REQUEST':
      case 'CREATE_EMPLOYEE_REQUEST':
      case 'UPDATE_EMPLOYEE_REQUEST':
      case 'DELETE_EMPLOYEE_REQUEST':
          return { ...state, loading: true, error: null };
      case 'GET_EMPLOYEES_SUCCESS':
          return {
              ...state,
              loading: false,
              employees: action.payload.employees,
              totalPages: action.payload.totalPages,
              currentPage: action.payload.currentPage,
              totalEmployees: action.payload.totalEmployees,
              error: null,
          };
      case 'GET_EMPLOYEE_DETAILS_SUCCESS':
          return {
              ...state,
              loading: false,
              employee: action.payload.employee,
              error: null,
          };
      case 'CREATE_EMPLOYEE_SUCCESS':
      case 'UPDATE_EMPLOYEE_SUCCESS':
      case 'DELETE_EMPLOYEE_SUCCESS':
          return {
              ...state,
              loading: false,
              error: null,
          };
      case 'GET_EMPLOYEES_FAIL':
      case 'EMPLOYEE_DETAILS_FAIL':
      case 'CREATE_EMPLOYEE_FAIL':
      case 'UPDATE_EMPLOYEE_FAIL':
      case 'DELETE_EMPLOYEE_FAIL':
          return {
              ...state,
              loading: false,
              error: action.payload,
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