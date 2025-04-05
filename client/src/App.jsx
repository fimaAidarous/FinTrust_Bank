import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';  
import Header from "./pages/Header";

  //  Accounts
import CreateAccount from "./components/Accounts/CreateAccount";
import AccountList from "./components/Accounts/AccountList";
import UpdateAccount from "./components/Accounts/UpdateAccount";
import DeleteAccount from "./components/Accounts/DeleteAccount";

  // Transactions 
import CreateTransaction from "./components/Transactions/CreateTransaction";
import TransactionList from "./components/Transactions/TransactionList";
import UpdateTransaction from "./components/Transactions/UpdateTransaction";
import DeleteTransaction from "./components/Transactions/DeleteTransaction";


  // Transfers
import CreateTransfer from "./components/Transfer/CreateTransfer";
import TransferList from "./components/Transfer/TransferList";
import DeleteTransfer from "./components/Transfer/DeleteTransfer";


  // Loans 
import CreateLoan from "./components/Loans/CreateLoan";
import LoanList from "./components/Loans/LoanList";
import UpdateLoan from "./components/Loans/UpdateLoan";
import DeleteLoan from "./components/Loans/DeleteLoan";

  // Cards 
import CreateCard from "./components/Cards/CreateCard";
import CardList from "./components/Cards/CardList";
import UpdateCard from "./components/Cards/UpdateCard";
import DeleteCard from "./components/Cards/DeleteCard";

  // BillPayments 
import CreateBillPayment from "./components/BillPayments/CreateBillPayment";
import BillPaymentList from "./components/BillPayments/BillPaymentList";
import UpdateBillPayment from "./components/BillPayments/UpdateBillPayment";
import DeleteBillPayment from "./components/BillPayments/DeleteBillPayment";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <Header />} 
      <Routes>
        {!isLoggedIn ? ( <Route path="*" element={<Login />} />) : 
        ( <> <Route path="/login" element={<Navigate to="/" />} /> </>)}
      <Route path="/dashboard" element={<Dashboard />} />

        {/* Accounts  */}
      <Route path="/create-account" element={<CreateAccount/>} />
      <Route path="/accounts" element={<AccountList />} />
      <Route path="/update-account/:accountId" element={<UpdateAccount />} />
      <Route path="/delete-account/:id" element={<DeleteAccount />} /> 

              {/* Transactions */}
      <Route path="/create-transaction" element={<CreateTransaction />} />
      <Route path="/transactions" element={<TransactionList />} />
      <Route path="/update-transaction/:transactionId" element={<UpdateTransaction />} />
      <Route path="/delete-transaction/:id" element={<DeleteTransaction />} /> 

              {/* Transfers */}
      <Route path="/create-transfer" element={<CreateTransfer />} />
      <Route path="/transfers" element={<TransferList />} />
      <Route path="/delete-transfer/:id" element={<DeleteTransfer />} /> 

              {/* Loans */}
      <Route path="/create-loan" element={<CreateLoan />} />
      <Route path="/Loans" element={<LoanList />} />
      <Route path="/update-loan/:loanId" element={<UpdateLoan />} />
      <Route path="/delete-loan/:id" element={<DeleteLoan />} /> 

              {/* Cards */}
      <Route path="/create-card" element={<CreateCard />} />
      <Route path="/Cards" element={<CardList />} />
      <Route path="/update-card/:cardId" element={<UpdateCard />} />
      <Route path="/delete-card/:id" element={<DeleteCard />} /> 

              {/* BillPayment */}
      <Route path="/create-billPayment" element={<CreateBillPayment />} />
      <Route path="/BillPayments" element={<BillPaymentList />} />
      <Route path="/update-billPayment/:billPaymentId" element={<UpdateBillPayment />} />
      <Route path="/delete-billPayment/:id" element={<DeleteBillPayment />} /> 
      </Routes>
    </BrowserRouter>
  );
}
