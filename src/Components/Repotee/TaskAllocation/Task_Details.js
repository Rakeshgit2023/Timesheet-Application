import React, {useContext, useState, useEffect} from "react";
import Context from "../../../Context/Context";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const Task_Details = () => {
  const nav=useNavigate();
  const [taskAllocation, setTaskAllocation]=useState('');
  const {taskId,taskName,taskEmployeeName,taskProjectName,taskChargeCode,taskActivityType,taskEstimatedHours,taskBillable,taskStartDate,taskEndDate,taskNote}=useContext(Context)
  const handelDelete=()=>{
    if(window.confirm('Are you sure you want to delete')==true){
       axiosInstance
   .delete(`/deleteTask/${taskAllocation.taskId}`)
   .then(res=>{
      // alert('Data Deleted Successfuly')
       console.log(res)
       nav('/repotingLead/taskAllocation')
       Cookies.remove('taskAllocation');
        Cookies.remove('taskAllocationBillable')
   })
   .catch(err=>console.log(err))
   }else{ 

   }
 }
 useEffect(()=>{
  let userData = sessionStorage.getItem('66e5957c-a38f-4d6e-bcc6-6da399a71f6f.06191626-9f52-42fe-8889-97d24d7a6e95-login.windows.net-06191626-9f52-42fe-8889-97d24d7a6e95')
  if(userData!==null && Cookies.get('RepoteeTab')!==undefined){
    setTaskAllocation(Cookies.get('taskAllocation')!==undefined && JSON.parse(Cookies.get('taskAllocation')))
    Cookies.get('taskAllocation')===undefined && nav('/repotingLead/teamDashbord')
    
  }else{
    nav('/')
  }
},[])
  return (
    <div className="flex flex-col px-10 py-8 w-full">
      <div className="mb-6 flex space-x-40 lg:space-x-40">
        <span className='text-2xl lg:text-4xl mt-1 lg:mt-0 font-medium text-slate-500 whitespace-nowrap'>Task Details</span>
        <div className="flex gap-1 space-x-2 relative top-1">
               <CiEdit className="text-2xl font-medium cursor-pointer mt-2 rounded-full border-solid border-2 bg-amber-400 " onClick={()=>nav('/repotingLead/editTask')}/>
               <RiDeleteBin6Line className="cursor-pointer font-medium text-2xl mt-2" onClick={handelDelete}/>
            </div>
      </div>
      <div className="grid grid-cols-2 lg:flex lg:flex-col">
      <div className="mb-4">
        <span className="text-sm lg:text-xl font-medium">Task</span>
        <div className="flex w-11/12 lg:w-6/12 flex-col gap-6 mt-1">
          <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.taskName}></input>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-sm lg:text-xl font-medium">Employee</span>
        <div className="flex w-11/12 lg:w-3/12 flex-col gap-6 mt-1">
          <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.employeeName}></input>
        </div>
      </div>
      </div>
      <div className="grid grid-cols-2 lg:flex lg:gap-10 w-full mb-4">
        <div>
          <span className="text-sm lg:text-xl font-medium">Project</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.projectName}></input>
          </div>
        </div>
        <div>
          <span className="text-sm lg:text-xl font-medium">Charge Code</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.chargeCode}></input>
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <span className="text-sm lg:text-xl font-medium">Activity Type</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.activityType}></input>
          </div>
        </div>
      </div>
      <div className="flex gap-1 lg:gap-10 mb-4">
        <div>
          <span className="text-sm lg:text-xl font-medium">Start Date</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.startDate}></input>
          </div>
        </div>
        <div>
          <span className="text-sm lg:text-xl font-medium">End Date</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.endDate}></input>
          </div>
        </div>
      </div>
      <div className="flex gap-1 lg:gap-10 mb-4">
        <div>
          <span className="text-sm lg:text-xl font-medium">Allocated Hours</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} ></input>
          </div>
        </div>
        <div>
          <span className="text-sm lg:text-xl font-medium">Consumed Hours</span>
          <div className="flex w-11/12 lg:w-full flex-col gap-6 mt-1">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true}></input>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col">
      <div className="mb-4">
        <span className="text-sm lg:text-xl font-medium">Billable</span>
        <div className="flex w-11/12 lg:w-6/12 flex-col gap-6 mt-1">
          <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('taskAllocationBillable')}></input>
        </div>
      </div>
      <div>
        <span className="text-sm lg:text-xl font-medium">Notes</span>
        <div className="flex w-11/12 lg:w-6/12 flex-col gap-6 mt-1">
          <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskAllocation.note}></input>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Task_Details;