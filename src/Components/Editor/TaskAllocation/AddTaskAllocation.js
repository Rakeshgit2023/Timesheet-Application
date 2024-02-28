import React, { useContext, useEffect } from 'react' 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
const API='https://timesheetapplication.onrender.com/addTask';
const AddTaskAllocation=()=> {
    const nav=useNavigate();
    const [value, setValue]=useState('');
    const [e_value, setE_Value]=useState('');
    const [e_option, setE_Option]=useState([]);
    const [c_value, setC_Value]=useState('');
    const [c_option, setC_Option]=useState([]);
    const [p_value, setP_Value]=useState('');
    const [p_option , setP_Option]=useState([])
    const [charge_value, setCharge_Value]=useState('');
    const [charge_option, setCharge_Option]=useState([]);
    const [activity_value, setActive_Value]=useState('');
    const [activity_option, setActive_Option]=useState([]);
    const [estimatedHours, setEstimatedHours]=useState('');
    const [billabe, setBillabe]=useState('');
    const [startDate, setStartDate]=useState('');
    const [endDate, setEndDate]=useState('');
    const [task_value, setTask_Value]=useState('');
    const [task_option, setTask_Option]=useState([]);
    const [note, setNote]=useState('');
  const show='relative inline-flex px-6 py-1 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full mr-12';
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
  const handleSubmit =(e)=>{
    e.preventDefault()
    const req = {
        employeeId:e_value.value,
        clientId:c_value.value,
        projectId:p_value.value,
        chargeCode:charge_value.label,
        activityType:activity_value.label,
        estimatedHours:Number(estimatedHours),
        billable:value.value,
        startDate:startDate,
        endDate:endDate,
        notes:note,
        task:task_value.label
    }
    console.log(req);
    handleAddNewData(req); 
}
const handleAddNewData =(req)=>{
    axios
    .post(API,req)
    .then((res)=> {
      console.log(res.data)
       nav('/editor/taskAllocation')
    })
    .catch(err=>alert(err.response.data.error))
}
const handeFetchCurrentDate=()=>{
  const date=new Date();
  const year=date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2,'0');
  const day = date.getDate().toString().padStart(2,'0');
 const display = `${year}-${month}-${day}`;
  console.log(display)
  setStartDate(display)
  setEndDate(display)
}
  const handelFetchEmployee=()=>{
    axios
    .get('https://timesheetapplication.onrender.com/employee')
    .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.status === 'active')
          .map((e) => ({ value: e.employeeId, label: e.fullName }));
        setE_Option(newOptions);
    //    handelFetchClientData(e_value.value);
    })
    .catch((err) => {
        console.log(err)
    })
  }
  const handelFetchClientData=()=>{
    console.log(e_value.value)
    axios
    .get('https://timesheetapplication.onrender.com/timesheetsetting')
    .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.employee_Info.employeeId===e_value.value)
          .map((e) => ({ value:e.client_Info.clientId, label:e.client_Info.name}));
        console.log(newOptions);
        setC_Option(newOptions);
    })
    .catch((err) => {
        console.log(err)
    })
  }
  const handelFetchProjectData=()=>{
    console.log(c_value.value)
    axios
    .get('https://timesheetapplication.onrender.com/project')
    .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.client_Info.clientId===c_value.value)
          .map((e) => ({ value:e.projectId, label:e.name}));
        console.log(newOptions);
        setP_Option(newOptions)
    })
    .catch((err) => {
        console.log(err)
    })
  }
const handelFetchChargeCode=()=>{
    axios
    .get('https://timesheetapplication.onrender.com/chargeactivity')
    .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.project_Info.projectId===p_value.value)
          .map((e) => ({ value:e.chargeActivityId, label:e.chargeCode}));
        console.log(newOptions);
        setCharge_Option(newOptions)
    })
    .catch((err) => {
        console.log(err)
    })
}
const handelFetchActivityType=()=>{
    axios
    .get('https://timesheetapplication.onrender.com/chargeactivity')
    .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.chargeActivityId===charge_value.value)
          .map((e) => ({ value:e.chargeActivityId, label:e.activityType}));
        console.log(newOptions);
        setActive_Option(newOptions)
    })
    .catch((err) => {
        console.log(err)
    })
}
const handelFetchTask=()=>{
    axios
    .get('https://timesheetapplication.onrender.com/chargeactivity')
    .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.chargeActivityId===activity_value.value)
          .map((e) => ({ value:e.chargeActivityId, label:e.task}));
        console.log(newOptions);
        setTask_Option(newOptions)
    })
    .catch((err) => {
        console.log(err)
    })
}
  useEffect(()=>{
    handelFetchEmployee()
    handeFetchCurrentDate()
  },[])
  useEffect(()=>{
        handelFetchClientData()
  },[e_value.value])
  useEffect(()=>{
    handelFetchProjectData()
  },[c_value.value])
  useEffect(()=>{
    handelFetchChargeCode()
  },[p_value.value])
  useEffect(()=>{
    handelFetchActivityType()
  },[charge_value.value])
  useEffect(()=>{
    handelFetchTask()
  },[activity_value.value])
  return (
 
        <div className='w-full py-12 px-12 lg:px-20'>
      <span className='text-2xl lg:text-4xl font-medium text-slate-500' >
        Create Task
      </span>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 mt-5'>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                Employee
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
            <Select styles={selectStyle} className='text-xs lg:text-base' options={e_option} defaultValue={e_value} onChange={setE_Value} isSearchable/>
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Client
            </h3>
           <div className="flex  w-90  flex-col gap-6 ">
           <Select styles={selectStyle} className='text-xs lg:text-base' options={c_option} defaultValue={c_value} onChange={setC_Value} isSearchable/>
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Project
            </h3>
           <div className="flex  w-90  flex-col gap-6 ">
           <Select styles={selectStyle} className='text-xs lg:text-base' options={p_option} defaultValue={p_value} onChange={setP_Value} isSearchable />
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Charge Code
            </h3>
           <div className="flex  w-90  flex-col gap-6 ">
           <Select styles={selectStyle} className='text-xs lg:text-base' options={charge_option} defaultValue={charge_value} onChange={setCharge_Value} isSearchable />
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Activity Type
            </h3>
           <div className="flex  w-90  flex-col gap-6 ">
           <Select styles={selectStyle} className='text-xs lg:text-base' options={activity_option} defaultValue={activity_value} onChange={setActive_Value} isSearchable />
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
               Estimated Hours
            </h3>
           <div className="flex  w-90  flex-col gap-6 ">
           <input className='outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base hover:bg-slate-50' value={estimatedHours} onChange={(e)=>setEstimatedHours(e.target.value)}></input>
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                Billable
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
           {/* <input className='outline-none border-5 border-gray-400 rounded px-4 py-2 hover:bg-slate-50'></input> */}
           <Select styles={selectStyle} className='text-xs lg:text-base' options={options} defaultValue={value} onChange={setValue} isSearchable />
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                Start Date
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
           <input className='outline-none cursor-pointer border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base mr-2 w-full font-normal' type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                End Date
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
           <input className='outline-none cursor-pointer border-5 border-gray-400   rounded px-4 py-3 lg:py-2 text-xs lg:text-base mr-2 w-full font-normal' type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                Note
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
           <input className='outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base hover:bg-slate-50' value={note} onChange={(e)=>setNote(e.target.value)}></input>
           </div>
        </div>
        <div className=''>
            <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                Task
            </h3>
            <div className="flex w-90 flex-col gap-6 ">
            <Select styles={selectStyle} className='text-xs lg:text-base' options={task_option} defaultValue={task_value} onChange={setTask_Value} isSearchable />
           </div>
        </div>
        </div>
        <div className='flex justify-end gap-5 lg:gap-10 pl-10 mt-24 ml-12 lg:mt-20 lg:ml-10 w-full'>
            <button className='relative inline-flex px-4 py-1 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset hover:bg-slate-600 hover:text-white rounded-full' onClick={()=>nav('/editor/taskAllocation')}>Cancel</button>
            <button className={(e_value!=='' && c_value!=='' && p_value!=='' && charge_value!=='' && activity_value!=='' && estimatedHours!=='' && value.value!=='' && startDate!=='' && endDate!=='' && task_value!=='') ? show : 'relative inline-flex px-6 py-1 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-lg lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12'} onClick={handleSubmit}>Add</button>
        </div>
      </div>
  )
}
 
export default AddTaskAllocation;