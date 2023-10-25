import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom';
import { UserProvider } from "./components/contexts/UserContext";
// import reportWebVitals from './reportWebVitals';
document.body.style.margin = 0

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
