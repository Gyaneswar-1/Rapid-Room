export const Card = ({data}:any) => {
  console.log();

    return (
      <div className="">
        <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
    <img
      alt={data.images[0].imageUrl}
      src={data.images[0].imageUrl}
      className="h-56 w-full rounded-md object-cover"
    />
  
    <div className="mt-2">
      <dl>
        <div>
          <dt className="sr-only">Price</dt>
  
          <dd className="text-sm text-gray-500">{data.perNight}₹</dd>
        </div>
  
        <div>
          <dt className="sr-only">{data.address.country}</dt>
  
          <dd className="font-medium">{data.address.country}</dd>
        </div>
      </dl>
  
      <div className="mt-6 flex items-center gap-8 text-xs">
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <svg
            className="size-4 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>
  
          <div className="mt-1.5 sm:mt-0">
            <p className="text-gray-500">Parking</p>
  
            <p className="font-medium">2 spaces</p>
          </div>
        </div>
  
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <svg
            className="size-4 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
  
          <div className="mt-1.5 sm:mt-0">
            <p className="text-gray-500">Bathroom</p>
  
            <p className="font-medium">2 rooms</p>
          </div>
        </div>
  
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <svg
            className="size-4 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
  
          <div className="mt-1.5 sm:mt-0">
            <p className="text-gray-500">Bedroom</p>
  
            <p className="font-medium">4 rooms</p>
          </div>
        </div>
      </div>
    </div>
  </a>
      </div>
    );
  };
  
  
  // <div id="indicators-carousel" className="relative w-full" data-carousel="static">
  //     <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
  //         <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
  //             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/800px-Sunflower_sky_backdrop.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
  //         </div>
  //         <div className="hidden duration-700 ease-in-out" data-carousel-item>
  //             <img src="https://m.media-amazon.com/images/I/51PvAAOoKML._AC_UF1000,1000_QL80_.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
  //         </div>
  //         <div className="hidden duration-700 ease-in-out" data-carousel-item>
  //             <img src="https://images.meesho.com/images/products/258344965/7op7u_512.webp" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
  //         </div>
  //         <div className="hidden duration-700 ease-in-out" data-carousel-item>
  //             <img src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/Picture-of-Daisy-Flower_0_1200.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
  //         </div>
  //         <div className="hidden duration-700 ease-in-out" data-carousel-item>
  //             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3DWeRpTymRb5R4NsGiaOFMBZLpCRfFR8QxQ&s" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
  //         </div>
  //     </div>
  //     <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
  //         <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
  //         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
  //         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
  //         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
  //         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
  //     </div>
  //     <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
  //         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
  //             <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
  //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
  //             </svg>
  //             <span className="sr-only">Previous</span>
  //         </span>
  //     </button>
  //     <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
  //         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
  //             <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
  //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
  //             </svg>
  //             <span className="sr-only">Next</span>
  //         </span>
  //     </button>
  // </div>