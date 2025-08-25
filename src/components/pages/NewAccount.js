import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../../App.css';


function NewAccount() {
  const [formData, setFormData] = useState({
    customerId: '',
    accountNumber: '',
    accountType: '',
    openingBalance: '',
    openingDate: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      openingDate: new Date().toISOString().split('T')[0], // e.g., 2025-08-15
    };

    try {
      const response = await fetch('http://localhost:8900/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);
        toast.success(`Account created Successfully`, { position: 'top-center' });
        handleReset();
      } else {
        const errorText = await response.text();
        toast.error(`You are not a Valid user!! Register First`, { position: 'top-center' });
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while creating account.');
    }

  };

    const handleReset = () => {
    setFormData({
   customerId: '',
    accountNumber: '',
    accountType: '',
    openingBalance: '',
    openingDate: '',
    description: '',
    });
  }
  return (
    <>
      <style>{`
       
        .container {
          margin: 50px auto;
          max-width: 400px;
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-sizing: border-box;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);

        }
        h2 {
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
        }

        label{
          font-weight: bold;
          font-size:17px;
        }
        input[type="number"],
        input[type="date"],
        textarea,
        select {
          padding: 5px;
          margin: 10px 0;
          width: 100%;
          box-sizing: border-box;
        }
        input[type="submit"] {
          background-color: green;
          border-radius: 4px;
          padding: 10px;
          margin: 20px 0;
          color: white;
          font-size: 20px;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        <h2>New Account</h2>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
          <label htmlFor="customerId">CustomerId</label>
          <input type="number" name="customerId" className="no-arrow" value={formData.customerId} onChange={handleChange} required />
          <input type="hidden" name="accountNumber" className="no-arrow" value={formData.accountNumber} />

          <label htmlFor="accountType">Account Type</label>
          <input list="accountTypes" name="accountType" value={formData.accountType} onChange={handleChange} required
          />

          <datalist id="accountTypes">
            <option value="SAVINGS" />
            <option value="CURRENT" />
            <option value="SALARY" />
            <option value="RD" />
            <option value="FD" />
            <option value="XYZ" />

          </datalist>

          <label htmlFor="openingBalance">Opening Balance</label>
          <input
            type="number" name="openingBalance" className="no-arrow" value={formData.openingBalance} onChange={handleChange} placeholder="Enter Amount in INR"  required
          />

          <input type="hidden" name="openingDate" value={formData.openingDate} />

          <label htmlFor="description">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required
          />

          <input type="hidden" name="customerId" value={formData.customerId} />

          <input type="submit" value="New Account" onSubmit={handleSubmit}/>
        </form>
      </div>
    </>
  );
}

export default NewAccount;
