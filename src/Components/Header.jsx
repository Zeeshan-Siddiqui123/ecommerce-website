// src/Components/Navbar.jsx
import React, { useContext} from 'react';
import './Components.css';
import { Link } from 'react-router-dom';
import { routes } from '../Routes';
import { FaShopify } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Toggle from './Toggle';
import { UserContext } from '../Screens/UserContext.jsx';
import { CartContext } from '../Screens/CartContext.jsx';

const Navbar = () => {
  // const [user, setUser] = useState(null);
  const { user, handleLogout } = useContext(UserContext);
  const { cart } = useContext(CartContext);


  return (
    <nav className="navbar">
      <div className='main-name'>
        <FaShopify color='red' size='30' />
        <h1>SHOPPER</h1>
      </div>
      <div className='nav-links'>
        {routes.map(({ path, label }, index) => (
          <Link key={index} to={path} className='nav-link'>
            {label}
          </Link>
        ))}
      </div>
      <div className='flex flex-row gap-1'>
        
        <Link to="/cart" className='nav-link-cart'>
          <MdOutlineShoppingCart size='30' />

        </Link>
        ({cart.length})
        {user ? (
          <div className='flex items-center space-x-2'>
            <Link to="/account" className='login-name-btn'>
              <span className='hello'>Hello,</span> {user.name}
            </Link>
            <button onClick={handleLogout} className='login-button'>Logout</button>
          </div>
        ) : (
          <Link to="/account" className='login-button'>
            <b>Log in/Sign Up</b>
          </Link>
        )}
        <div className='toggle-btn'>
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
