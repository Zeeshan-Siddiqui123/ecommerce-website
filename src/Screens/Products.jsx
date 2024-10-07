import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { Spin, message } from 'antd';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center' style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='flex items-center justify-center' style={{ height: '100vh' }}>
        <h2>No products available at the moment.</h2>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1 className='text-center'>Our Products</h1>
      </header>
      <div className='main-banner'>
        <div className='flat-discount'>
          <div className='disc'>
            <h1>Flat 50% off</h1>
            <h3><span>12</span> Hours <span>20</span> Minutes</h3>
          </div>
          <div className='image-women'></div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
        {products.map(product => (
          <Card
            key={product.id}
            id={product.id}
            product={product}
            image={product.image}
            description={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
