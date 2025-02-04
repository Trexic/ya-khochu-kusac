import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Стилизованный контейнер для панели администратора
const AdminContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 8px;
  }
`;

// Стилизованный заголовок
const AdminTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Стилизованная таблица бронирований
const BookingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Стилизованные кнопки статуса
const StatusButton = styled.button`
  background-color: ${(props) =>
        props.status === 'visited'
            ? '#28a745'
            : props.status === 'canceled'
                ? '#dc3545'
                : '#ffc107'};
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

// Стилизованная кнопка выхода
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

const AdminPage = ({ onLogout }) => {
    const [bookings, setBookings] = useState([]);

    // Получение списка бронирований при монтировании компонента
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Ошибка получения бронирований:', error);
            }
        };

        fetchBookings();
    }, []);

    // Обновление статуса бронирования
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/bookings/${id}`, { status });
            setBookings((prev) =>
                prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
            );
        } catch (error) {
            console.error('Ошибка обновления статуса:', error);
        }
    };

    return (
        <AdminContainer>
            <AdminTitle>Админ-панель</AdminTitle>
            <LogoutButton onClick={onLogout}>Выйти</LogoutButton>

            {/* Таблица бронирований */}
            {bookings.length > 0 ? (
                <BookingsTable>
                    <thead>
                        <tr>
                            <th>Логин</th>
                            <th>Дата</th>
                            <th>Время</th>
                            <th>Гости</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.login}</td>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{booking.guests}</td>
                                <td>{booking.status}</td>
                                <td>
                                    <StatusButton onClick={() => updateStatus(booking.id, 'visited')} status="visited">
                                        Посещение состоялось
                                    </StatusButton>
                                    <StatusButton onClick={() => updateStatus(booking.id, 'canceled')} status="canceled">
                                        Отменить
                                    </StatusButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </BookingsTable>
            ) : (
                <p>Нет бронирований.</p>
            )}
        </AdminContainer>
    );
};

export default AdminPage;