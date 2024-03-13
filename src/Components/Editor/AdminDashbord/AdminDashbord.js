import React, {useContext, useEffect, useState} from "react";
import { FaStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const AdminDashbord = () => {
    const editor=Cookies.get('EditorTab')
    const viewer=Cookies.get('ViewerTab')
    const nav=useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [employeeName, setEmployeeName]=useState('')
    const [statusCount, setStatusCount]=useState('');
    const [allRepotees, setAllRepotees]=useState([]);
    const [allClients, setAllClients]=useState([]);
    const [claimedTask, setClaimedTask]=useState([]);
    const [request, setRequest]=useState([]);
    const handelRole = () => {
        let userData = sessionStorage.getItem('66e5957c-a38f-4d6e-bcc6-6da399a71f6f.06191626-9f52-42fe-8889-97d24d7a6e95-login.windows.net-06191626-9f52-42fe-8889-97d24d7a6e95')
        let user = JSON.parse(userData);
        userData!==null ? setEmployeeName(JSON.parse(Cookies.get('userInfo')).fullName) : nav('/')
    }
    const handleDataFetchAdminDashbordData = () => {
        setIsProcessing(true)
        axiosInstance
            .get(`/admindashboard`)
            .then((res) => {
                console.log('Data Process Successfuly');
                setStatusCount(res.data.data[0].statusCounts);
                setAllRepotees(res.data.data[0].directReportees);
                setAllClients(res.data.data[0].clients);
                setClaimedTask(res.data.data[0].allTasks);
                setRequest(res.data.data[0].weeklyTimesheets);
        //         Cookies.remove('submittedTask')
        //         Cookies.remove('teamDashboardEmployee')
        //         Cookies.remove('clientId');
        //         Cookies.remove('clientName');
        //         Cookies.remove('clientStatus');
        //         Cookies.remove('projectId');
        // Cookies.remove('projectName');
        // Cookies.remove('projectDescription')
        // Cookies.remove('projectNotes')
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err)
                setErrorText(err.message);
                setIsError(true)
            })
            .finally(() => setIsProcessing(false))
        
    }
    useEffect(() => {
        if(editor!==undefined || viewer!==undefined){
            setIsProcessing(true);
        handleDataFetchAdminDashbordData()
        }else{
            nav('/')
        }
    }, [])
    useEffect(()=>{
        handelRole()
    },[])
    const handelRequest=(task,status,totalHours,weekStart,id,name,email,employeeId)=>{
        let startDate=weekStart.split('/').reverse().join('-');
        const submittedTask={
            startDate:startDate,
            task:task,
            status:status,
            totalHours:totalHours,
            id:id, 
            name:name,
            email:email ,
            //employeeId:employeeId
        }
        Cookies.set('submittedTask',JSON.stringify(submittedTask))
         editor!==undefined ? nav('/editor/approvalStatus') : nav('/viewer/approvalStatus')
    }
    const handelTeamDashbord=(name, id)=>{
        const teamDashboardEmployee={
            name:name,
            id:id
        }
        Cookies.set('teamDashboardEmployee',JSON.stringify(teamDashboardEmployee))
        editor!==undefined ? nav('/editor/teamdashborad') : nav('/viewer/teamdashborad')
    }
    return (
        <div className="flex flex-col ml-6 lg:ml-8 mr-2 lg:mr-5 mt-2 lg:mt-5 mb-2 lg:mb-5 overflow-auto scrollbar-hide" style={{ height: '700px' }}>
            {
                 isProcessing ?
                 <div className='flex justify-center items-center w-full py-20 mt-20'>
                     <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20 whitespace-nowrap'>Loading data.....</h2>
                 </div> :
                 <>
                 {
                    isError ? (
                        <div className='flex justify-center items-center w-full py-20 mt-20'>
                            <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                        </div>
                    ) :
                    (
                        <>
                         <div>
                <span className="text-lg lg:text-3xl font-medium text-slate-500">{`Welcome, ${employeeName}`}</span>
            </div>
            <div className="mt-1">
                <span className="text-sm lg:text-xl font-base text-slate-500">Editor</span>
            </div>
            <div className=" w-full rounded-md bg-white mt-3 lg:mt-5 shadow-2xl ">
                <div className="flex justify-between ml-2 lg:ml-4 mr-3 lg:mr-10 mt-1">
                    <h3 className="font-bold text-base lg:text-xl text-slate-800">Direct Repotees Timesheet</h3>
                    <div className='relative inline-flex px-0 py-0 border-solid border-2 border-gray-400'>
                        <select className="outline-none hover:bg-gray-200 py-0.5">
                            <option>2023</option>
                            <option>2022</option>
                        </select>
                    </div>
                </div>
                <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-3 lg:ml-5 mt-1 lg:mt-2"></div>
                <div className="grid grid-cols-2 lg:flex lg:justify-evenly lg:gap-2 ml-1 lg:ml-3 mb-1 lg:mb-4 overflow-y-auto lg:overflow-none h-60 lg:h-48">
                    <div className="flex flex-col justify-center items-center ">
                        <div className="flex flex-col justify-center items-center lg:gap-3 h-20 w-20 lg:h-28 lg:w-28 mt-3 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">0</span>
                            <span className="font-semibold text-xs text-gray-500">Not Start</span>
                        </div>
                        <div>
                            <span className="font-normal text-xs">Last drafted on</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <div className="flex flex-col justify-center items-center lg:gap-3 h-20 w-20 lg:h-28 lg:w-28 mt-3 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">{statusCount.draft}</span>
                            <span className="font-semibold text-xs text-orange-400">Drafts</span>
                        </div>
                        <div>
                            <span className="font-normal text-xs">Last drafted on</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center lg:gap-3 h-20 w-20 lg:h-28 lg:w-28 mt-3 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">{statusCount.submit}</span>
                            <span className="font-semibold text-xs text-blue-600 ">Submited</span>
                        </div>
                        <div>
                            <span className="font-normal text-xs">Last submited on</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center lg:gap-1 h-20 w-20 lg:h-28 lg:w-28 mt-3 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">0</span>
                            <div className="flex flex-col justify-center items-center">
                                <span className="font-normal lg:font-semibold text-xs text-sky-400">Partially</span>
                                <span className="font-normal lg:font-semibold text-xs text-sky-400">submitted</span>
                            </div>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <span className="font-normal text-xs ">Last partially submited on</span>
                        </div>
                        {/* <span className="font-normal text-xs">on</span> */}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center lg:gap-3 h-20 w-20 lg:h-28 lg:w-28 mt-0 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">{statusCount.approved}</span>
                            <span className="font-semibold text-xs text-emerald-600">Approved</span>
                        </div>
                        <div>
                            <span className="font-normal text-xs">Last drafted on</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="container flex flex-col justify-center items-center lg:gap-1 h-20 w-20 lg:h-28 lg:w-28 mt-3 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">0</span>
                            <div className="flex flex-col justify-center items-center">
                                <span className="font-normal lg:font-semibold text-xs text-green-500">Partially</span>
                                <span className="font-normal lg:font-semibold text-xs text-green-500">Approved</span>
                            </div>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <span className="font-normal text-xs">Last partially approved on</span>
                        </div>
                        {/* <span className="font-normal text-xs">on</span> */}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="container flex flex-col justify-center items-center lg:gap-3 h-20 w-20 lg:h-28 lg:w-28 mt-3 lg:mt-6 mb-2 lg:mb-3 rounded-full border-solid border-2 border-gray-400">
                            <span className="font-bold">{statusCount.rejected}</span>
                            <span className="font-semibold text-xs text-red-600">Rejected</span>
                        </div>
                        <div>
                            <span className="font-normal text-xs">Last rejected on</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-6 w-full">
                <div className="w-full lg:w-1/3 h-40 lg:h-80 rounded-md bg-white mt-2 lg:mt-4 shadow-2xl overflow-x-auto">
                    <div className="w-full flex justify-between items-center mb-1 mt-1">
                    <span className="font-bold text-base lg:text-xl text-slate-800 px-6">All Repotees</span>
                    <div className="px-6">
                    <IoHomeOutline className="text-lg" onClick={handleDataFetchAdminDashbordData} />
                    </div>
                    </div>
                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-3 lg:ml-4"></div>
                    <div className="flex flex-col h-60 lg:h-64 ml-8 mt-2 scrollbar-hide overflow-auto">
                                        {allRepotees.map((e, index) => (
                                            <div className="flex gap-3 w-full mb-2" key={index}>
                                                <TbPointFilled className="text-slate-400 text-xl" />
                                                <span className="text-xs font-normal " onClick={()=>handelTeamDashbord(e.employeeName,e.employeeId)}>{e.employeeName}</span>
                                            </div>
                                        ))}
                                    </div>
                </div>
                <div className=" w-full lg:w-2/3 h-60 lg:h-80 rounded-md bg-white mt-2 lg:mt-4 shadow-2xl">
                    <div className="flex justify-between ml-4 mr-10 mt-1">
                        <h3 className="font-bold text-base lg:text-xl text-slate-800">Claimed Task</h3>
                        <div className='relative inline-flex px-0 py-0 border-solid border-2 border-gray-400'>
                            <select className="outline-none hover:bg-gray-200 py-0.5">
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-5 mt-2"></div>
                    <div className="flex flex-col overflow-x-auto scrollbar-hide">
                        <div className="flex justify-between lg:gap-2">
                            <span className="w-1/5 py-1 font-semibold text-center text-xs">Name</span>
                            <div className="flex flex-row justify-between w-4/5">
                                <span className="w-1/5 py-1 font-semibold text-center text-xs">Project</span>
                                <span className="w-1/5 py-1 font-semibold text-center text-xs">Task</span>
                                <span className="w-1/5 py-1 font-semibold text-center text-xs">Billable</span>
                                <span className="w-1/5 py-1 font-semibold text-center text-xs">Consumed Hours</span>
                            </div>
                        </div>
                        <div className="px-1 lg:px-0 overflow-auto scrollbar-hide h-32 lg:h-60">
                            {claimedTask.map((person, index) => (
                                <div key={index} className="flex lg:gap-2">
                                    <span className="w-1/5 py-1 text-xs text-center font-normal">{person.employeeName}</span>
                                    <div className="flex flex-col w-4/5 h-20 overflow-y-auto mb-3 lg:mb-6">
                                        {person.project.map((project, projIndex) => (
                                            <div key={projIndex} className="flex justify-between">
                                                <span className="w-1/5 py-1 text-xs text-center font-normal">{project.projectName}</span>
                                                <span className="w-1/5 py-1 text-xs text-center font-normal">{project.taskName}</span>
                                                <span className="w-1/5 py-1 text-xs text-center font-normal">{project.billable}</span>
                                                <span className="w-1/5 py-1 text-xs text-center font-normal">{project.consumedHours}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-6 w-full">
                <div className="w-full lg:w-1/3 h-40 lg:h-80 rounded-md bg-white mt-2 lg:mt-4 shadow-2xl overflow-x-auto">
                    <h3 className="font-bold text-base lg:text-xl text-slate-800 mb-1 mt-1 px-6">Associated Clients</h3>
                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-3 lg:ml-4"></div>
                    <div className="flex flex-col h-60 lg:h-56 ml-8 mt-2 scrollbar-hide overflow-auto">
                                        {allClients.map((e, index) => (
                                            <div className="flex gap-3 w-full mb-2" key={index}>
                                                <FaStar className="text-slate-400" />
                                                <span className="text-xs font-normal ">{e.name}</span>
                                            </div>
                                        ))}
                                    </div>
                </div>
                <div className=" w-full lg:w-2/3 h-60 lg:h-80 rounded-md bg-white mt-2 lg:mt-4 shadow-2xl">
                    <div className="flex justify-between ml-4 mr-10 mt-1">
                        <h3 className="font-bold text-base lg:text-xl text-slate-800">Requests</h3>
                        <div className='relative inline-flex px-0 py-0 border-solid border-2 border-gray-400'>
                            <select className="outline-none hover:bg-gray-200 py-0.5">
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-11/12 h-0.5 bg-slate-200 rounded-full ml-5 mt-2"></div>
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-2 lg:gap-0">
                            <span className="w-1/5 py-1 font-semibold text-center text-xs">Name</span>
                            <span className="w-1/5 py-1 font-semibold text-center text-xs">Week</span>
                            <span className="w-1/5 py-1 font-semibold text-center text-xs">Total Hours</span>
                            <span className="w-1/5 py-1 font-semibold text-center text-xs">Status</span>
                            <span className="w-1/5 py-1 font-semibold text-center text-xs"></span>
                        </div>
                        <div className="px-1 lg:px-0 overflow-auto scrollbar-hide h-32 lg:h-60">
                            {request.map((e, i) => (
                                <div key={i} className="flex justify-between gap-2 lg:gap-0 mb-2">
                                    <span className="w-1/5 py-1 text-xs text-center font-normal">{e.employeeName}</span>
                                    <span className="w-1/5 py-1 text-xs text-center font-normal">{e.weekRange.range}</span>
                                    <span className="w-1/5 py-1 text-xs text-center font-normal">{e.totalHours}</span>
                                    <span className="w-1/5 py-1 text-xs text-center font-normal">{e.status}</span>
                                    {/* <span className="w-1/5 py-1 text-xs text-center font-normal">r</span> */}
                                    <div className="w-1/5 py-1">
                                    <IoArrowForwardCircleOutline className="text-2xl text-center ml-3 lg:ml-6" onClick={()=>handelRequest(e.tasks,e.status,e.totalHours,e.weekRange.start,e.timesheetId,e.employeeName,e.email,e.employeeId)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                        </>
                    )
                 }
                 </>
            }
        </div>
    )
}
export default AdminDashbord;




