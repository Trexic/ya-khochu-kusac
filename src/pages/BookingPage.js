import React from 'react';
import BookingForm from '../components/BookingForm';
import styled from 'styled-components';
import axios from 'axios';

// Стилизованный контейнер для страницы
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Стилизованный заголовок страницы
const PageTitle = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const BookingPage = ({ user }) => {
    const handleBookingSubmit = async (values) => {
        try {
            // Отправка данных на сервер
            await axios.post('/api/bookings', { ...values, userId: user.id });
            alert('Столик успешно забронирован!');
        } catch (error) {
            console.error('Ошибка бронирования:', error);
            alert('Произошла ошибка при бронировании');
        }
    };

    return (
        <PageContainer>
            <div style={{ maxWidth: '400px', textAlign: 'center' }}>
                <PageTitle>Бронирование столика</PageTitle>
                <BookingForm onSubmit={handleBookingSubmit} />
            </div>
        </PageContainer>
    );
};

export default BookingPage;