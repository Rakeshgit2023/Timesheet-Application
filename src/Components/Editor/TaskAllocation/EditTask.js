import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import Context from '../../../Context/Context';
const EditTask = () => {
  const nav=useNavigate();
  const show = 'relative inline-flex px-6 py-1 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full mr-12';
  const {taskId,taskName,taskEmployeeName,taskProjectName,taskChargeCode,taskActivityType,taskEstimatedHours,taskBillable,taskStartDate,taskEndDate,taskNote}=useContext(Context);
  const [estimatedHours, setEstimatedHours]=useState(taskEstimatedHours.e_hours)
  const [value, setValue]=useState({value:taskBillable.billable, label:taskBillable.billable});
  const [periodStart, setPeriodStart]=useState(taskStartDate.s_date);
  const [periodEnd, setPeriodEnd]=useState(taskEndDate.e_date);
  const [note, setNote]=useState(taskNote.note);
  const options = [
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' }
  ];
  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? 'none' : 'none',
      padding: 1,
      backgroundColor: "white"
    }), 
  }
  const handelEdit = () => {
    axios
      .put(`https://timesheetapplication.onrender.com/updateTask/${taskId.id}`, {
        estimatedHours:Number(estimatedHours),
        billable:value.value,
        startDate:periodStart,
        endDate:periodEnd,
        notes:note,
      })
      .then(res => {
        nav('/editor/taskAllocation')
        console.log(res.data)
      })
      .catch(err => alert(err.response.data.error))
  }
  return (

    <div className='w-full py-12 px-12 lg:px-20'>
      <span className='text-2xl lg:text-4xl font-medium text-slate-500' >
        Edit Task
      </span>
      <div className='grid grid-cols-2 gap-10 mt-3'>
        <div className='py-2'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Task
          </h3>
          <div className="flex w-90 flex-col gap-6 ">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskName.t_name}></input>
          </div>
        </div>
        <div className='py-2'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
          Employee
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
          <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskEmployeeName.e_name}></input>
          </div>
        </div>
        <div className='py-1'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Charge Activity Type 
          </h3>
          <div className="flex w-90 flex-col gap-6 ">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={taskActivityType.a_type}></input>
          </div>
        </div>
        <div className='py-1'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Billable
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
          <Select styles={selectStyle} className='text-xs lg:text-base' options={options} defaultValue={value} onChange={setValue} isSearchable />
          </div>
        </div>
        <div className='py-1'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Estimated Hours 
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
          <input className='outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base hover:bg-slate-50' value={estimatedHours} onChange={(e)=>setEstimatedHours(e.target.value)}></input>
          </div>
        </div>
        <div className='py-1'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Notes
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
          <input className='outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base hover:bg-slate-50' value={note} onChange={(e)=>setNote(e.target.value)}></input>
          </div>
        </div>
        <div className='py-1'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Period Start
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <input className='outline-none cursor-pointer border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base lg:mr-2 lg:w-7/12 font-normal' type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} />
          </div>
        </div>
        <div className='py-1'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Period End
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <input className='outline-none cursor-pointer border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base lg:mr-2 lg:w-7/12 font-normal' type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-5 lg:gap-10 pl-10 mt-24 ml-12 lg:mt-20 lg:ml-10 w-full'>
          <button className='relative inline-flex px-4 py-1 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset hover:bg-slate-600 hover:text-white rounded-full' onClick={() => nav('/editor/taskDetails')}>Cancel</button>
          <button className={(value!=='' && estimatedHours!=='' && periodStart !== '' && periodEnd !== '') ? show : 'relative inline-flex px-6 py-1 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-lg lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12'} onClick={handelEdit}>Add</button>
        </div>
    </div>
  )
}

export default EditTask;