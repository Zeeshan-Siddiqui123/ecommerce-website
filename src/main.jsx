
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './Screens/CartContext.jsx';
import UserProvider from './Screens/UserContext.jsx';
// import { UserProvider } from './Screens/UserContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>
);
