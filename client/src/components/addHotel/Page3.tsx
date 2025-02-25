// src/components/Page3.jsx
import React from 'react';

const Page3 = ({ register, errors }:{ register:any, errors:any }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Professional Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          {...register('age', { 
            required: 'Age is required',
            min: { value: 18, message: 'Must be at least 18' }
          })}
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Occupation</label>
        <input
          {...register('occupation', { required: 'Occupation is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          {...register('company', { required: 'Company is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
      </div>
    </div>
  );
};

export default Page3;


