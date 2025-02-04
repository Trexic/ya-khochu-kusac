import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 8px;
  }
`;

const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FormBlock = styled.div`
  margin-bottom: 15px;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px;
  }
`;

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = React.useState({ login: '', password: '' });
    const navigate = useNavigate(); // Используем для программного перенаправления

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (credentials.login === 'admin' && credentials.password === 'restaurant') {
            onLogin(true); // Устанавливаем флаг администратора
            navigate('/admin'); // Программное перенаправление на /admin
        } else {
            alert('Неверный логин или пароль');
        }
    };

    return (
        <FormContainer>
            <FormTitle>Вход для администратора</FormTitle>

            {/* Логин */}
            <FormBlock>
                <Label>Логин</Label>
                <StyledInput name="login" type="text" value={credentials.login} onChange={handleInputChange} />
            </FormBlock>

            {/* Пароль */}
            <FormBlock>
                <Label>Пароль</Label>
                <StyledInput name="password" type="password" value={credentials.password} onChange={handleInputChange} />
            </FormBlock>

            {/* Кнопка отправки */}
            <SubmitButton onClick={handleSubmit}>Войти</SubmitButton>
        </FormContainer>
    );
};

export default AdminLogin;