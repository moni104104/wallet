import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewAccount() {
  const [formData, setFormData] = useState({
    customerId: '',
    accountNumber: '',
    accountType: '',
    openingBalance: '',
    openingDate: '',
    description: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedCustomer = localStorage.getItem('customer');
      if (!storedCustomer) {
        setError('No customer found in localStorage');
        return;
      }

      const customerObj = JSON.parse(storedCustomer);
      setFormData((prevData) => ({
        ...prevData,
        customerId: customerObj.customerId,
      }));
    } catch (err) {
      console.error('Error loading customer from localStorage:', err);
      setError('Error fetching customer data.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      openingDate: new Date().toISOString().split('T')[0],
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
        toast.success('Account created successfully!', { position: 'top-center' });
        handleReset();
      } else {
        const error = await response.json();
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, msg]) => {
            toast.error(`${field}: ${msg}`, { position: 'top-center' });
          });
        } else {
          toast.error('Error: ' + (error.message || 'Unknown error'), { position: 'top-center' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while creating account.');
    }
  };

  const handleReset = () => {
    setFormData((prevData) => ({
      ...prevData,
      accountNumber: '',
      accountType: '',
      openingBalance: '',
      openingDate: '',
      description: '',
    }));
  };

  return (
    <>
      <style>{`
        .container {
          margin: 50px auto;
          max-width: 400px;
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: bold;
          font-size: 17px;
          margin-top: 10px;
        }
        input[type="number"],
        input[type="date"],
        textarea,
        select {
          padding: 8px;
          margin-top: 5px;
          width: 100%;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        input[type="submit"] {
          background-color: green;
          border-radius: 4px;
          padding: 10px;
          margin-top: 20px;
          color: white;
          font-size: 18px;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        <h2>New Account</h2>
        <ToastContainer />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="customerId" value={formData.customerId} />
          <input type="hidden" name="accountNumber" value={formData.accountNumber} />
          <input type="hidden" name="openingDate" value={formData.openingDate} />

          <label htmlFor="accountType">Account Type</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
            <option value="SALARY">Salary</option>
            <option value="RD">Recurring Deposit (RD)</option>
            <option value="FD">Fixed Deposit (FD)</option>
            <option value="XYZ">XYZ</option>
          </select>

          {/* Opening Balance */}
          <label htmlFor="openingBalance">Opening Balance</label>
          <input
            type="number"
            name="openingBalance"
            value={formData.openingBalance}
            onChange={handleChange}
           className="no-arrow"
             placeholder="Enter amount in INR"
            required
          />

          {/* Description */}
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter account description"
            required
          />

          {/* Submit */}
          <input type="submit" value="Create Account" />
        </form>
      </div>
    </>
  );
}

export default NewAccount;
