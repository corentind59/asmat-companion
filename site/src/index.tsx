import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import configureAmplify from './amplify';

configureAmplify();

ReactDOM.unstable_createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );

// reportWebVitals();
