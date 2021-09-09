import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import "macro-css";


ReactDOM.render(
 <Router>
   <React.StrictMode>
    <App />
  </React.StrictMode>
 </Router>,
  document.getElementById('root')
);

