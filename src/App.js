
import React from 'react';
import Navbar from './components/ui/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Terms from './pages/Terms';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/terms-of-service" element={<Terms/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
