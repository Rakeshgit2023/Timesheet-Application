import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API = 'https://timesheetapplication.onrender.com/addClient';
//const API='https://timesheet-application-9xly.onrender.com/addclient';
const AddClient = () => {
  const nav = useNavigate();
  const [status, setStatus] = useState('active');
  const show = 'relative inline-flex px-6 py-2 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full mr-12';
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Client name is required')
    }),
    onSubmit: (values) => {
      console.log(values);
      handleAddNewData(values)
    }
  })
  const handleAddNewData = (req) => {
    axios
      .post(API, req)
      .then((res) => {
        console.log(res.data)
        nav('/editor/client')
        formik.handleReset();
      })
      .catch(err => alert(err.response.data.error))
  }
  return (
    <div className='w-full'>
      <div className='w-11/12 lg:w-1/2 py-8 px-10 lg:py-12 lg:px-20'>
        <span className='text-2xl lg:text-4xl font-medium text-slate-500' >
          Add Client
        </span>
        <div className='py-6'>
          <div className='flex'>
            {/* <span className='text-red-500 text-2xl absolute left-'>*</span> */}
            <h3 className='text-sm lg:text-2xl font-medium mb-2 lg:mb-4' >
              Client Name
            </h3>
          </div>
          <div className="flex w-90 flex-col ">
            <input className='outline-none border-5 border-gray-400 rounded px-2 py-2 lg:px-4 hover:bg-slate-50 text-xs lg:text-base' type='text' placeholder='Enter Client name' name='name' id='name' value={formik.values.name} onChange={formik.handleChange}></input>
            <label className='text-red-500'>{formik.errors.name && formik.errors.name}</label>
          </div>
        </div>
        <div>
          <h3 className='text-sm lg:text-2xl font-medium mb-2 lg:mb-4' >
            Status
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <input className='outline-none border-5 border-gray-400 rounded px-2 py-2 lg:px-4 text-xs lg:text-base' type='text' placeholder='Status' name='status' id='status' value={status}></input>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-2 lg:gap-10 mt-64 mb-10 w-full'>
        <button className='relative inline-flex px-6 py-2 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset hover:bg-slate-600 hover:text-white rounded-full' onClick={() => nav('/editor/client')}>Cancel</button>
        <button className={formik.values.name === '' ? 'relative inline-flex px-6 py-2 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-lg lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12' : show} type='submit' onClick={formik.handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default AddClient;