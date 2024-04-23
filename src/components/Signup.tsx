import React, { useState } from "react";
import { createUser } from "../apiServer";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    type: "end-user", // Default to "end-user" type
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!["end-user", "tech-support", "admin"].includes(formData.type)) {
        formData.type = "end-user"; // Set default type if not valid
      }
      const createSuccess = await createUser(
        formData.username || "",
        formData.email,
        formData.password,
        formData.type
      );
      if (createSuccess) {
        alert("Account created successfully");
        setFormData({ username: "", email: "", password: "", type: "end-user" }); // Reset form data
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
              placeholder="Enter your username"
            />
          </div>
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
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
            >
              <option value="end-user">End User</option>
              <option value="tech-support">Tech Support</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <a
            href="/"
            className="text-indigo-500 hover:text-indigo-700 font-bold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
