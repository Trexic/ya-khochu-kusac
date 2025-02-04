import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import UserBookingsPage from './pages/UserBookingsPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute'; // Защищенный маршрут
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  const [user, setUser] = useState(null); // Состояние обычного пользователя
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Состояние администратора

  // Обработка входа пользователя
  const handleUserLogin = (userData) => {
    setUser(userData);
  };

  // Обработка выхода пользователя
  const handleLogout = () => {
    setUser(null);
    setIsAdminLoggedIn(false); // Очищаем состояние администратора при выходе
  };

  // Обработка входа администратора
  const handleAdminLogin = (isLoggedIn) => {
    if (isLoggedIn) {
      setIsAdminLoggedIn(true); // Устанавливаем флаг администратора в true
    }
  };

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar user={user} isAdminLoggedIn={isAdminLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<HomePage />} />

          {/* Регистрация */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Вход пользователя */}
          <Route path="/login" element={<LoginPage onLogin={handleUserLogin} />} />

          {/* Бронирование столика */}
          <Route path="/booking" element={<BookingPage user={user} />} />

          {/* Мои бронирования */}
          <Route path="/user-bookings" element={<UserBookingsPage user={user} />} />

          {/* Вход администратора */}
          <Route path="/admin-login" element={<AdminLoginPage onLogin={handleAdminLogin} />} />

          {/* Панель администратора (защищенный маршрут) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
                <AdminPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;