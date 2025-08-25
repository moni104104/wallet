import React, { useState } from 'react';
import '../../App.css';


function DeleteAccount() {
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    accountNumber: '',
    confirmAccountNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.accountNumber !== formData.confirmAccountNumber) {
    alert("Account numbers do not match.");
    return;
  }

  try {
    const response = await fetch('http://localhost:8900/account/deleteAccount', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: formData.emailId,
        password: formData.password,
        accountNumber: formData.accountNumber,
      }),
    });

    if (response.ok) {
      const message = await response.text();
      alert(message || "Account deleted successfully!");
      setFormData({
        emailId: '',
        password: '',
        accountNumber: '',
        confirmAccountNumber: '',
      });
    } else {
      const errorText = await response.text();
      alert("Error: " + errorText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while deleting the account.");
  }
};


  return (
    <>
      <style>{`
        .container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px;
          background-color: #f4f4f4;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: bold;
          margin-top: 10px;
          font-size: 17px;
        }
        input {
          padding: 8px;
          margin-top: 5px;
          margin-bottom: 15px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button {
          padding: 10px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }
        button:hover {
          background-color: darkred;
        }
      `}</style>

      <div className="container">
        <h2>Delete Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailId">Customer ID</label>
          <input
            type="text"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="number"
            id="accountNumber"
            name="accountNumber" className="no-arrow"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmAccountNumber">Confirm Account Number</label>
          <input
            type="number"
            id="confirmAccountNumber"
            name="confirmAccountNumber" className="no-arrow"
            value={formData.confirmAccountNumber}
            onChange={handleChange}
            required
          />

          <button type="submit">Delete Account</button>
        </form>
      </div>
    </>
  );
}

export default DeleteAccount;
