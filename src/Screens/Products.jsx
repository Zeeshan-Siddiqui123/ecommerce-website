import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { Pagination, Spin, message, Select } from 'antd';

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const pageSize = 5;

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

  
  const sortProducts = (productsToSort) => {
    switch (sortOption) {
      case 'priceAsc':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'nameAsc':
        return [...productsToSort].sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return [...productsToSort].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return productsToSort; 
    }
  };

  
  const getProcessedProducts = () => {
    let processedProducts = products;


    if (selectedCategory !== 'all') {
      processedProducts = products.filter((product) => product.category === selectedCategory);
    }

  
    return sortProducts(processedProducts);
  };

  const processedProducts = getProcessedProducts();

  
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = processedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); 
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1); 
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center' style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );
  }

  

  return (
    <div>
      <header>
        <h1 className='text-center'>Our Products</h1>
      </header>

      
      <div className='flex items-center justify-center mt-4 gap-4'>
      
        <Select defaultValue="all" style={{ width: 200 }} onChange={handleCategoryChange}>
          <Option value="all">All Categories</Option>
          <Option value="electronics">Electronics</Option>
          <Option value="jewelery">Jewelery</Option>
          <Option value="men's clothing">Men's Clothing</Option>
          <Option value="women's clothing">Women's Clothing</Option>
        
        </Select>

      
        <Select defaultValue="default" style={{ width: 200 }} onChange={handleSortChange}>
          <Option value="default">Default</Option>
          <Option value="priceAsc">Price: Low to High</Option>
          <Option value="priceDesc">Price: High to Low</Option>
          <Option value="nameAsc">Name: A to Z</Option>
          <Option value="nameDesc">Name: Z to A</Option>
        </Select>
      </div>

      
      <div className='flex items-center justify-center gap-8 flex-wrap mt-8'>
        {currentProducts.map((product) => (
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

      
      <div className='flex items-center justify-center mt-6 mb-6'>
        <Pagination
          current={currentPage}
          total={processedProducts.length}
          pageSize={pageSize}
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

export default Products;
