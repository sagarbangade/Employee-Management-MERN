import * as employeeService from '../../services/employeeService';

export const getEmployees = (page = 1, limit = 10, search = '') => async (dispatch) => {
    try {
        dispatch({ type: 'EMPLOYEES_REQUEST' });
        const data = await employeeService.getAllEmployees(page, limit, search);
        dispatch({ type: 'GET_EMPLOYEES_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'GET_EMPLOYEES_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const getEmployeeDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'EMPLOYEE_DETAILS_REQUEST' });
        const data = await employeeService.getEmployeeById(id);
        dispatch({ type: 'GET_EMPLOYEE_DETAILS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'EMPLOYEE_DETAILS_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const createEmployee = (employeeData) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_EMPLOYEE_REQUEST' });
        await employeeService.createEmployee(employeeData);
        dispatch({ type: 'CREATE_EMPLOYEE_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'CREATE_EMPLOYEE_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const updateEmployee = (id, employeeData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_EMPLOYEE_REQUEST' });
        await employeeService.updateEmployee(id, employeeData);
        dispatch({ type: 'UPDATE_EMPLOYEE_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'UPDATE_EMPLOYEE_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const deleteEmployee = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_EMPLOYEE_REQUEST' });
        await employeeService.deleteEmployee(id);
        dispatch({ type: 'DELETE_EMPLOYEE_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'DELETE_EMPLOYEE_FAIL',
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};

export const clearError = () => (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
};