import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './Menu';

import Profile from './Profile';
import NewAccount from './NewAccount';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import CheckBalance from './CheckBalance';
import DeleteAccount from './DeleteAccount';
import TransactionSummary from './TransactionSummary';
import Registration from './Registration';
import Documents from './Documents';


import bank from '../images/bank.jpg';

const Dashboard= ({ onLogout }) => {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    content: {
      margin: "0px",
      width: "100%",
      padding: "3px",
      backgroundColor: "rgba(236, 238, 241, 0.4)",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      border: "2px solid #ccc",
      objectFit: 'cover',
    },
  };

  return (
    <div style={styles.container}>
      <Menu onLogout={onLogout} />
      <div style={styles.content}>
        <Routes>
          <Route
            path="/"
            element={
              <img src={bank} alt="no image" style={styles.image} />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newaccount" element={<NewAccount />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/checkbalance" element={<CheckBalance />} />
          <Route path="/documents" element={<Documents/>} />

          {/* <Route path="/deleteaccount" element={<DeleteAccount />} /> */}
          <Route path="/transactions" element={<TransactionSummary />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
