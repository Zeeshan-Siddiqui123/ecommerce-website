import React, { useState } from 'react';
import { Modal } from 'antd';


const Contact = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [otherCountry, setOtherCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    const formData = new FormData(e.target);

    
    if (selectedCountry === 'others') {
      formData.set('country', otherCountry);
    }

    try {
      const response = await fetch('https://formspree.io/f/mwpkebda', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
       
        setIsModalVisible(true);
        e.target.reset(); 
        setSelectedCountry(''); 
        setOtherCountry(''); 
      } else {
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false); 
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    
    if (e.target.value !== 'others') {
      setOtherCountry('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 mt-16">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Contact Me</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* User Name */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="off"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select your country</option>
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="pakistan">Pakistan</option>
              <option value="usa">USA</option>
              <option value="others">Others</option>
            </select>
          </div>

          
          {selectedCountry === 'others' && (
            <div>
              <label htmlFor="otherCountry" className="block text-sm font-medium text-gray-700">
                Please Specify Your Country
              </label>
              <input
                type="text"
                id="otherCountry"
                name="otherCountry"
                placeholder="Enter your country"
                required={selectedCountry === 'others'}
                value={otherCountry}
                onChange={(e) => setOtherCountry(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Subject */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message here..."
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        
        <Modal
          title="Submission Successful"
          visible={isModalVisible}
          onOk={handleOk}
          cancelButtonProps={{ style: { display: 'none' } }} 
          okText="OK"
        >
          <p>Your query has been submitted. Thank you for contacting us!</p>
        </Modal>
      </div>
    </div>
  );
};

export default Contact;
