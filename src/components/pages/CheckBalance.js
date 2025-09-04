import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';


function CheckBalance() {
  const [accountNumber, setAccountNumber] = useState('');
 const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBalance(null);
    setError('');

    try {
      const response = await fetch(`http://localhost:8900/api/account/balance/${accountNumber}`);
      if (!response.ok) {
      toast.error('Invalid', { position: 'top-center' });
        throw new Error('Account not found');
      }

      const result = await response.json();
      setBalance(result.data);
      toast.success(`Your balance is ₹${result.data}`, { position: 'top-center' });
      handleReset();
    } catch (err) {
      setError(err.message);

    }
  };

const handleReset=()=>{
setAccountNumber("");
}


  return (
    <>
      <style>{`
       
        .container {
          max-width: 400px;
          margin: 100px auto;
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);

        }

        form {
          display: flex;
          flex-direction: column;
        }
        label{
        font-weight:bold;
        margin-bottom: 10px;
        font-size:20px;
        }

        input[type="number"] {
          padding: 8px;
          margin: 5px 0 100px 0;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
        }

        .submit-btn {
          background-color: #28a745; /* green */
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          flex: 1;
          margin-right: 10px;
        }

        .home-link {
          background-color: #007bff; /* blue */
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          text-align: center;
          border-radius: 8px;
          font-size: 16px;
          display: inline-block;
        }

      `}</style>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="accountNumber">Enter Account Number</label>
          <input type="number" id="accountNumber" name="accountNumber"  className="no-arrow" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
   <ToastContainer/>
          <div className="button-group">
            <button type="submit" className="submit-btn">Check Balance</button>
            {/* <Link to='/' className="home-link">Back to Home</Link> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default CheckBalance;
