import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import Context from '../../../Context/Context';
const API = 'https://timesheetapplication.onrender.com/client';
const EditProject = () => {
  const show='relative inline-flex px-6 py-2 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full mr-12';
  const nav=useNavigate();
  const [option, setOption]=useState([])
  const [isTrue, setIsTrue]=useState(false);
  const {projectId,projectClientId,projectName,projectClientName,projectDescription,projectNote}=useContext(Context);
  const [ProjectName, setProjectName]=useState(projectName.name);
  const [value, setValue]=useState({value:projectClientId.clientId, label:projectClientName.clientName})
  const [note, setNote]=useState(projectNote.note);
  const [description, setDescription]=useState(projectDescription.description)
  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? 'none' : 'none',
      padding: 1,
      backgroundColor: "white"
    }),
  }
  const handelGetClientData=()=>{
    axios
        .get(API)
        .then((res) => {
          const newOptions = res.data.data.map((e) => ({ value: e.clientId, label: e.name }));         setOption(newOptions);
        })
        .catch((err) => {
            console.log('Data Process Error');
            console.log(err.message)
        });
 }
 const handelEdit = () => {
   if(ProjectName!==''){
    axios
     .put(`https://timesheetapplication.onrender.com/updateProject/${projectId.id}`, {
       name: ProjectName,
       notes:note,
       descriptions:description,
       clientId:value.value
     })
     .then(res => {
       nav('/editor/project')
       console.log(res.data)
     })
     .catch(err => console.log(err))
   }else{
     //alert('Please enter project name')
     setIsTrue(true)
   }
 }
 useEffect(()=>{
  handelGetClientData();
 },[])
  return (
    <div className='w-full'>
      <div className='w-11/12 lg:w-1/2 py-8 px-10 lg:py-12 lg:px-20'>
      <span className='text-2xl lg:text-4xl font-medium text-slate-500' >
        Edit Project
      </span>
      <div className='py-6'>
        <h3 className='text-base lg:text-2xl font-medium mb-2' >
          Project Name
        </h3>
        <div className="flex w-90 flex-col ">
          <input className='outline-none border-5 border-gray-400  rounded px-2 py-2 lg:px-4 text-xs lg:text-base' type='text' placeholder='Enter the Client' value={ProjectName} onChange={(e)=>{setProjectName(e.target.value);setIsTrue(false)}}></input>
          <label className='text-red-500'>{isTrue && 'Project name is required'}</label>
        </div>
      </div>
      <div>
        <h3 className='text-base lg:text-2xl font-medium mb-2' >
          Client Name
        </h3>
        <div className="flex  w-90  flex-col gap-6 " >
          <Select styles={selectStyle} className='text-xs lg:text-lg' options={option} defaultValue={value} onChange={setValue}  isSearchable/>
        </div>
      </div>
      <div className='py-6'>
        <h3 className='text-base lg:text-2xl font-medium mb-2' >
          Description
        </h3>
        <div className="flex w-90 flex-col gap-6 ">
          <input className='outline-none border-5 border-gray-400 rounded px-2 py-2 lg:px-4 text-xs lg:text-base hover:bg-slate-50' type='text' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
        </div>
      </div>
      <div className=''>
        <h3 className='text-base lg:text-2xl font-medium mb-2' >
          Note
        </h3>
        <div className="flex w-90 flex-col gap-6 ">
          <input className='outline-none border-5 border-gray-400 rounded px-2 py-2 lg:px-4 text-xs lg:text-base hover:bg-slate-50' type='text' value={note} onChange={(e)=>setNote(e.target.value)}></input>
        </div>
      </div>
      </div>
      <div className='flex justify-end gap-2 lg:gap-10 mt-20 mb-10 w-full'>
        <button className='relative inline-flex px-6 py-2 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset hover:bg-slate-600 hover:text-white rounded-full' onClick={()=>nav('/editor/projectDetails')}>Cancel</button>
        <button className={ProjectName==='' ?'relative inline-flex px-6 py-2 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-lg lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12':show} onClick={handelEdit}>Save</button>
      </div>
    </div>
  )
}

export default EditProject;