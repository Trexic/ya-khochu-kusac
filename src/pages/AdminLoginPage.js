import React from 'react';
import AdminLogin from '../components/AdminLogin';
import styled from 'styled-components';

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

const AdminLoginPage = ({ onLogin }) => {
    return (
        <PageContainer>
            <AdminLogin onLogin={onLogin} />
        </PageContainer>
    );
};

export default AdminLoginPage;