import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Стилизованный контейнер для формы
const FormContainer = styled.div`
  max-width: 400px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

// Стилизованный заголовок
const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Стилизованный блок формы
const FormBlock = styled.div`
  margin-bottom: 15px;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

// Стилизованная метка (label)
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

// Стилизованное поле ввода (input)
const StyledField = styled(Field)`
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

// Стилизованный выпадающий список (select)
const StyledSelect = styled(StyledField).attrs({ as: 'select' })`
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="%23555" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6"/></svg>')
    no-repeat right 10px center;
  background-size: 16px;
  padding-right: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
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

const BookingForm = ({ onSubmit }) => {
    const validationSchema = Yup.object().shape({
        date: Yup.date().required('Дата обязательна').min(new Date(), 'Дата не может быть в прошлом'),
        time: Yup.string().matches(/^\d{2}:\d{2}$/, 'Неверный формат времени (ЧЧ:ММ)').required('Время обязательно'),
        guests: Yup.number().min(1, 'Минимум 1 гость').max(10, 'Максимум 10 гостей').required('Количество гостей обязательно'),
        phone: Yup.string()
            .matches(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона (+7(XXX)-XXX-XX-XX)')
            .required('Телефон обязателен'),
    });

    return (
        <FormContainer>
            <FormTitle>Бронирование столика</FormTitle>
            <Formik
                initialValues={{ date: '', time: '', guests: '', phone: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        {/* Дата */}
                        <FormBlock>
                            <Label>Дата</Label>
                            <StyledField name="date" type="date" />
                            <ErrorText>{errors.date && touched.date ? errors.date : null}</ErrorText>
                        </FormBlock>

                        {/* Время */}
                        <FormBlock>
                            <Label>Время (ЧЧ:ММ)</Label>
                            <StyledField name="time" type="text" placeholder="19:00" />
                            <ErrorText>{errors.time && touched.time ? errors.time : null}</ErrorText>
                        </FormBlock>

                        {/* Количество гостей */}
                        <FormBlock>
                            <Label>Количество гостей</Label>
                            <StyledSelect name="guests">
                                <option value="" disabled>
                                    Выберите количество
                                </option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </StyledSelect>
                            <ErrorText>{errors.guests && touched.guests ? errors.guests : null}</ErrorText>
                        </FormBlock>

                        {/* Телефон */}
                        <FormBlock>
                            <Label>Телефон (+7(XXX)-XXX-XX-XX)</Label>
                            <StyledField name="phone" type="text" placeholder="+7(___) ___-__-__" />
                            <ErrorText>{errors.phone && touched.phone ? errors.phone : null}</ErrorText>
                        </FormBlock>

                        {/* Кнопка отправки */}
                        <SubmitButton type="submit">Забронировать</SubmitButton>
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default BookingForm;