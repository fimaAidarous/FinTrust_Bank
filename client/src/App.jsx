import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';  
import Header from "./pages/Header";
import CreateAccount from "./components/Accounts/CreateAccount";
import AccountList from "./components/Accounts/AccountList";
import UpdateAccount from "./components/Accounts/UpdateAccount";
import DeleteAccount from "./components/Accounts/DeleteAccount";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <Header />} 
      <Routes>
        {!isLoggedIn ? ( <Route path="*" element={<Login />} />) : 
        ( <> <Route path="/login" element={<Navigate to="/" />} /> </>)}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-account" element={<CreateAccount/>} />
      <Route path="/accounts" element={<AccountList />} />
      <Route path="/update-account/:accountId" element={<UpdateAccount />} />
      <Route path="/delete-account/:id" element={<DeleteAccount />} /> 
      </Routes>
    </BrowserRouter>
  );
}
