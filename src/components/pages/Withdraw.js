import React, { useState,useEffect } from "react";
import { Toast } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../../App.css';


function Withdraw() {
  const [formData, setFormData] = useState({
    transactionId: "",
    accountNumber: "",
    transactionDate: "",
    amount: "",
    description: "",
  });


  const [accountList, setAccountList] = useState([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const storedCustomer = localStorage.getItem('customer');
        if (!storedCustomer) {
          toast.error("No customer found in localStorage", { position: "top-center" });
          return;
        }
  
        const customer = JSON.parse(storedCustomer);
        const response = await fetch(`http://localhost:8900/api/accounts/${customer.customerId}`);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch accounts. Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Fetched accounts:", result);
  
        if (Array.isArray(result.data)) {
          setAccountList(result.data); 
        } else {
      toast.error("you don't have any account please create first", { position: "top-center" });
        }
  
      } catch (error) {
        console.error("Error fetching accounts:", error);
      toast.error("you don't have any account please create first", { position: "top-center" });
      }
    };
  
    fetchAccounts();
  }, []);
  

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
    const response = await fetch('http://localhost:8900/api/transaction/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('withdraw response:', data);
      toast.success(`Transaction completed Successfully`, { position: 'top-center' });
      handleReset();
      
    } else{
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
    alert('Server error during withdraw');
  }
  };



  const handleReset = () => {
    setFormData({
   transactionId: "",
    accountNumber: "",
    transactionDate: "",
    amount: "",
    description: "",
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
    backgroundColor: "#ae714eff",
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
      <h2 style={styles.heading}>Withdraw </h2>
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
{/* 

        <label style={styles.label} htmlFor="accountNumber1">
           Account Number
        </label>
        <input
          type="number"
          id="accountNumber"
          name="accountNumber" className="no-arrow"
          value={formData.accountNumber}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter Account number"
          required
        /> */}



<select
  name="accountNumber"
  value={formData.accountNumber}
  onChange={handleChange}
  style={styles.input}
  required
>
  <option value="">Select Account</option>
  {accountList.map((account) => (
    <option key={account.accountNumber} value={account.accountNumber}>
      {account.accountNumber} ({account.accountType})
    </option>
  ))}
</select>

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
          style={styles.input}
           placeholder="Enter Amount in INR"
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

        <input type="submit" value="Withdraw" style={styles.button} />
      </form>
    </div>
  );
}


export default Withdraw;
