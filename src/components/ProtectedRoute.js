import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdminLoggedIn, children }) => {
    if (!isAdminLoggedIn) {
        // Если администратор не авторизован, перенаправляем на страницу входа
        return <Navigate to="/admin-login" replace />;
    }

    // Если администратор авторизован, показываем запрошенную страницу
    return children ? children : <Outlet />;
};

export default ProtectedRoute;