import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Select from "react-select";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const MyDashbord = () => {
    const nav = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [employeeData, setEmployeeData] = useState("");
    const [statusCount, setStatusCount] = useState("");
    const [weeklyTimesheet, setWeeklyTimesheet] = useState([]);
    const [filterWeeklyTimesheet, setFilterWeeklyTimesheet]=useState([])
    const [allocatedTask, setAllocatedTask] = useState([]);
    const [clientinfo, setClientinfo] = useState([]);
    const [statusValue, setStatusValue] = useState('');
    const options_status = [
        { value: "draft", label: "Draft" },
        // { value: "Pratially Submitted", label: "Pratially Submitted" },
        { value: 'submit', label: 'Submitted' },
        // { value: "Pratially Approved", label: "Pratially Approved" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
    ];
    const selectStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "none" : "none",
            padding: 1,
            backgroundColor: "white",
        }),
    };

    const apiData = [
        {
            userId: 1,
            id: 1,
            title: "sunt aut facere ",
            body: "quia et suscipit\nsusc",
        },
        {
            userId: 1,
            id: 2,
            title: "sunt aut facere ",
            body: "quia et suscipit\nsusc",
        },
        {
            userId: 1,
            id: 3,
            title: "sunt aut facere ",
            body: "quia et suscipit\nsusc",
        },
        {
            userId: 1,
            id: 4,
            title: "sunt aut facere ",
            body: "quia et suscipit\nsusc",
        },
    ];
    const handelFetchEmployeeData = (employeeId) => {
        setIsProcessing(true);
        axiosInstance
            .get(`/mydashboard/${employeeId}`)
            .then((res) => {
                setEmployeeData(res.data.data.employee_Info);
                setStatusCount(res.data.data.statusCounts);
                setWeeklyTimesheet(res.data.data.WeeklyTimesheet);
                setFilterWeeklyTimesheet(res.data.data.WeeklyTimesheet)
                setAllocatedTask(res.data.data.allTasks);
                setClientinfo(res.data.data.client_Info); // Update state with allocated tasks
                // Update state with allocated tasks
            })
            .catch((err) => {
                console.log("Data Process Error");
                alert(err);
                setErrorText(err.message);
                setIsError(true);
            })
            .finally(() => setIsProcessing(false));
    };

    useEffect(() => {
        let msalAccountKey=sessionStorage.getItem('msal.account.keys')
        if(msalAccountKey!==null && Cookies.get('RepoteeTab')!==undefined){
            setIsProcessing(true);
        handelFetchEmployeeData(JSON.parse(Cookies.get('userInfo')).employeeId);
        }else{
            nav('/')
        }
    }, []);
    const handelFilterStatus=(status)=>{
        console.log('rakesh')
        console.log(weeklyTimesheet)
         let filterStatus=weeklyTimesheet.filter((e,i)=>{
            if(e.Status===status){
                return e;
            }
         })
         setFilterWeeklyTimesheet(filterStatus);
    }
    useEffect(()=>{
        handelFilterStatus(statusValue.value)
    },[statusValue.value])
    // useEffect(()=>{
    //     handelFilterStatus(statusValue.value)
    // },[])
    return (
        <div className="flex flex-col lg:flex-row">
            {isProcessing ? (
                <div className="flex justify-center items-center w-full py-20 mt-20">
                    <h2 className="text-3xl text-slate-400 font-medium mt-20 py-20 whitespace-nowrap">
                        Loading data.....
                    </h2>
                </div>
            ) : (
                <>
                    {isError ? (
                        <div className="flex justify-center items-center w-full py-20 mt-20">
                            <h2 className="text-3xl text-slate-400 font-medium mt-20 py-20">
                                {errorText}
                            </h2>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-row lg:flex-col w-full lg:w-1/3">
                                <div className="w-1/2 lg:w-10/12 rounded-md bg-white flex flex-col ml-4 lg:ml-12 mt-3 lg:mt-5 shadow-2xl">
                                    <div className=" flex flex-col justify-center items-center py-1 lg:py-2">
                                        <div className="h-12 w-12 lg:h-20 lg:w-20 mt-4 lg:mt-6 rounded-full border-solid border-2 border-black"></div>
                                        <h3 className="font-bold text-base lg:text-xl text-slate-800 mb-1 mt-1 ">
                                            {employeeData.fullName}
                                        </h3>
                                        <div className="w-3/4 h-0.5 bg-slate-200 rounded-full"></div>
                                    </div>
                                    <div className="bg-slate-100 py-2 lg:py-4 ml-2 mr-2 lg:ml-4 lg:mr-4 rounded-md shadow-xl">
                                        <div className="flex flex-row justify-between lg:mb-1">
                                            <span className="font-normal text-sm lg:text-base px-6 lg:px-8">
                                                Status
                                            </span>
                                            {/* <span className="px-8" onClick={()=>nav('/editEmployee')}>E</span> */}
                                            <CiEdit
                                                className="mr-5 lg:mr-10 text-xl lg:text-2xl font-medium cursor-pointer rounded-full border-solid border-2 bg-amber-400"
                                                onClick={() => nav("/editor/editEmployee")}
                                            />
                                        </div>
                                        <div className="flex flex-row justify-between lg:mb-1">
                                            <span className="font-medium text-sm lg:text-base px-6 lg:px-8">
                                                {employeeData.status}
                                            </span>
                                            <span className="px-6 lg:px-8">.</span>
                                        </div>
                                        <div className="flex flex-row justify-between lg:mb-1">
                                            <span className="font-normal text-sm lg:text-base px-6 lg:px-8">
                                                Lead
                                            </span>
                                            {/* <span className="px-8">Ey</span> */}
                                            <IoEyeSharp className="mr-5 lg:mr-10 text-xl lg:text-2xl fill-slate-400" />
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <span className="font-medium text-sm lg:text-base px-6 lg:px-8">
                                                {employeeData.leadName}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-2 lg:mt-2 lg:py-4">
                                        <span className="font-normal text-sm lg:text-base px-8 lg:px-10 lg:mb-1">
                                            Gender
                                        </span>
                                        <span className="font-medium text-sm lg:text-base px-8 lg:px-10 lg:mb-1">
                                            {employeeData.gender}
                                        </span>
                                        <span className="font-normal text-sm lg:text-base px-8 lg:px-10 lg:mb-1">
                                            Email
                                        </span>
                                        <span className="font-medium text-sm lg:text-base px-8 lg:px-10 lg:mb-1">
                                            {employeeData.email}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-1/2 lg:w-10/12 rounded-md bg-white ml-2 mr-2 lg:mr-0 lg:ml-12 mt-4 lg:mb-4 shadow-2xl">
                                    <h3 className="font-bold text-base lg:text-xl text-slate-800 mb-1 mt-1 px-6 whitespace-nowrap">
                                        Associated Clients
                                    </h3>
                                    <div className="w-11/12 lg:w-11/12 h-0.5 bg-slate-200 rounded-full ml-4"></div>
                                    <div className="flex flex-col h-60 lg:h-44 ml-8 mt-2 scrollbar-hide overflow-auto">
                                        {clientinfo.map((e, index) => (
                                            <div className="flex gap-2 w-full mb-2" key={index}>
                                                <FaStar className="text-slate-400" />
                                                <span className="text-xs font-normal ">{e.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-col w-full lg:w-2/3">
                                <div className="w-11/12 rounded-md bg-white mt-2 lg:mt-5 mr-0 lg:mr-12 ml-5 lg:ml-6 shadow-2xl">
                                    <div className="flex justify-between ml-2 mr-2 lg:ml-4 lg:mr-10 mt-1">
                                        <h3 className="font-bold text-base lg:text-xl text-slate-800">
                                            Timesheet Statistics
                                        </h3>
                                        <div className="relative inline-flex px-0 py-0 border-solid border-2 border-gray-400">
                                            <select className="outline-none hover:bg-gray-200 py-0.5">
                                                <option>2023</option>
                                                <option>2022</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-1 lg:ml-5 mt-1 lg:mt-2"></div>
                                    <div className="grid grid-cols-3 lg:flex lg:justify-evenly ml-0 lg:ml-3 mb-4">
                                        <div className="flex flex-col justify-center items-center ">
                                            <div className="flex flex-col justify-center items-center gap-3 h-20 w-20 mb-2 lg:mt-6 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                                                <span className="font-bold">{statusCount.draft}</span>
                                                <span className="font-semibold text-xs text-orange-400">
                                                    Drafts
                                                </span>
                                            </div>
                                            <span className="font-normal text-xs">
                                                Last drafted on
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col justify-center items-center gap-3 h-20 w-20 mb-2 lg:mt-6 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                                                <span className="font-bold">{statusCount.submit}</span>
                                                <span className="font-semibold text-xs text-blue-600 ">
                                                    Submited
                                                </span>
                                            </div>
                                            <span className="font-normal text-xs">
                                                Last submited on
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col justify-center items-center  h-20 w-20 mt-2 mb-2 lg:mt-10 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                                                <span className="font-bold">0</span>
                                                <div className="flex flex-col justify-center items-center">
                                                    <span className="font-semibold text-xs text-sky-400">
                                                        Partially
                                                    </span>
                                                    <span className="font-semibold text-xs text-sky-400">
                                                        submitted
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-normal text-xs whitespace-nowrap">
                                                Last partially submited
                                            </span>
                                            <span className="font-normal text-xs">on</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col justify-center items-center gap-3 h-20 w-20 mb-2 lg:mt-6 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                                                <span className="font-bold">
                                                    {statusCount.approved}
                                                </span>
                                                <span className="font-semibold text-xs text-emerald-600">
                                                    Approved
                                                </span>
                                            </div>
                                            <span className="font-normal text-xs">
                                                Last drafted on
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col justify-center items-center  h-20 w-20 mt-2 mb-2 lg:mt-10 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                                                <span className="font-bold">0</span>
                                                <div className="flex flex-col justify-center items-center">
                                                    <span className="font-semibold text-xs text-green-500">
                                                        Partially
                                                    </span>
                                                    <span className="font-semibold text-xs text-green-500">
                                                        Approved
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-normal text-xs whitespace-nowrap">
                                                Last partially approved
                                            </span>
                                            <span className="font-normal text-xs">on</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col justify-center items-center gap-3 h-20 w-20 mb-2 lg:mt-6 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                                                <span className="font-bold">
                                                    {statusCount.rejected}
                                                </span>
                                                <span className="font-semibold text-xs text-red-600">
                                                    Rejected
                                                </span>
                                            </div>
                                            <span className="font-normal text-xs">
                                                Last rejected on
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-11/12 rounded-md bg-white mt-2 lg:mt-5 mr-0 lg:mr-12 ml-5 lg:ml-6 pb-3 shadow-2xl">
                                    <div className="flex justify-between ml-2 mr-2 lg:ml-4 lg:mr-10 mt-1">
                                        <h3 className="font-bold text-base lg:text-xl text-slate-800">
                                            Allocated Task(All)
                                        </h3>
                                    </div>
                                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-4 lg:ml-5 mt-1 lg:mt-2"></div>
                                    <div className="flex-flex-col">
                                        <div className="flex justify-between gap-1 lg:gap-0 px-4 mt-2 lg:mt-4">
                                            <span className="w-2/12 py-1 font-semibold text-center text-xs">
                                                Project
                                            </span>
                                            <span className="w-2/12 py-1 font-semibold text-center text-xs">
                                                Charge Code
                                            </span>
                                            <span className="w-2/12 py-1 font-semibold text-center text-xs">
                                                Activity Type
                                            </span>
                                            <span className="w-2/12 py-1 font-semibold text-center text-xs">
                                                Task
                                            </span>
                                            <span className="w-2/12 py-1 font-semibold text-center text-xs">
                                                Allocated Hours
                                            </span>
                                            <span className="w-2/12 py-1 font-semibold text-center text-xs">
                                                Consumed Hours
                                            </span>
                                        </div>
                                        <div className="px-4 overflow-auto scrollbar-hide h-28">
                                            {allocatedTask.map((task, index) => (
                                                <div key={index} className="flex justify-between gap-2 mb-2">
                                                    <span className="w-2/12 py-1 text-xs text-center font-normal">{task.projectName}</span>
                                                    <span className="w-2/12 py-1 text-xs text-center font-normal">{task.chargeCode}</span>
                                                    <span className="w-2/12 py-1 text-xs text-center font-normal">{task.activityType}</span>
                                                    <span className="w-2/12 py-1 text-xs text-center font-normal">{task.taskName}</span>
                                                    <span className="w-2/12 py-1 text-xs text-center font-normal">{task.estimatedHours}</span>
                                                    <span className="w-2/12 py-1 text-xs text-center font-normal">{task.consumedHours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-11/12 rounded-md bg-white mt-2 lg:mt-4 mr-0 lg:mr-12 ml-5 lg:ml-6 lg:pb-4 mb-3 lg:mb-0 shadow-2xl">
                                    <div className="flex justify-between items-center ml-2 mr-2 lg:ml-4 lg:mr-10 mt-1">
                                        <h3 className="font-bold text-base lg:text-xl text-slate-800">
                                            Weekly Timesheet
                                        </h3>
                                        <div className="relative inline-flex ">
                                            <Select
                                            className="text-xs"
                                                styles={selectStyle}
                                                options={options_status}
                                                defaultValue={statusValue}
                                                onChange={setStatusValue}
                                                isSearchable
                                            />
                                        </div>
                                    </div>
                                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-4 lg:ml-5 mt-1 lg:mt-2"></div>
                                    <div className="flex-flex-col pb-4 lg:pb-0">
                                        <div className="flex justify-between mt-2 lg:mt-4">
                                            <span className="w-4/12 py-1 font-semibold text-center text-xs">
                                                Duration
                                            </span>
                                            <span className="w-4/12 py-1 font-semibold text-center text-xs">
                                                Total Hours
                                            </span>
                                            <span className="w-4/12 py-1 font-semibold text-center text-xs whitespace-nowrap">
                                                Status
                                            </span>
                                        </div>
                                        <div className="overflow-auto scrollbar-hide h-28">
                                            {filterWeeklyTimesheet.map((entry, index) => (
                                                <div className="flex justify-between gap-2 mb-2" key={index}>
                                                    <span className="w-4/12 py-1 text-xs text-center font-normal">{entry.Duration}</span>
                                                    <span className="w-4/12 py-1 text-xs text-center font-normal">{entry.totalHours}</span>
                                                    <span className="w-4/12 py-1 text-xs text-center font-normal">{entry.Status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default MyDashbord;