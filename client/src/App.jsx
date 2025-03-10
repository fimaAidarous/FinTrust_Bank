import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';  
import Header from "./pages/Header";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <Header />} 
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}
           <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  
    </BrowserRouter>
  );
}
