import { useState, useEffect } from "react";
import React from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { GoStack } from "react-icons/go";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const EmployeeSideBar = () => {
  const nav=useNavigate();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('myDashbord');
  const handelAction = (action) => {
    setActive(action);
  }
  return (
    <div className="flex flex-col">
      <NavBar/>
      <div className="flex mt-16">
        <div
          className={`bg-blue-950 h-100vh p-1 lg:p-5 pt-8 ${open ? "w-32 lg:w-72" : "w-20"
            } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`bg-white text-slate-900 text-3xl rounded-full absolute -right-3 top-4 border border-slate-900 cursor-pointer ${!open ? "rotate-180" : ""
              }`}
            onClick={() => setOpen(!open)}
          />
          <div
            className={`flex items-center rounded-md bg-slate-300 mt-6 ${!open ? "px-2.5" : "px-4"
              } py-2`}
          >
            <BsSearch
              className={`text-white text-lg block float-left cursor-pointer ${open ? "mr-2" : ""
                }`}
            />
            <input
              type={"search"}
              placeholder="Search"
              className={`text-base bg-transparent w-full text-white focus:outline-none ${!open ? "hidden" : ""
                }`}
            />
          </div>

          <ul className="pt-2">
            <Link to='myDashbord' onClick={() => handelAction('myDashbord')}>
              <li
                className={active === 'myDashbord' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}
              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <IoIosPeople />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  My Dashboard
                </span>
              </li>
            </Link>
            <Link to='myTimesheet' onClick={() => handelAction('myTimesheet')}>
              <li
                className={active === 'myTimesheet' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <HiOutlineSquares2X2 />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  My Timesheet
                </span>
              </li>

            </Link>
            <Link to='/role'>
              <li
                className="text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2"

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <GoStack />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Role Change
                </span>
              </li>
            </Link>
          </ul>
        </div>

        <div className="bg-slate-200 h-auto w-full">
          <Outlet />
          {/* <ChildRoute/> */}
        </div>
      </div>
    </div>
  );
}

export default EmployeeSideBar;
