import React, { useState } from 'react';
import { loginUser, createUser } from '../apiServer';

interface FormData {
  username?: string;
  email: string;
  password: string;
  role: 'end-user' | 'tech-support' | 'admin';
}

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', role: 'end-user' });
  const [userType, setUserType] = useState<'end-user' | 'tech-support' | 'admin'>('end-user');
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const createSuccess = await createUser(formData.username || '', formData.email, formData.password, formData.role);
        if (createSuccess) {
          alert('Account created successfully');
          setFormData({ email: '', password: '', role: 'end-user' });
        } else {
          alert('Failed to create account');
        }
      } else {
        const loginSuccess = await loginUser(formData.email, formData.password, userType);
        if (loginSuccess) {
          alert('Login successful');
        } else {
          alert('Login failed');
        }
        setFormData({ email: '', password: '', role: 'end-user' });
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  const switchToSignup = () => {
    setIsSignup(true);
  };

  const switchToLogin = () => {
    setIsSignup(false);
  };

  const handleUserTypeChange = (type: 'end-user' | 'tech-support' | 'admin') => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl mb-4">{isSignup ? 'Create Account' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="select-role">Select Role</option>
                  <option value="end-user">End User</option>
                  <option value="tech-support">Tech Support</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>
        {!isSignup && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <button
              type="button"
              onClick={switchToSignup}
              className="text-sm text-indigo-600 hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </div>
        )}
        {!isSignup && (
          <div className="flex mt-4">
            <button
              onClick={() => handleUserTypeChange('end-user')}
              className={`mr-2 px-4 py-2 rounded-md focus:outline-none ${
                userType === 'end-user' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              End User
            </button>
            <button
              onClick={() => handleUserTypeChange('tech-support')}
              className={`mr-2 px-4 py-2 rounded-md focus:outline-none ${
                userType === 'tech-support' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Tech Support
            </button>
            <button
              onClick={() => handleUserTypeChange('admin')}
              className={`px-4 py-2 rounded-md focus:outline-none ${
                userType === 'admin' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
