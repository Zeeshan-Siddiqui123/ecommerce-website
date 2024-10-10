import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { Pagination, Spin, message, Select } from 'antd';

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on selected option
  const sortProducts = (productsToSort) => {
    if (sortOption === 'priceAsc') {
      return [...productsToSort].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'priceDesc') {
      return [...productsToSort].sort((a, b) => b.price - a.price);
    }
    if (sortOption === 'nameAsc') {
      return [...productsToSort].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortOption === 'nameDesc') {
      return [...productsToSort].sort((a, b) => b.title.localeCompare(a.title));
    }
    return productsToSort; // Default order (no sorting)
  };

  // Apply both filter and sorting
  const getProcessedProducts = () => {
    let processedProducts = products;

    // Apply filtering
    if (selectedCategory !== 'all') {
      processedProducts = products.filter((product) => product.category === selectedCategory);
    }

    // Apply sorting
    processedProducts = sortProducts(processedProducts);

    return processedProducts;
  };

  const processedProducts = getProcessedProducts();

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = processedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination change handler
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  // Handle category filter change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle sorting change
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center' style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );
  }

  if (processedProducts.length === 0) {
    return (
      <div className='flex items-center justify-center' style={{ height: '100vh' }}>
        <h2>No products available for the selected filter.</h2>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1 className='text-center'>Our Products</h1>
      </header>
      
      {/* Filter and Sort Controls */}
      <div className='flex items-center justify-center mt-4 gap-4'>
        {/* Category Filter */}
        <Select defaultValue="all" style={{ width: 200 }} onChange={handleCategoryChange}>
          <Option value="all">All Categories</Option>
          <Option value="electronics">Electronics</Option>
          <Option value="jewelery">Jewelery</Option>
          <Option value="men's clothing">Men's Clothing</Option>
          <Option value="women's clothing">Women's Clothing</Option>
        </Select>

        {/* Sorting Options */}
        <Select defaultValue="default" style={{ width: 200 }} onChange={handleSortChange}>
          <Option value="default">Default</Option>
          <Option value="priceAsc">Price: Low to High</Option>
          <Option value="priceDesc">Price: High to Low</Option>
          <Option value="nameAsc">Name: A to Z</Option>
          <Option value="nameDesc">Name: Z to A</Option>
        </Select>
      </div>

      {/* Product List */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
        {currentProducts.map(product => (
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

      {/* Pagination */}
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
