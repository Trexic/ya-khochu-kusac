import React from 'react';
import Register from '../components/Register';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const RegisterPage = ({ onRegister }) => {
    return (
        <PageContainer>
            <Register onRegister={onRegister} />
        </PageContainer>
    );
};

export default RegisterPage;