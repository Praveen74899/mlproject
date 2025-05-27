import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function submitHandler(e) {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (state === 'register') {
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === email) {
        alert("Email already exists. Please use a different email.");
        return;
      }



      if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.');
        return;
      }


      // Save user data
      const userData = { name, email, password };
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Account created successfully! Please login.');
      setState('login');
      return;
    }

    if (state === 'login') {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser) {
        alert('No user found. Please register first.');
        return;
      }

      if (storedUser.email !== email) {
        alert('Email does not match our records.');
        return;
      }

      if (storedUser.password !== password) {
        alert('Password is incorrect.');
        return;
      }

      toast.success("Login successful!");
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">
          User {state === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {state === 'register' && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        >
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>

        <p className="mt-4 text-center text-sm">
          {state === 'register' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('login')}
                className="text-indigo-500 cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setState('register')}
                className="text-indigo-500 cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
