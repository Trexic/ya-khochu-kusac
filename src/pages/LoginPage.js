import React from 'react';
import Login from '../components/Login';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const LoginPage = ({ onLogin }) => {
    return (
        <PageContainer>
            <Login onLogin={onLogin} />
        </PageContainer>
    );
};

export default LoginPage;