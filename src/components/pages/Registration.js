import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
    status: 'FREE',         
    expiryDate: '',         
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          registrationDate: new Date().toISOString().split('T')[0], // override on submit
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Registered Successfully!', { position: 'top-center' });
        handleReset();
      } else {
        const error = await response.json();
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, msg]) =>
            toast.error(`${field}: ${msg}`, { position: 'top-center' })
          );
        } else {
          toast.error('Error: ' + (error.message || 'Unknown error'), {
            position: 'top-center',
          });
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
      status: 'FREE',
      expiryDate: '',
    });
  };



    const handleDownloadTemplate = async () => {
    const headers = [
      'First Name',
      'Last Name',
      'Email ID',
      'Contact No',
      'Gender',
      'Password',
      'Confirm Password',
      'Address Line 1',
      'Address Line 2',
      'City',
      'State',
      'Pincode',
      'Status'
    ];

    try {
      const response = await fetch('http://localhost:8900/api/downloadTemplate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(headers),
      });

      if (!response.ok) {
        throw new Error('Failed to download template');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Download failed: ' + error.message, { position: 'top-center' });
    }
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 800px;
          margin: 20px auto;
          background-color: white;
          border-radius: 8px;
          padding: 20px 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 20px;
        }

        label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }

        input, textarea {
          width: 100%;
          padding: 6px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 14px;
          box-sizing: border-box;
        }

        .gender-group {
          grid-column: span 2;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .gender-group label {
          margin: 0;
        }

        .full-width {
          grid-column: span 2;
        }

        .button-group {
          grid-column: span 2;
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 10px;
        }

        .submit-button,
        .login-button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          color: white;
        }

        .submit-button {
          background-color: #28a745;
        }

        .login-button {
          background-color: #6c757d;
        }

        @media (max-width: 600px) {
          form {
            grid-template-columns: 1fr;
          }

          .gender-group {
            flex-direction: column;
            align-items: flex-start;
          }

          .button-group {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      <div className="container">
        <h1>Registration Form</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="customerId" value={formData.customerId} />
          <input type="hidden" name="registrationDate" value={formData.registrationDate} />
          <input type="hidden" name="expiryDate" value={formData.expiryDate} />

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
            <input type="number" name="contactNo" value={formData.contactNo} onChange={handleChange} className='no-arrow' required />
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

          <div className="full-width">
            <label>Address Line 1</label>
            <textarea name="addressLine1" rows="2" value={formData.addressLine1} onChange={handleChange} required />
          </div>

          <div className="full-width">
            <label>Address Line 2</label>
            <textarea name="addressLine2" rows="2" value={formData.addressLine2} onChange={handleChange} />
          </div>

          <div>
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div>
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </div>

          <div className="full-width">
            <label>Pincode</label>
            <input type="number" name="pincode" value={formData.pincode} className='no-arrow' onChange={handleChange} required />
          </div>

          <div className="full-width">
            <label>Subscription</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="FREE">FREE</option>
              <option value="PREMIUM">PREMIUM</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="login-button" onClick={goToLogin}>Login</button>
             <button type="button" className="download-button" onClick={handleDownloadTemplate}>Download Template</button>

          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
