import React, { useContext, useEffect, useState } from "react";
import { GrNext } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import AdminShowTable from "./AdminShowTable";
import DatePicker from "react-datepicker";
import Context from "../../../Context/Context";
import { AiOutlineMail } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import 'react-datepicker/dist/react-datepicker.module.css';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, addDays } from 'date-fns';
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const AdminApprovalStatus = () => {
    const nav = useNavigate(); 
    const editor=Cookies.get('EditorTab')
  const viewer=Cookies.get('ViewerTab')
   // const { approvals_Week, approvals_Id, approvals_TaskStatus, approvals_TotalHours, approvals_Task, approvals_EmpName, approvals_EmpEmail } = useContext(Context);
   const [submittedTask ,setSubmittedTask]=useState('')
    const [data, setData] = useState([]);
    
    const [selectedDate, setSelectedDate] = useState(new Date());

       const [startWeek, setStartWeek]=useState(startOfWeek(selectedDate));
    const [endWeek, setEndWeek]=useState(endOfWeek(selectedDate));

    const getStatusColor = (status) => {
        switch (status) {
            case 'submit':
                return 'text-blue-500'; // Blue color
            case 'draft':
                return 'text-yellow-500'; // Yellow color
            case 'rejected':
                return 'text-red-500'; // Red color
            case 'approved':
            default:
                return 'text-green-500'; // Green color
        }
    }

    const handleEdit = (taskStatus) => {
        console.log('rakesh')
        // var u_date=new Date();
        // var updateDate=`${u_date.getFullYear()}-${u_date.getMonth+1}-${u_date.getDay}`
        axiosInstance
            .put(`/updateApproval/${submittedTask.id}`, {

                status: taskStatus
            })
            .then(res => { 
                nav('/editor/adminDashbord')
                console.log('rohit shaw')

            })
            .catch(err => alert(err))
    }

        useEffect(()=>{
           // Cookies.get('EditorTab')===undefined && nav('/role')
           let msalAccountKey=sessionStorage.getItem('msal.account.keys')
        if(msalAccountKey!==null && (editor!==undefined || viewer!==undefined)){
            setSubmittedTask(JSON.parse(Cookies.get('submittedTask')))
            setData(JSON.parse(Cookies.get('submittedTask')).task)
            setSelectedDate(new Date(JSON.parse(Cookies.get('submittedTask')).startDate))
        }else{
            nav('/')
        }
    },[])
    return (
        <div className="flex flex-col mt-8 pl-6 pr-3 lg:px-12 py-0" style={{ height: '700px' }}>
            <div className="flex justify-between items-center gap-32 lg:gap-0">
                <span className="text-lg lg:text-3xl font-medium text-slate-500 whitespace-nowrap">{submittedTask.name}</span>
                <span className="text-sm lg:text-xl font-medium text-slate-500 mr-7 lg:mr-0 whitespace-nowrap">Total Hours:</span>
            </div>
            <div className="flex justify-between">
                <div className=" flex lg:gap-20 mt-4 lg:mt-6 w-full lg:w-11/12">
                    <div className="flex items-centre justify-between gap-1 lg:gap-4 pr-4 lg:pr-0">
                        <AiOutlineMail className="text-base lg:text-3xl font-normal lg:font-medium text-slate-500" />
                        {/* <span className="text-xl font-medium text-slate-500">email icon </span> */}
                        <span className="text-xs lg:text-xl font-normal lg:font-medium text-slate-500">{submittedTask.email}</span>
                    </div>
                    <div className="flex justify-between items-center lg:mr-0 pr-2 lg:pr-0">
                        <div className="flex justify-between items-center">
                            <SlCalender className="text-base lg:text-2xl lg:ml-4 lg:mr-4 font-medium text-slate-500" />
                            {/* <DatePicker className='invisible' selected={selectedDate} dateFormat="dd/MM/y" /> */}
                            <span className="text-xs lg:text-xl font-normal lg:font-medium text-slate-500 whitespace-nowrap">{`${format(startWeek, 'dd/MM/yyyy')} - ${format(endWeek, 'dd/MM/yyyy')}`}</span>

                        </div>

                    </div>
                    <div className="flex items-center justify-center gap-1 lg:gap-3 ">
                        <CiCircleCheck className="text-base lg:text-2xl font-medium text-slate-500" />

                        <span className={`text-sm lg:text-xl font-medium ${getStatusColor(submittedTask.status)}`}>{submittedTask.status}</span>
                    </div>

                </div>
                <div className="-mt-7 -ml-6 lg:ml-0 lg:mt-6">
                    <span className="text-sm lg:text-2xl font-medium text-slate-500"> {`${submittedTask.totalHours}h`} </span>
                </div>
            </div>
            <div className="flex flex-col mt-4 bg-slate-600">
                <div className="flex w-full">
                    <div className="flex justify-center items-center py-3 px-6 py-4 w-4/12 bg-slate-300">
                        <span className="text-xs lg:text-xl font-medium">Task</span>
                    </div>
                    <div className="flex w-7/12">
                        {[...Array(7)].map((_, index) => {
                            const currentDate = addDays(startWeek, index);
                            return (
                                <div className={`flex flex-col justify-center items-center w-1/4 ${index % 2 === 0 ? 'bg-slate-400' : 'bg-slate-300'}`} key={index}>
                                    <span className="font-normal text-xs lg:text-base">{format(currentDate, 'dd')}</span>
                                    <span className="font-normal text-xs lg:text-base">{format(currentDate, 'EEE')}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-1/12 bg-slate-300"></div>
                </div>
                <div className="flex flex-col bg-white overflow-auto scrollbar-hide pb-5 w-full h-96">
                    {
                        data.map((e, index) => {
                            return <AdminShowTable
                                key={index}
                                index={index}
                                status={submittedTask.status}
                                taskinfo={e}
                                // onDelete={deleteShowTable}
                                showDel={data.length > 1}
                                handleData={(weeklyHours, weeklyNotes, taskId, taskName) => {
                                    const newData = [...data];
                                    newData[index] = { weeklyHours, weeklyNotes, taskId, taskName };
                                    setData(newData);
                                }} />
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full mt-5">
                <div className="flex gap-4 lg:gap-3 items-center w-full lg:w-2/3">
                    <span className="text-sm lg:text-lg font-normal text-slate-600 whitespace-nowrap">Upload file</span>
                    <div className="flex flex-col justify-center gap-1 lg:gap-2 bg-white border-solid border-2 border-gray-400 w-1/3 lg:py-3 py-2 lg:px-2 px-3 overflow-x-auto scrollbar-hide lg:overflow-none">
                        <span className="text-xs whitespace-nowrap">This is nothing attach</span>
                        <span className="text-xs whitespace-nowrap">Attach file</span>
                    </div>
                    <span className="text-sm lg:text-lg font-normal text-slate-600 whitespace-nowrap">View Upload:</span>
                </div>
                <div className='flex  gap-3 lg:gap-10 ml-44 mt-10 lg:mt-0 lg:ml-0'>
                    {submittedTask.status === 'submit' && editor!==undefined ? <button className={true ? 'relative inline-flex px-3 py-1 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-sm lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ' : 'relative inline-flex px-8 py-3 font-semibold text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full bg-gray-300'} onClick={() => handleEdit('approved')} >Approved</button> : null}
                    {(submittedTask.status === 'submit' || submittedTask.status === 'approved') && editor!==undefined ? <button className='relative inline-flex px-3 py-1 lg:px-8 lg:py-3 font-semibold text-sm lg:text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full bg-gray-300 mr-10 ' onClick={() => handleEdit('rejected')}>Reject</button> : null}
                </div>
            </div>
        </div>
    )
}
export default AdminApprovalStatus;
