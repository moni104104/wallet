import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import '../../App.css';


function Registration() {
  const [formData, setFormData] = useState({
    customerId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    contactNo: '',
    gender: '',
    password: '',
    confirmPassword: '',
    registrationDate: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });



  const navigate = useNavigate(); 
 
    const goToLogin = () => {
    navigate('/login'); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match", { position: 'top-center' });
    return;
  }

  try {
    const response = await fetch('http://localhost:8900/api/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        registrationDate: new Date().toISOString().split('T')[0], 
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
      toast.success(`Register Successfully`, { position: 'top-center' });
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
    alert('An error occurred while submitting the form.');
  }
};



  const handleReset = () => {
    setFormData({
      customerId: '',
      firstName: '',
      lastName: '',
      emailId: '',
      contactNo: '',
      gender: '',
      password: '',
      confirmPassword: '',
      registrationDate: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
    });
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 900px;
          margin: 50px auto;
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }

        input, textarea {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }

        .gender-group {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          grid-column: span 2;
          margin-top: 20px;
        }

        .submit-button,
        .login-button {
          background-color: green;
          max-width: 150px;
          color: white;
          padding: 10px;
          font-size: 18px;
          border-radius: 8px;
          cursor: pointer;
          border: none;
        }

        .login-button {
          background-color: gray;
        }

       
      `}</style>

      <div className="container">
        <h1>Registration Form</h1>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="customerId" value={formData.customerId} />

          <div>
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div>
            <label>Email ID</label>
            <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />
          </div>

          <div>
            <label>Contact No.</label>
            <input type="number" name="contactNo" value={formData.contactNo} className='no-arrow' onChange={handleChange} required />
          </div>

             <div>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="gender-group">
            <label>Gender:</label>
            <label><input type="radio" name="gender" value="MALE" checked={formData.gender === 'MALE'} onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="FEMALE" checked={formData.gender === 'FEMALE'} onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="OTHERS" checked={formData.gender === 'OTHERS'} onChange={handleChange} /> Others</label>
          </div>

       

          <input type="hidden" name="registrationDate" value={formData.registrationDate} />

          <div className="full-width">
            <label>Address Line 1</label>
            <textarea name="addressLine1" value={formData.addressLine1} onChange={handleChange} required rows="2" />
          </div>

          <div className="full-width">
            <label>Address Line 2</label>
            <textarea name="addressLine2" value={formData.addressLine2} onChange={handleChange} rows="2" />
          </div>

          <div>
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div>
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </div>

          <div>
            <label>Pincode</label>
            <input type="number" name="pincode" className="no-arrow" value={formData.pincode} onChange={handleChange} required />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="login-button" onClick={goToLogin}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
