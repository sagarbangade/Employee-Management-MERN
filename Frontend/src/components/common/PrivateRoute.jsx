import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    if (loading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;