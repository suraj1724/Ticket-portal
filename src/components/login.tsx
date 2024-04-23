import React, { useState } from 'react';
import { checkUserExists, loginUser } from '../apiServer';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState<'end-user' | 'tech-support' | 'admin'>('end-user');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userExists = await checkUserExists(formData.email, formData.password, userType);
      if (userExists) {
        const loginSuccess = await loginUser(formData.email, formData.password, userType);
        localStorage.setItem('loggedInUser', JSON.stringify({ email: formData.email, userType }));
        if (loginSuccess) {
          alert('Login successful');
          switch (userType) {
            case 'end-user':
            case 'tech-support':
            case 'admin':
              navigate('/dashboard');
              break;
            default:
              navigate('/');
              break;
          }
        } else {
          alert('Login failed');
        }
      } else {
        alert('Login failed: Email, password, or user type did not match');
      }
      setFormData({ email: '', password: '' });
    } catch (error) {
      alert('An error occurred');
    }
  };

  
  const handleUserTypeChange = (type: 'end-user' | 'tech-support' | 'admin') => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Type:
            </label>
            <select
              value={userType}
              onChange={(e) =>
                handleUserTypeChange(e.target.value as 'end-user' | 'tech-support' | 'admin')
              }
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
            >
              <option value="end-user">End User</option>
              <option value="tech-support">Tech Support</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-500 hover:text-indigo-700 font-bold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
