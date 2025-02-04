import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Стилизованный контейнер для формы
const FormContainer = styled.div`
  max-width: 400px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
`;

// Стилизованный заголовок
const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

// Стилизованный блок формы
const FormBlock = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

// Стилизованная метка (label)
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

// Стилизованный поле ввода (input)
const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Стилизованный блок ошибки
const ErrorText = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
`;

// Стилизованная кнопка
const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.03);
  }
`;

// Стилизованный текст ссылки
const LinkText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ onLogin }) => {
    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Логин обязателен'),
        password: Yup.string().required('Пароль обязателен'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/api/login', values);
            if (response.data.success) {
                onLogin(response.data.user); // Передаем данные пользователя в App
            } else {
                alert(response.data.message || 'Неверный логин или пароль');
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
            alert('Произошла ошибка при входе');
        }
    };

    return (
        <FormContainer>
            <FormTitle>Вход</FormTitle>
            <Formik initialValues={{ login: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        {/* Логин */}
                        <FormBlock>
                            <Label>Логин</Label>
                            <StyledField name="login" type="text" />
                            <ErrorText>{errors.login && touched.login ? errors.login : null}</ErrorText>
                        </FormBlock>

                        {/* Пароль */}
                        <FormBlock>
                            <Label>Пароль</Label>
                            <StyledField name="password" type="password" />
                            <ErrorText>{errors.password && touched.password ? errors.password : null}</ErrorText>
                        </FormBlock>

                        {/* Кнопка отправки */}
                        <SubmitButton type="submit">Войти</SubmitButton>

                        {/* Ссылка на регистрацию */}
                        <LinkText onClick={() => window.location.href = '/register'}>
                            Нет аккаунта? Зарегистрируйтесь
                        </LinkText>
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default Login;
