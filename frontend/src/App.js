import logo from './logo.svg';
import './App.css';
import Navigate from './Components/Navigate';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import ChatArea from './Components/ChatArea';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  

  return (
    // <>
    // <div className='chat-container'>
    // <Sidebar />
    // <ChatArea />
    // </div>
    // </>
    <BrowserRouter>
      <Navigate />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat/:username' element={<div className='chat-container'><Sidebar/><ChatArea /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
