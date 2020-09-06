import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import TitleBar from './components/TitleBar';
import Routes from './Routes';

import './styles/main.css';

ReactDOM.render(
  <TitleBar />,
  document.getElementById('overlays')
);
ReactDOM.render(
  <StrictMode>
    <Routes />
  </StrictMode>,
  document.getElementById('content')
);
