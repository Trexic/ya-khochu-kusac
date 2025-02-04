import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #007bff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  color: white;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 15px;

  li {
    a {
      color: white;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      transition: color 0.3s ease;

      &:hover {
        color: #ffc107;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 15px;
  }
`;

const Navbar = ({ user, isAdminLoggedIn, onLogout }) => {
    return (
        <NavbarContainer>
            {/* Логотип */}
            <Logo>Я хочу кушац</Logo>

            {/* Список ссылок */}
            <NavList>
                <li><Link to="/">Главная</Link></li>
                {user ? (
                    <>
                        <li><Link to="/booking">Бронирование столика</Link></li>
                        <li><Link to="/user-bookings">Мои бронирования</Link></li>
                        {isAdminLoggedIn && <li><Link to="/admin">Админ-панель</Link></li>} {/* Показываем только для администратора */}
                        <li>
                            <LogoutButton onClick={onLogout}>Выйти</LogoutButton>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/login">Вход</Link></li>
                        <li><Link to="/admin-login">Вход администратора</Link></li>
                    </>
                )}
            </NavList>
        </NavbarContainer>
    );
};

export default Navbar;