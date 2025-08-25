import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

function Transfer() {
  const [formData, setFormData] = useState({
    transactionId: "",
    fromAccountNumber: "",
    toAccountNumber: "",
    transactionDate: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
    ...formData,
    transactionDate: new Date().toISOString().split('T')[0], 
    };
  try {
    const response = await fetch('http://localhost:8900/api/transaction/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('transfer response:', data);
      toast.success(`Transaction completed Successfully`, { position: 'top-center' });
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
     handleReset();

    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error during transfer');
  }
  };


   const handleReset = () => {
    setFormData({
 transactionId: "",
    fromAccountNumber: "",
    toAccountNumber: "",
    transactionDate: "",
    amount: "",
    description: ""
    });

  }


  const styles = {
  container: {
    width: "420px",
    margin: "40px auto",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(203, 27, 27, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "20px",
    color: "black",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#7e1dbaff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};



  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Transfer</h2>
      <ToastContainer/>

      <form onSubmit={handleSubmit} style={styles.form}>
     
        {/* <label style={styles.label} htmlFor="transactionId">
          Transaction ID
        </label> */}
        <input
          type="hidden"
          id="transactionId"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label} htmlFor="fromAccountNumber">
          From Account
        </label>
        <input
          type="number"
          id="fromAccountNumber"
          name="fromAccountNumber" className="no-arrow"
          value={formData.fromAccountNumber}
          onChange={handleChange}
          style={styles.input}
           placeholder="Sender Account number"
          required
        />

        <label style={styles.label} htmlFor="toAccountNumber">
          To Account
        </label>
        <input
          type="number"
          id="toAccountNumber"
          name="toAccountNumber" className="no-arrow"
          value={formData.toAccountNumber}
          onChange={handleChange}
          style={styles.input}
             placeholder="Receiver Account number"
          required
        />

        {/* <label style={styles.label} htmlFor="transactionDate">
          Transaction Date
        </label> */}
        <input
          type="hidden"
          id="transactionDate"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label} htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount" className="no-arrow"
          value={formData.amount}
          onChange={handleChange}
           placeholder="Enter Amount in INR"
          style={styles.input}
          required
        />

        <label style={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <input type="submit" value="Transfer" style={styles.button} />
      </form>
    </div>
  );
}


export default Transfer;
