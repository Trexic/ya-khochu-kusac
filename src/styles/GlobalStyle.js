import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa; /* Бежевый фон */
    color: #333; /* Темно-серый текст */
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  button:hover {
    transform: scale(1.05); /* Немного увеличивается при наведении */
  }
`;


