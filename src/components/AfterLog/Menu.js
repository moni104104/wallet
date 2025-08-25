import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Menu({onLogout}) {
  const [showTransactionsDropdown, setShowTransactionsDropdown] = useState(false);

  const toggleTransactionsDropdown = () => {
    setShowTransactionsDropdown(!showTransactionsDropdown);
  };

const navigate=useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();               
    onLogout();                       
    navigate('/', { replace: true }); 
  };
  const styles = {
   sidebar: {
    minWidth: "300px",
    backgroundColor: "rgba(160, 202, 206, 0.5)",
    padding: "20px",
    border: "1px solid white",
    textAlign:'center'
  },
    menuList: {
      listStyle: 'none',
      padding: 0,
    },
    link: {
      textDecoration: 'none',
      display: 'block',
      padding: '10px',
      color: '#333',
      fontSize:'20px'
    },
    dropdown: {
      paddingLeft: '20px',
    }
  };

  return (
    <div style={styles.sidebar}>
      <h2>User Menu</h2>
      <ul style={styles.menuList}>

        <li><Link to="/dashboard/profile" style={styles.link}>Profile</Link></li>
        <li><Link to="/dashboard/newaccount" style={styles.link}>New Account</Link></li>
        <li><Link to="/dashboard/deposit" style={styles.link}>Deposit</Link></li>
        <li><Link to="/dashboard/withdraw" style={styles.link}>Withdraw</Link></li>
        <li><Link to="/dashboard/transfer" style={styles.link}>Transfer</Link></li>
        <li><Link to="/dashboard/checkbalance" style={styles.link}>Check Balance</Link></li>
        <li><Link to="/dashboard/documents" style={styles.link}>Documents</Link></li>
        {/* <li><Link to="/dashboard/deleteaccount" style={styles.link}>Delete Account</Link></li> */}
        {/* <li>
        <span style={{ ...styles.link, cursor: 'pointer' }} onClick={toggleTransactionsDropdown}>Transaction Summary ▾</span>
          {showTransactionsDropdown && (
            <ul style={{ ...styles.menuList, ...styles.dropdown }}>
              <li><Link to="/dashboard/transactions/last5" style={{...styles.link, color:'grey'}}>Last 5 Transactions</Link></li>
              <li><Link to="/dashboard/transactions/bydate" style={{...styles.link,  color:'grey'}}>On Particular Date</Link></li>
            </ul>
          )}
        </li> */}

        <li><Link to="/logout" style={styles.link} onClick={handleLogoutClick}>Log Out</Link></li>
        {/* <li><Link to="/registration" style={styles.link}>Registration</Link></li> */}
      </ul>
    </div>
  );
}

export default Menu;
