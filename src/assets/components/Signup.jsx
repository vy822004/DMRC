import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const registrationData = {
        email: data.email,
        password: data.password,
        contactPerson: data.contactPerson,
        companyName: data.companyName,
        phone: data.mobile,
        pan: data.pan,
        gstin: data.gstin,
        legalStructure: data.legalStructure,
        address: data.address
      };

      const response = await fetch('http://localhost/DMRC/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('UserId', result.UserId);
        localStorage.setItem('role', result.role);

        setSuccess('Registration successful! You can now login.');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url('/Metrobg.JPG')` }}
    >
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">DMRC Vendor Registration</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Register as a new vendor for Delhi Metro Rail Corporation
        </p>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit(handleRegistration)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Company Name *</label>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              {...register('companyName', {
                required: 'Company name is required',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
            />
            {errors.companyName && <p className="text-sm text-red-600 mt-1">{errors.companyName.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Contact Person *</label>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              {...register('contactPerson', { required: 'Contact person is required' })}
            />
            {errors.contactPerson && <p className="text-sm text-red-600 mt-1">{errors.contactPerson.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email *</label>
            <input
              type="email"
              className="border border-gray-300 rounded px-3 py-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Mobile Number *</label>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              {...register('mobile', {
                required: 'Mobile number is required',
                minLength: { value: 10, message: 'At least 10 digits' }
              })}
            />
            {errors.mobile && <p className="text-sm text-red-600 mt-1">{errors.mobile.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">PAN Number *</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 uppercase"
              {...register('pan', {
                required: 'PAN is required',
                minLength: { value: 10, message: 'PAN must be 10 characters' },
                maxLength: { value: 10, message: 'PAN must be 10 characters' }
              })}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                setValue('pan', e.target.value);
              }}
            />
            {errors.pan && <p className="text-sm text-red-600 mt-1">{errors.pan.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">GSTIN *</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 uppercase"
              {...register('gstin', {
                required: 'GSTIN is required',
                minLength: { value: 15, message: 'GSTIN must be 15 characters' },
                maxLength: { value: 15, message: 'GSTIN must be 15 characters' }
              })}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                setValue('gstin', e.target.value);
              }}
            />
            {errors.gstin && <p className="text-sm text-red-600 mt-1">{errors.gstin.message}</p>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium">Legal Structure *</label>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              {...register('legalStructure', { required: 'Please select legal structure' })}
            >
              <option value="">Select legal structure</option>
              <option value="sole-proprietorship">Sole Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="llp">LLP</option>
              <option value="private-limited">Private Limited Company</option>
              <option value="public-limited">Public Limited Company</option>
              <option value="others">Others</option>
            </select>
            {errors.legalStructure && <p className="text-sm text-red-600 mt-1">{errors.legalStructure.message}</p>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium">Company Address *</label>
            <textarea
              className="border border-gray-300 rounded px-3 py-2 min-h-[80px]"
              {...register('address', {
                required: 'Address is required',
                minLength: { value: 10, message: 'At least 10 characters' }
              })}
            />
            {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password *</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' }
              })}
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Confirm Password *</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                minLength: { value: 8, message: 'At least 8 characters' }
              })}
            />
            {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
