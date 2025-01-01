import React, { useContext } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CartContext } from '../Screens/CartContext';
import StarRating from './StarRating'; // Import StarRating if you wish to show the rating

const Card = (props) => {
  const { id, image, description, price, product, rating } = props; // Ensure 'rating' is passed down if available
  const { addToCart } = useContext(CartContext);

  return (
    <div className='max-w-xs rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105'>
      <div className='relative'>
        <div 
          style={{ 
            width: "300px", 
            height: "250px", 
            backgroundImage: `url(${image})`, 
            backgroundPosition: "center", 
            backgroundSize: "cover" 
          }} 
          className='transition-transform duration-300 hover:scale-110'
        ></div>
      </div>
      <div className='p-4'>
        <div className='w-[270px] h-[75px]'><h2 className='font-bold text-sm mb-2'>{description}</h2></div>
        {product.rating && (
        
            
            <StarRating rating={product.rating.rate} /> 
            
          
        )}
        <div className='flex justify-between items-center mt-2'>
          <span className='text-xl font-semibold'>{price}$</span>
          <button 
            className='bg-yellow-500 rounded-full p-2 transition duration-300 hover:bg-yellow-600' 
            onClick={() => addToCart(product)}
          >
            <MdOutlineShoppingCart size='24' color='white' />
          </button>
        </div>
        <div className='mt-4'>
          <Link to={`/product/${id}`} className='w-full'>
            <button className='bg-black text-white p-2 w-full rounded-lg hover:bg-gray-800 transition duration-300'>
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
