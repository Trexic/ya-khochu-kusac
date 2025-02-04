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

// Стилизованное поле ввода (input)
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

const Register = ({ onRegister }) => {
    const validationSchema = Yup.object().shape({
        login: Yup.string()
            .matches(/^[а-яА-ЯёЁ]{6,}$/, 'Логин должен содержать минимум 6 символов кириллицей')
            .required('Логин обязателен'),
        password: Yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
        firstName: Yup.string().required('Имя обязательно'),
        lastName: Yup.string().required('Фамилия обязательна'),
        phone: Yup.string()
            .matches(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона')
            .required('Телефон обязателен'),
        email: Yup.string().email('Неверный формат email').required('Email обязателен'),
    });

    const handleSubmit = async (values) => {
        try {
            await onRegister(values);
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            alert('Произошла ошибка при регистрации');
        }
    };

    return (
        <FormContainer>
            <FormTitle>Регистрация</FormTitle>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
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

                        {/* Имя */}
                        <FormBlock>
                            <Label>Имя</Label>
                            <StyledField name="firstName" type="text" />
                            <ErrorText>{errors.firstName && touched.firstName ? errors.firstName : null}</ErrorText>
                        </FormBlock>

                        {/* Фамилия */}
                        <FormBlock>
                            <Label>Фамилия</Label>
                            <StyledField name="lastName" type="text" />
                            <ErrorText>{errors.lastName && touched.lastName ? errors.lastName : null}</ErrorText>
                        </FormBlock>

                        {/* Телефон */}
                        <FormBlock>
                            <Label>Телефон (+7(XXX)-XXX-XX-XX)</Label>
                            <StyledField name="phone" type="text" />
                            <ErrorText>{errors.phone && touched.phone ? errors.phone : null}</ErrorText>
                        </FormBlock>

                        {/* Email */}
                        <FormBlock>
                            <Label>Email</Label>
                            <StyledField name="email" type="email" />
                            <ErrorText>{errors.email && touched.email ? errors.email : null}</ErrorText>
                        </FormBlock>

                        {/* Кнопка отправки */}
                        <SubmitButton type="submit">Зарегистрироваться</SubmitButton>

                        {/* Ссылка на вход */}
                        <LinkText onClick={() => window.location.href = '/login'}>
                            Уже есть аккаунт? Войдите
                        </LinkText>
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default Register;
