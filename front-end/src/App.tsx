import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './provider/Provider';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import InitialPage from './pages/InitialPage';

function App() {
  return (
  <Provider>
    <Routes>
      <Route path="/" element={ <InitialPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/register" element={ <RegisterPage /> } />
      <Route path="/home/:id" element={ <HomePage /> } />
    </Routes>
  </Provider>
  );
}

export default App;
