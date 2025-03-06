// src/components/MultiPageForm.jsx
import Navbar from '../components/Navbar/Navbar';
import Page1 from '../components/addHotel/Page1';
import Page2 from '../components/addHotel/Page2';
import Page3 from '../components/addHotel/Page3';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';


const AddHotels = () => {
  const [page, setPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      address: '',
      city: '',
      country: '',
      occupation: '',
      company: '',
    }
  });

  const onSubmit = (data:any) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully! Check console for data.');
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  return (
    <div className="w-full min-h-screen flex flex-col">
            <Navbar show={false} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="flex-grow h-full mt-32 mb-32">
          {page === 1 && <Page1 register={register} errors={errors} />}
          {page === 2 && <Page2 register={register} errors={errors} />}
          {page === 3 && <Page3 register={register} errors={errors} />}
        </div>

        <div className="fixed bottom-0 left-0 w-full px-2 z-10 bg-neutral-100  ">
          <div className="flex justify-between items-center px-6 py-4 ">
            <div className="text-gray-600">
              Page {page} of 3
            </div>
            <div className="flex space-x-4">
              {page > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="py-2 px-4 cursor-pointer bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Previous
                </button>
              )}
              {page < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="py-2 px-4 bg-teal-600 cursor-pointer text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Next
                </button>
              )}
              {page === 3 && (
                <button
                  type="submit"
                  className="py-2 px-4 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotels;
