import React from "react";

function Slide3() {
  return (
    <div className="flex w-screen h-full justify-center">
      <div className="elements md:w-[700px] pt-8 md:p-12 p-1.5">
        <div className="py-5">
          <h1 className="text-3xl ">Upload some images</h1>
          <p>upload some aesthetics images of your rooms</p>
        </div>
        <div className="uploaded-images p-2 md:overflow-hidden overflow-scroll h-90 rounded-xl w-full border flex flex-wrap object-cover">
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg"
            alt="demo Image 1"
            className="grow md:w-1/3  p-1  rounded-xl  "
          />
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg"
            alt="demo Image 1"
            className="grow md:w-1/3  p-1  rounded-xl"
          />
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg"
            alt="demo Image 1"
            className="grow md:w-1/3  p-1  rounded-xl"
          />
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg"
            alt="demo Image 1"
            className="grow md:w-1/3  p-1  rounded-xl"
          />
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg"
            alt="demo Image 1"
            className="grow md:w-1/3  p-1 rounded-xl "
          />
         
        </div>
        
        <div className="flex items-center justify-center w-full py-5 pb-20">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Slide3;
