import { createStore, applyMiddleware, combineReducers } from 'redux';
// Import thunk as a named export, not default
import { thunk } from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { employeeReducer } from './reducers/employeeReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Now use the named import 'thunk'

export default store;