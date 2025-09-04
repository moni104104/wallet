import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8900/api/customer/isValid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result.data);

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('customer', JSON.stringify(result.data));


        toast.success('Logged in Successfully', { position: 'top-center' });

        if (onLogin) onLogin();

        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        toast.error('Invalid Email Id or Password', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error, please try again later.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registration'); 
  };

  return (
    <>
      <style>{`
        .login-container {
          max-width: 400px;
          margin: 100px auto;
          padding: 40px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        .login-container h2 {
          text-align: center;
          margin-bottom: 30px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 18px;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #0056b3;
        }

        .register-section {
          text-align: center;
          margin-top: 20px;
        }

        .register-button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .register-button:hover {
          background-color: #218838;
        }
      `}</style>

      <div className="login-container">
        <h2>Login</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email ID</label>
            <input
              type="email"
              name="emailId"
              value={loginData.emailId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="register-section">
          <p>Don't have an account?</p>
          <button className="register-button" onClick={handleRegisterRedirect}>
            New Registration
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
