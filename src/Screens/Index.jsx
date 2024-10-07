import React from 'react';
import './Screen.css';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <div className='main'>
        <div className='text-content'>
          <h6 className='new-arrivals'>New Arrivals Only</h6>
          <h1 className='collection-title'>
            new 
            <br />collections for <br />everyone  
          </h1>
          <button className='btn-collection'>
            <Link to='shopitems' style={{ textDecoration: "none", color: "white" }}>Latest Collection</Link>
          </button>
        </div>
        <div className='img-men'></div>
      </div>
      
    </div>
  );
};

export default Index;
