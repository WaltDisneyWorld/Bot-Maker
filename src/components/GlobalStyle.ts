import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    box-sizing: border-box;
  }

  body {
    overflow-y: hidden;
    font-family: Inter, sans-serif;
    background-color: var(--background);
    color: #fff;
  }

  ::selection {
    background-color: var(--purple);
  }

  button {
    cursor: pointer;
  }

  a {
    color: var(--purple);
    text-decoration: none;
  }

  a:hover {
    color: var(--purpleDark);
  }

  .fadeIn-200 {
    animation: fadeIn 200ms backwards;
  }

  .fadeOut-200 {
    animation: fadeOut 200ms forwards;
  }

  .fadeIn-500 {
    animation: fadeIn 500ms backwards;
  }

  .fadeOut-500 {
    animation: fadeOut 500ms forwards;
  }

  .fadeInRight-500 {
    animation: fadeInRight 500ms backwards;
  }

  .fadeOutRight-500 {
    animation: fadeOutRight 500ms forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    } to {
      opacity: 0;
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(200%);
    } to {
      opacity: 1;
    }
  }

  @keyframes fadeOutRight {
    from {
      opacity: 1;
    } to {
      opacity: 0;
      transform: translateX(200%);
    }
  }
`;

export default GlobalStyle;
