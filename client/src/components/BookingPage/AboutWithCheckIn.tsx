import {AboutHeading, AboutThisPlace, CheckInCard, Feature, HostCard, WhatThisPlaceOffer} from "./AboutWithCheckInSubComponents/exportAboutWithCheckInSubComponents"

type aboutWithCheckOut = {
  country: string,
  state: string,
  roomType: string,
  overalRating: number,
  totalReviews: number,
  hostImage: string,
  hostName: string,
  hostExperienceYear: number
  aboutThisPlace: string
  perNight: number,
  cleaningFee: number,
  numberOfGuests: number 
}
export default function AboutWithCheckout({country,state,roomType,overalRating,totalReviews,hostImage,hostName,hostExperienceYear, aboutThisPlace, perNight, cleaningFee, numberOfGuests}:aboutWithCheckOut) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 pt-8">
      <div className="  lg:col-span-2 ">
      <AboutHeading country={country} state={state} roomType={roomType} overalRating={overalRating} totalReviews={totalReviews}></AboutHeading>
        <HostCard hostImage={hostImage} hostName={hostName} hostExperienceYear={hostExperienceYear} ></HostCard>
        <Feature></Feature>
        <AboutThisPlace aboutThisPlace={aboutThisPlace} ></AboutThisPlace>
        <WhatThisPlaceOffer></WhatThisPlaceOffer>
      </div>
      <div className=" relative ">
        <CheckInCard perNight={perNight} cleaningFee={cleaningFee} numberOfGuests={numberOfGuests} ></CheckInCard>
      </div>
    </div>
  );
}


// function AboutHeading({country,state,roomType,overalRating,totalReviews}:any){
//   return (
//     <div className="Name flex flex-col gap-1 border-b border-b-gray-300 pb-8">
//           <div className="name font-semibold text-2xl tracking-wide">
//             {`Room in ${country}, ${state}`}
//           </div>
//           <div className="type tracking-wide font-medium text-lg ">
//             {roomType}
//           </div>
//           <div className="rating flex items-center gap-1 font-semibold tracking-wide">
//             <FaStar />
//             {overalRating} <span className="underline"> {`${totalReviews} reviews`}</span>
//           </div>
//         </div>
//   )
// }

// function HostCard({hostImage,hostName,hostExperienceYear}:any){
//   return(
//     <div className="owner py-8 border-b border-b-gray-300 flex flex-col gap-6 pl-">
//           <div className="flex items-center">
//             <div className="shrink-0">
//               <img
//                 className="w-14 h-14 rounded-full"
//                 src={hostImage?hostImage:"https://a0.muscache.com/im/pictures/user/e349f69e-6f7f-4a69-98ef-391baafed14a.jpg?im_w=240&im_format=avif"}
//                 alt="Neil image"
//               />
//             </div>
//             <div className="flex-1 min-w-0 ms-4">
//               <p className="text-lg font-medium  truncate ">{`Hosted by ${hostName}`}</p>
//               <p className="text-lg  font-thin  truncat">
//                 {`Superhost ${hostExperienceYear} years hosting`}
//               </p>
//             </div>
//           </div>
//         </div>
//   )
// }

// function Feature(){
//   return(
//     <div className="feture md:py-8 border-b border-b-gray-300 flex flex-col gap-8">
//           <div className="flex items-center">
//             <div className="shrink-0">
//               <IoBedOutline className="h-6 w-6" />
//             </div>
//             <div className="flex-1 min-w-0 ms-4">
//               <p className="text-lg font-medium  truncate ">
//                 Room in a guest suite
//               </p>
//               <p className="text-lg  font-thin  truncat">
//                 Your own room in a home, plus access to shared spaces.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <div className="shrink-0">
//               <FaKey className="h-6 w-6" />
//             </div>
//             <div className="flex-1 min-w-0 ms-4">
//               <p className="text-lg font-medium  truncate ">
//                 Exceptional check-in experience
//               </p>
//               <p className="text-lg  font-thin  truncat">
//                 Recent guests gave the check-in process a 5-star rating.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <div className="shrink-0">
//               <FaPersonBreastfeeding className="h-6 w-6" />
//             </div>
//             <div className="flex-1 min-w-0 ms-4">
//               <p className="text-lg font-medium  truncate ">
//                 Alexey is a Superhost
//               </p>
//               <p className="text-lg  font-thin  truncat">
//                 Superhosts are experienced, highly rated Hosts.
//               </p>
//             </div>
//           </div>
//         </div>
//   )
// }

// function AboutThisPlace({about}:any){
//   return(
//     <div className="about md:py-8 border-b border-b-gray-300 flex flex-col gap-4">
//           <h1 className="font-semibold text-2xl tracking-wide">
//             About this place
//           </h1>
//           <p className="text-lg font-thin tracking-wide">
//             {about}
//           </p>
//         </div>
//   )
// }

// function WhatThisPlaceOffer(){
//   return(
//     <div className="offer md:py-8 flex flex-col gap-4  ">
//           <h1 className="font-semibold text-2xl tracking-wide">
//             What this place offers
//           </h1>
//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
//             <div className=" rounded-lg ">
//               <ul className="flex flex-col gap-4">
//                 <li className="flex items-center gap-4 text-lg font-thin">
//                   <IoLockClosedOutline className="text-2xl" />
//                   Lock on bedroom door
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <IoWifiOutline className="h-6 w-6" />
//                   Wifi
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <FaTv className="h-6 w-6" />
//                   TV with internet
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <GiGreenhouse className="h-6 w-6" />
//                   Patio or balcony
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <BsHandbag className="h-6 w-6" />
//                   Luggage drop-off allowed
//                 </li>
//               </ul>
//             </div>
//             <div className=" rounded-lg ">
//               <ul className="flex flex-col gap-4">
//                 <li className="flex items-center gap-4 text-lg font-thin">
//                   <MdOutlineFoodBank className="text-2xl" />
//                   Kitchen
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <MdOutlineBathtub className="h-6 w-6" />
//                   Dedicated workspace
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <LuWashingMachine className="h-6 w-6" />
//                   Washing machine
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <LuFlower2 className="h-6 w-6" />
//                   Garden
//                 </li>
//                 <li className="flex gap-4 text-lg font-thin">
//                   <PiHairDryerThin className="h-6 w-6" />
//                   Hair dryer
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//   )
// }

// function CheckInCard(){
//   return(
//     <div className="card sticky md:top-32 rounded-xl flex flex-col gap-4 w-full h-max shadow-2xl p-4">
//           <div className="price text-2xl font-semibold tracking-wide">
//             ₹30000 night
//           </div>
//           <div className="checkinout w-full flex flex-col border rounded-xl">
//             <div className="date flex  border-b ">
//               <div className="checkin w-1/2 flex flex-col border-r py-2 text-sm font-semibold px-2 border border-transparent focus-within:border-black rounded-tl-lg">
//                 <label>Check in</label>
//                 <input
//                   type="date"
//                   className="font-thin outline-none"
//                   defaultValue={new Date().toISOString().split("T")[0]}
//                 />
//               </div>
//               <div className="checkout w-1/2 py-2 flex flex-col text-sm font-semibold px-2 border border-transparent focus-within:border-black rounded-tr-lg ">
//                 <label>Check out</label>
//                 <input type="date" className="font-thin outline-none" />
//               </div>
//             </div>
//             <div className="syay py-2 px-2 flex flex-col text-sm font-semibold border border-transparent focus-within:border-black rounded-bl-lg rounded-br-lg">
//               <label>Guests</label>
//               <input
//                 type="number"
//                 className="outline-none font-thin"
//                 placeholder="1 guest"
//               />
//             </div>
//           </div>
//           <button className="bg-teal-500 hover:bg-teal-600 duration-150 py-4 text-xl font-semibold text-white rounded-xl">
//             Reserve
//           </button>
//           <div className="calculate border-b py-4">
//             <ul className="flex flex-col gap-4">
//               <li className="flex items-center justify-between px-2">
//                 <div className="left underline">₹1000 x 2</div>
//                 <div className="right">₹2000</div>
//               </li>
//               <li className="flex items-center justify-between px-2">
//                 <div className="left underline">Cleaning fee</div>
//                 <div className="right">₹300</div>
//               </li>
//               <li className="flex items-center justify-between px-2">
//                 <div className="left underline">Rapid book fee</div>
//                 <div className="right">₹200</div>
//               </li>
//             </ul>
//           </div>
//           <div className="totalfee px-3">
//             <div className="flex items-center justify-between">
//               <div className="left underline">Total</div>
//               <div className="right">₹2500</div>
//             </div>
//           </div>
//         </div>
//   )
// }