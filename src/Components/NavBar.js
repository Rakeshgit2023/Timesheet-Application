import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useMsal } from "@azure/msal-react"; 
import Cookies from "js-cookie";
const NavBar = () => {
  const nav=useNavigate();
  const {instance}=useMsal();
  // State to manage dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
 
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  // User name
  const [username,setUsername] = useState('');
  const handelLogOut=(instance)=>{
    const logoutRequest = {
      account: instance.getAccountByHomeId('/role'),
      postLogoutRedirectUri: "/",
    };
    instance.logoutRedirect(logoutRequest);
  }
  useEffect(()=>{
    let data=sessionStorage.getItem('66e5957c-a38f-4d6e-bcc6-6da399a71f6f.06191626-9f52-42fe-8889-97d24d7a6e95-login.windows.net-06191626-9f52-42fe-8889-97d24d7a6e95')
    let userData=JSON.parse(data)
    data!==null ? setUsername(userData.name) : nav('/')
  },[])
 
 
  return (
    <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 w-full fixed top-0 z-50">
      <div className="h-10vh flex justify-between text-white lg:py-3 px-5 py-3 ">
        <div className="flex items-center flex-1">
          <span className="text-xl lg:text-2xl align-bottom ml-6 whitespace-nowrap">
            Pursuit Software
          </span>
        </div>
        <div className="flex items-center text-white gap-2 mr-10">
          <div className="flex justify-center items-center">
          <span className=" lg:text-lg ml-2 invisible lg:visible sm:visible md:visible">{username}</span>
          <RiArrowDropDownLine className="size-8 invisible lg:visible sm:visible md:visible cursor-pointer" onClick={toggleDropdown} />
          </div>
          <div className="relative">
            {/* User icon */}
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex justify-center items-center " onClick={toggleDropdown}>
            <FaUser className="text-slate-600 text-xl cursor-pointer"/>
            </div>
            {/* User dropdown */}
            {showDropdown && (
              <div className="bg-white  rounded-xl  shadow-lg absolute p-4 w-60 right-0 top-20">
                <ul className="text-indigo-900 font-medium ">
                  <li className="flex items-center px-4 py-2 text-lg cursor-pointer rounded hover:text-fuchsia-600">
                    <AiOutlineUser className="mr-2 size-6" />
                    <Link to="/profile">View Profile</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 text-lg cursor-pointer rounded hover:text-fuchsia-600">
                    <AiOutlineLock className="mr-2 size-6" />
                    <Link to="/change-password">Change Password</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 text-lg cursor-pointer rounded hover:text-fuchsia-600" onClick={()=>handelLogOut(instance)}>
                    <FiLogOut className="mr-2 size-6" />
                    {/* <Link to="/">Logout</Link> */}
                    <span>LogOut</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default NavBar;
























// import React from "react";
// // import { Link } from "react-scroll";
// import {FaSearch} from "react-icons/fa"
// // import {CiMenuFries} from "react-icons/ci"
// // import {Link} from 'react-router-dom'

// const NavBar=()=> {
//   return (
//   <>
//     <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 w-full fixed top-0 z-50">
//     <div className="h-10vh flex justify-between text-white lg:py-4 px-2 py-7 ">
//          <div className="flex items-center flex-1">
//              <span className="text-2xl align-bottom ml-6">
//                Pursuit Software
//              </span>
//          </div>
//          <div className="flex items-center">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search"
//               className="text-base  bg-slate-500 w-40 text-white focus:outline-none px-2 py-1 border border-slate-500 rounded-full"
//             />
//             <FaSearch className="absolute top-2 right-2 text-white" />
//           </div>
//         </div>
//     </div>
//     </div>
//   </>
//   );
// }

// export default NavBar;
