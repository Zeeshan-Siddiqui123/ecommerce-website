// src/Screens/Login.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import 'antd/dist/reset.css'; // Ensure Ant Design styles are imported
import { UserContext } from '../Screens/UserContext';

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  // Consume the UserContext
  const { handleLogin } = useContext(UserContext);

  // Handle Input Change:
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form validation and Submission:
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation:
    if (!formData.email || !formData.password || (currState === 'Sign Up' && !formData.name)) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (currState === "Sign Up" && !agree) {
      setError("You must agree to the terms and privacy policy");
      return;
    }

    setError("");

    if (currState === "Sign Up") {
      handleLogin(formData); // Update global user state
      setModalMessage("Account Created Successfully");
      setModalVisible(true);
      setFormData({ name: '', email: '', password: '' }); // Clear form inputs
      setAgree(false); // Reset agreement checkbox
      navigate('/'); // Redirect to home after signup
    }

    if (currState === "Login") {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        handleLogin(storedUser); // Update global user state
        setModalMessage("Login Successful");
        setModalVisible(true);
        setFormData({ name: '', email: '', password: '' }); // Clear form inputs
        navigate('/'); // Redirect to home after login
      } else {
        setError("Invalid email or password");
        return;
      }
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    // Optionally, you can navigate to another page or reset form here
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">{currState}</h1>
          <div className="space-y-4">
            {currState === 'Sign Up' && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <button 
            type="submit" 
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {currState === "Sign Up" ? "Create Account" : "Continue"}
          </button>

          <div className="text-center mt-4">
            {currState === 'Login' ? (
              <>
                <p className="text-sm">Don't have an account?</p>
                <Link 
                  to="/" 
                  onClick={() => setCurrState("Sign Up")} 
                  className="text-blue-500 cursor-pointer underline"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm">Already have an account?</p>
                <Link 
                  to="/account" 
                  onClick={() => setCurrState("Login")} 
                  className="text-blue-500 cursor-pointer underline"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {currState === 'Sign Up' && (
            <div className="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agree}
                onChange={() => setAgree(!agree)} 
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree" className="text-sm">
                I agree to the <Link to="/terms" className="text-blue-500 underline">terms of use</Link> & <Link to="/privacy" className="text-blue-500 underline">privacy policy</Link>
              </label>
            </div>
          )}
        </form>
      </div>

      <Modal
        title="Notification"
        open={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default Login;
