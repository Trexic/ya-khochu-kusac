import React from 'react';
import styled from 'styled-components';
import mainImage from '../assets/images/main-image.png'; // Путь к  изображению
import { GlobalStyle } from '../styles/GlobalStyle';

const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const HomeTitle = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const HomeDescription = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const HomePage = () => {
    return (
        <>
            <GlobalStyle />
            <HomeContainer>
                {/* Изображение */}
                <StyledImage src={mainImage} alt="Главная картинка" />

                {/* Заголовок и описание */}
                <HomeTitle>Добро пожаловать в ресторан "Я хочу кушац"!</HomeTitle>
                <HomeDescription>
                    Здесь вы можете забронировать столик и насладиться вкусными блюдами.
                </HomeDescription>
            </HomeContainer>
        </>
    );
};

export default HomePage;