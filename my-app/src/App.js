import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import TodoList from './pages/TodoList';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/log" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </>
  );
};

export default App;