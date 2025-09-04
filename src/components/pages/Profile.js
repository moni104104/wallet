
import React, { useEffect, useState } from 'react';

const Profile= () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
 const [customer, setCustomer] = useState(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedCustomer = localStorage.getItem('customer');
        console.log('Stored in localStorage:', storedCustomer);

        if (!storedCustomer) {
          setError('No customer found in LocalStorage');
          return;
        }

        const customerObj = JSON.parse(storedCustomer);
        setCustomer(customerObj);

        if (!customerObj.emailId) {
          setError('Email not found in customer data');
          return;
        }

        const response = await fetch(`http://localhost:8900/api/customer/${encodeURIComponent(customerObj.emailId)}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched user data:", data);

        setUser(data.data);
      } catch (err) {
        console.error("Error in fetchUserData:", err);
        setError('Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);
  

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Loading...
      </div>
    );
  }

  const containerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '24px',
    color: '#333'
  };

  const fieldContainer = {
    marginBottom: '1rem'
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#555',
    display: 'inline-block',
    width: '160px'
  };

  const valueStyle = {
    color: '#222'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>User Profile</h2>

      <div style={fieldContainer}>
        <span style={labelStyle}>Customer ID:</span>
        <span style={valueStyle}>{user.customerId}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>First Name:</span>
        <span style={valueStyle}>{user.firstName}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Last Name:</span>
        <span style={valueStyle}>{user.lastName}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Email:</span>
        <span style={valueStyle}>{user.emailId}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Contact No:</span>
        <span style={valueStyle}>{user.contactNo}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Gender:</span>
        <span style={valueStyle}>{user.gender}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Password:</span>
        <span style={valueStyle}>******</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Registration Date:</span>
        <span style={valueStyle}>{user.registerationDate}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Address Line 1:</span>
        <span style={valueStyle}>{user.address?.addressLine1}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Address Line 2:</span>
        <span style={valueStyle}>{user.address?.addressLine2}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>City:</span>
        <span style={valueStyle}>{user.address?.city}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>State:</span>
        <span style={valueStyle}>{user.address?.state}</span>
      </div>

      <div style={fieldContainer}>
        <span style={labelStyle}>Pincode:</span>
        <span style={valueStyle}>{user.address?.pincode}</span>
      </div>
    </div>
  );
};

export default Profile;
