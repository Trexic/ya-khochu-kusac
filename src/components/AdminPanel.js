import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AdminContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const AdminTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

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
`;

const StatusButton = styled.button`
  background-color: ${(props) => (props.status === 'visited' ? '#28a745' : props.status === 'canceled' ? '#dc3545' : '#ffc107')};
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const AdminPanel = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/bookings/${id}`, { status });
            setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <AdminContainer>
            <AdminTitle>Панель администратора</AdminTitle>
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
        </AdminContainer>
    );
};

export default AdminPanel;