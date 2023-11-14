import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom';
import { UserProvider } from "./components/contexts/UserContext";
document.body.style.margin = 0

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

