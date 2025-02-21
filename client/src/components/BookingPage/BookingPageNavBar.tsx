
import React from 'react'

import MainLogo from "../../assets/images/MainLogo.png";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';
import UserMenu from '../Navbar/UserMenu';
import { useNavigate } from 'react-router-dom';

function BookingPageNavbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white   sticky   top-0 z-50 shadow-zink-900 shadow-xl ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 " >
      <p className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" onClick={()=>navigate("/home")}>
      <img
              className="rounded-full  md:block cursor-pointer h-12 md:h-12"
             
              src={MainLogo}
              alt="Main Logo"
            />
        {/* <FaHotel className="text-4xl text-teal-600" /> */}
        <span className="self-center text-xl font-semibold whitespace-nowrap text-teal-500 ">
          RapidRoom
        </span>
      </p>
      <div className="flex items-center md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
        
        <UserMenu showRapidYourRoom={true}></UserMenu>
      </div>
    </div>
  </nav>
  );
}

export default BookingPageNavbar;



interface MenuItemsPropes{
    onClick:() => void;
    label:string;
}
const MenuItem :React.FC<MenuItemsPropes> = ({
    onClick,
    label
    }) =>{
    return(
        <div onClick={onClick} className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                {label}
        </div>
    )
}






// function UserMenu() {
//     const [isOpen,setIsOpen] = useState(false);
//     const controlSetIsOpen = () =>{
//       // setIsOpen(isOpen =>!isOpen);
//     }
//     const navigate = useNavigate();
//     return (
//       <div className='relative sm:block '
//       // onClick={()=>navigate("/home")}
//       >
//         <div className='flex flex-row items-center gap-3'>
//           <div onClick={()=>{}} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer '>
//       Rapid Your Room
//           </div>
//           <div onClick={controlSetIsOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
//                 <AiOutlineMenu/>
//                 <div className="hidden md:block">
//                   <Avatar/>
//                 </div>
//           </div>
  
//         </div>
//         {
//           isOpen && (
//             <div className='absolute rouned-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-12'>
//                 <div className='flex flex-col cursor-pointer'>
//             <>
//               <MenuItem onClick={()=>{}} label='Signup'/>
//               <MenuItem onClick={()=>{}} label='Login'/>
//             </>
//                 </div>
//             </div>
//           )
//         }
  
//       </div>
//     )
//   }
