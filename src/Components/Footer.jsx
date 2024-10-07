import React, { useState } from 'react';
import { FaShopify, FaInstagram, FaWhatsapp, FaPinterest } from 'react-icons/fa';
import { Modal } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design CSS

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSuccesClick = (e) => {
    e.preventDefault();


    if (email.trim() === '') {
      setModalMessage('Please enter your email ID');
    } else {
      setModalMessage('Your subscription has been added!');
    }


    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (modalMessage === 'Your subscription has been added!') {
      setEmail('');
    }
  };

  return (
    <div className='bg-gray-800 text-white p-8'>
      <div className='container mx-auto'>

        <div className='subscription text-center mb-8'>
          <h1 className='text-2xl font-bold'>Get Exclusive Offers On Your Email</h1>
          <h6 className='text-gray-400 mb-4'>Subscribe to our newsletter and stay updated</h6>
          <div className='flex justify-center'>
            <form className='flex flex-wrap items-center justify-center form' onSubmit={handleSuccesClick}>
              <input
                type="email"
                placeholder='Your email ID'
                className='footer-input px-4 py-2 rounded-full border-none '
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className='bg-yellow-500 text-black rounded-full text-center px-4 py-2 hover:bg-yellow-600 transition duration-300 subscribe'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>


        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='footer-name flex items-center mb-4 md:mb-0'>
            <FaShopify color='red' size='40' />
            <h1 className='text-xl font-bold ml-2'>SHOPPER</h1>
          </div>
          <div className='text-center md:text-left mb-4 md:mb-0 flex gap-2'>
            <p>Company</p>
            <p>Offices</p>
            <p>Product</p>
            <p>About</p>
            <p>Contact</p>
          </div>
          <div className='flex space-x-4 mb-4 md:mb-0'>
            <FaInstagram size='30' />
            <FaPinterest size='30' />
            <FaWhatsapp size='30' />
          </div>
        </div>


        <div className='text-center mt-8'>
          <h6 className='text-gray-400'>Copyright @ 2024 | All Rights Reserved</h6>
        </div>


        <Modal
          title="Subscription Status"
          visible={isModalVisible}
          onOk={handleOk}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>{modalMessage}</p>
        </Modal>
      </div>
    </div>
  );
};

export default Footer;
