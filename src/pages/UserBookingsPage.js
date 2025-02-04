import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8f9fa;
`;

const BookingsContainer = styled.div`
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
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

const UserBookingsPage = ({ user }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`/api/bookings/user/${user.id}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Ошибка получения бронирований:', error);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    return (
        <PageContainer>
            <BookingsContainer>
                <PageTitle>Мои бронирования</PageTitle>
                {bookings.length > 0 ? (
                    <BookingsTable>
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Время</th>
                                <th>Гости</th>
                                <th>Статус</th>
                                <th>Отзыв</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.date}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.guests}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        {booking.status === 'visited' ? (
                                            <input type="text" placeholder="Оставьте отзыв..." />
                                        ) : (
                                            'Отзыв доступен после посещения'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </BookingsTable>
                ) : (
                    <p>У вас пока нет бронирований.</p>
                )}
            </BookingsContainer>
        </PageContainer>
    );
};

export default UserBookingsPage;