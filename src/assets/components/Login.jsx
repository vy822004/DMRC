import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost/DMRC/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Login API response:", result);
        localStorage.setItem('UserId', result.UserId);
localStorage.setItem('role', result.role);

console.log("Saved to localStorage", {
  userId: localStorage.getItem("UserId"),
  role: localStorage.getItem("role"),
});
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/'; // Change as needed
        }, 2000);
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url('/Metrobg.JPG')` }}
    >
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Vendor Login</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Sign in to access your DMRC dashboard
        </p>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
          Don't have an account?{' '}
          <Link to="/signup" className="text-red-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
