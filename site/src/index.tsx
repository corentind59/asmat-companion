import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import configureAmplify from './amplify';

configureAmplify();

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
