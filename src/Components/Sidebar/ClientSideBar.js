import { useState, useEffect } from "react";
import React from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { PiList } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";
import { IoIosPeople } from "react-icons/io";
import { FaRegFlag } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import NavBar from "../NavBar";

const ClientSideBar = () => {
  const nav=useNavigate();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('adminDashbord');
  const location=useLocation();
 // console.log(location.pathname.split('/')[2])
  const handelAction = (action) => {
    setActive(action);
  }
  useEffect(()=>{
     setActive(location.pathname.split('/')[2])
  },[location.pathname.split('/')[2]])
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
          <Link to='adminDashbord' onClick={() => handelAction('adminDashbord')}>
              <li
                className={active === 'adminDashbord' || active === 'teamdashborad' || active === 'approvalStatus' ? 'text-white text-xs lg:text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-10 bg-indigo-500' : 'text-white text-xs lg:text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-10'}
              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <PiList/>
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                 AdminDashbord
                </span>
              </li>
            </Link>
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
            <Link to='client' onClick={() => handelAction('client')}>
              <li
                className={active === 'client' || active === 'addClient' || active === 'clientDetails' || active === 'editClient' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}
              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <IoIosPeople />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Clients
                </span>
              </li>
            </Link>
            <Link to="project" onClick={() => handelAction('project')}>
              <li
                className={active === 'project' || active === 'addProject' || active === 'projectDetails' || active === 'editProject' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <GoProjectSymlink />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Projects
                </span>
              </li>
            </Link >
            <Link to='chargeActivity' onClick={() => handelAction('chargeActivity')}>
              <li
                className={active === 'chargeActivity' || active === 'createChargeActivity' || active === 'chargeActivityTypeDetails' || active === 'editChargeActivityType' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <FaRegFlag />
                </span>
                <span
                  className={`whitespace-nowrap text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Charge Activity Type
                </span>
              </li>
            </Link>
            <Link to='employee' onClick={() => handelAction('employee')}>
              <li
                className={active === 'employee' || active === 'addEmployee' || active === 'employeeDetails' || active === 'editEmployee' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <IoHomeOutline />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Employees
                </span>
              </li>
            </Link>
            <Link to='timesheetSetting' onClick={() => handelAction('timesheetSetting')}>
              <li
                className={active === 'timesheetSetting' || active === 'addTimeSheetSetting' || active === 'editTimesheetSetting' || active === 'timesheetSettingDetails' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <IoSettingsOutline />
                </span>
                <span 
                  className={`whitespace-nowrap text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Timesheet Setting
                </span>
              </li>
            </Link>
            <Link to='taskAllocation' onClick={() => handelAction('taskAllocation')}>
              <li
                className={active === 'taskAllocation' || active === 'addTask' || active === 'taskDetails' || active === 'editTask' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <CiBookmark />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Task Allocation
                </span> 
              </li>

            </Link>
            <Link to='approvals' onClick={() => handelAction('appprovals')}>
              <li
                className={active === 'approvals' || active === 'status' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <FaRegNewspaper />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Approvals
                </span>
              </li>
            </Link>
            <Link to='/evaluationSetting' onClick={() => handelAction('evaluationSetting')}>
              <li
                className={active === 'evaluationSetting' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <IoLogoGameControllerB />
                </span>
                <span
                  className={`whitespace-nowrap text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Evaluation Setting
                </span>
              </li>

            </Link>
            <Link to='/export' onClick={() => handelAction('export')}>
              <li
                className={active === 'export' ? 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 bg-indigo-500' : 'text-white text-sm flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer p-2 hover:text-fuchsia-600 rounded-md mt-2'}

              >
                <span className="text-lg lg:text-2xl block float-left ">
                  <CiExport />
                </span>
                <span
                  className={`text-xs lg:text-base font-medium flex-1 duration-200 ${!open ? "hidden" : ""
                    }`}
                >
                  Export
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

export default ClientSideBar;
