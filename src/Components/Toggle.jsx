import React, { useContext, useState } from 'react';
import './components.css';
import {  Button, Drawer } from 'antd';
import { CiMenuFries } from 'react-icons/ci';
import { routes } from '../Routes';
import { Link } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import { UserContext } from '../Screens/UserContext.jsx'; // Ensure correct import path


const Toggle = ({setShowLogin}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] =useState(true);
  // const [user, setUser] = useState(null);
  const { user, handleLogout } = useContext(UserContext);


  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <button onClick={showLoading}>
      <CiMenuFries size='30' color='red' />
      </button>
      <Drawer
        closable
        destroyOnClose
        title={<div className='footer-name flex items-start gap-0'>
            <FaShopify color='red' size='30' />
            <h2 className='text-xl font-bold ml-2'>SHOPPER</h2>
          </div>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <Button type="primary" style={{ marginBottom: 16 , backgroundColor:"red", display:"flex", alignItems:"center", justifyContent:"center"}} onClick={showLoading}>
          Reload
        </Button>
        <div className='nav-links'>
        {routes.map(({ path, label }, index) => (
          <Link key={index} to={path} className='nav-linkss'>
            {label}
          </Link>
          
        ))}
        {
          user ? (
            <div className='flex items-center space-x-2'>
              
              <button onClick={handleLogout} className='login-btn'>Logout</button>
            </div>
          ) : (
            <button className='login-btn' onClick={() => setShowLogin(true)}><b><Link to="/account">Log in /Sign Up</Link></b></button>
          )
        }
      </div>
      </Drawer>
    </>
  );
};

export default Toggle;