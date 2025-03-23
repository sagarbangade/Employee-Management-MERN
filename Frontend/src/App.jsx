import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EmployeeList from './components/employees/EmployeeList';
import AddEmployee from './components/employees/AddEmployee';
import EditEmployee from './components/employees/EditEmployee';
import Navbar from './components/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import { ChakraProvider, Box, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/actions/authActions';

function App() {
    const dispatch = useDispatch();
    const { loading: authLoading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <ChakraProvider>
            {authLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute />}>
                            <Route index element={<EmployeeList />} />
                            <Route path="add" element={<AddEmployee />} />
                            <Route path="edit/:id" element={<EditEmployee />} />
                        </Route>
                    </Routes>
                </Router>
            )}
        </ChakraProvider>
    );
}

export default App;