import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Context from '../../../Context/Context';
const TimesheetSettingDetails = () => {
   const nav = useNavigate();
   const { timesheetId,timesheetEmployeeName,timesheetEmployeeStatus ,timesheetClientName, location, note, startDate, endDate } = useContext(Context);
   const handelDelete=()=>{
      if(window.confirm('Are you sure you want to delete')==true){
         axios
     .delete(`https://timesheetapplication.onrender.com/deleteTimesheetSetting/${timesheetId.id}`)
     .then(res=>{
        // alert('Data Deleted Successfuly')
         console.log(res)
         nav('/editor/timesheetSetting')
     })
     .catch(err=>console.log(err))
     }else{

     }
   }
   useEffect(()=>{
      console.log(timesheetEmployeeStatus.e_status)
   },[])
   return (

      <div className='w-full py-12 px-12 lg:px-20'>
         <div className="flex space-x-20 mb-1">
            <span className="text-2xl lg:text-4xl font-medium text-slate-500 whitespace-nowrap">Timesheet Details</span>
            <div className="flex gap-1 space-x-2 relative top-0 lg:top-1">
               {timesheetEmployeeStatus.e_status==='active' &&<CiEdit className="text-2xl font-medium cursor-pointer mt-2 rounded-full border-solid border-2 bg-amber-400 " onClick={() => nav('/editor/editTimesheetSetting')} />}
               {timesheetEmployeeStatus.e_status==='active' &&<RiDeleteBin6Line className="cursor-pointer font-medium text-2xl mt-2"  onClick={handelDelete}/>}
            </div>
         </div>
         <div className='w-full lg:w-1/2 grid grid-cols-2 gap-5 lg:gap-0 lg:flex lg:flex-col'>
         <div className='py-6'>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Employee
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
               <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={timesheetEmployeeName.e_name}></input>
            </div>
         </div>
         <div className='py-6 lg:py-0'>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Client
            </h3>
            <div className="flex  w-90  flex-col gap-6 ">
               <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={timesheetClientName.c_name}></input>
            </div>
         </div>
         <div className='py-6'>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Period Start
            </h3>
            <div className="flex  w-90  flex-col gap-6 ">
               <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={startDate.s_date}></input>
            </div>
         </div>
         <div className='py-6 lg:py-0'>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Period End
            </h3>
            <div className="flex  w-90  flex-col gap-6 ">
               <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={endDate.e_date}></input>
            </div>
         </div>
         <div className='py-6'>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Location
            </h3>
            <div className="flex  w-90  flex-col gap-6 ">
               <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base ' readOnly={true} value={location.location}></input>
            </div>
         </div>
         <div className='py-6 lg:py-0'>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Note
            </h3>
            <div className="flex  w-90  flex-col gap-6 ">
               <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={note.note}></input>
            </div>
         </div>
         </div>
      </div>
   )
}

export default TimesheetSettingDetails;