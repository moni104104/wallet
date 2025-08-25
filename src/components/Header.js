import React from 'react';

function Header() {
  const styles = {
    container: {
   width: '100%',
  maxWidth: '1200px',  
  margin: '20px auto' 
    },
    navbar: {
      display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
      backgroundColor: '#1e1e2f',
      padding: '10px 20px',
      color: 'white',
      height:'50px',
      borderRadius:'10px'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    buttons: {
      display: 'flex',
      gap: '10px'
    },
    button : {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      color: 'white'
    },
    loginBtn: {
      backgroundColor: '#007bff'
    },
    signupBtn: {
      backgroundColor: '#28a745'
    }
  };

  return (
    <div style={styles.container}>
    <nav style={styles.navbar}>
      <div style={styles.logo}>Wallet</div>
      <div style={styles.buttons}>
        <button style={{ ...styles.button, ...styles.loginBtn }}>Login</button>
        <button style={{ ...styles.button, ...styles.signupBtn }}>Sign Up</button>
      </div>
    </nav>
    </div>
  );
}

export default Header;

