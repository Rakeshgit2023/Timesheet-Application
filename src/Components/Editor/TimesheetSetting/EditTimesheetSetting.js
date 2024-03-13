import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import Context from '../../../Context/Context';
import Cookies from 'js-cookie';
import axiosInstance from '../../../utils';
const EditTimesheetSetting = () => {
  const nav = useNavigate();
  const { timesheetId, timesheetEmployeeName, timesheetEmployeeId, timesheetClientName, timesheetClientId, location, startDate, endDate } = useContext(Context);
  const show = 'relative inline-flex px-6 py-2 lg:px-8 lg:py-3 font-semibold text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full mr-12';
  const [periodStart, setPeriodStart] = useState(Cookies.get('timesheetSettingStartDate'));
  const [periodEnd, setPeriodEnd] = useState(Cookies.get('timesheetSettingEndDate'));
  const [c_value, setC_Value] = useState({ value: Number(Cookies.get('timesheetSettingClientId')), label: Cookies.get('timesheetSettingClientName') });
  const [c_option, setC_Option] = useState([]);
  const [value, setValue] = useState({ value: Cookies.get('timesheetSettingLocation'), label: Cookies.get('timesheetSettingLocation') });
  const [note, setNote] = useState(Cookies.get('timesheetSettingNote'));
  const options = [
    { value: 'kolkata', label: 'kolkata' },
    { value: 'indore', label: 'indore' },
    { value: 'bhopal', label: 'bhopal' },
    { value: 'shillong', label: 'shillong' }
  ];
  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? 'none' : 'none',
      padding: 1,
      backgroundColor: "white"
    }),
  }
  const handelFetchClient = () => {
    axiosInstance
      .get('/client')
      .then((res) => {
        const newOptions = res.data.data
          .filter((e) => e.status === 'active')
          .map((e) => ({ value: e.clientId, label: e.name }));

        setC_Option(newOptions);
        console.log(newOptions);
      })
      .catch((err) => {
        console.log('Data Process Error');
        console.log(err.message);
      });
  }
  useEffect(() => {
    handelFetchClient();
    Cookies.get('EditorTab')===undefined && nav('/')
  }, [])
  const handelEdit = () => {
    axiosInstance
      .put(`/updateTimesheetSetting/${Cookies.get('timesheetSettingId')}`, {
        employeeId: timesheetEmployeeId.e_id,
        clientId: c_value.value,
        location: value.value,
        startDate: periodStart,
        endDate: periodEnd,
        notes: note
      })
      .then(res => {
        nav('/editor/timesheetSetting')
        console.log(res.data)
      })
      .catch(err => alert(err))
  }
  return (

    <div className='w-full py-12 px-12 lg:px-20'>
      <span className='text-2xl lg:text-4xl font-medium text-slate-500' >
        Timesheet Setting
      </span>
      <div className='grid grid-cols-2 gap-5 lg:gap-10 mt-5'>
        <div className='py-6'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Employee
          </h3>
          <div className="flex w-90 flex-col gap-6 ">
            <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('timesheetSettingEmployeeName')}></input>
          </div>
        </div>
        <div className='py-6'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Client
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <Select styles={selectStyle} className='text-xs lg:text-base' options={c_option} defaultValue={c_value} onChange={setC_Value} isSearchable />
          </div>
        </div>
        <div className='py-6'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Location
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <Select styles={selectStyle} className='text-xs lg:text-base' options={options} defaultValue={value} onChange={setValue} isSearchable />
          </div>
        </div>
        <div className='py-6'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Note
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <input className='outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' value={note} onChange={(e) => setNote(e.target.value)}></input>
          </div>
        </div>
        <div className='py-6'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Period Start
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <input className='outline-none cursor-pointer border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base mr-2 w-full font-normal text-lg' type="date" value={Cookies.get('timesheetSettingStartDate')} onChange={(e) => setPeriodStart(e.target.value)} />
          </div>
        </div>
        <div className='py-6'>
          <h3 className='text-sm lg:text-2xl font-medium mb-2' >
            Period End
          </h3>
          <div className="flex  w-90  flex-col gap-6 ">
            <input className='outline-none cursor-pointer border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base mr-2 w-full font-normal text-lg' type="date" value={Cookies.get('timesheetSettingEndDate')} onChange={(e) => setPeriodEnd(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-5 lg:gap-10 pl-10 mt-24 ml-12 lg:mt-20 lg:ml-10 w-full'>
          <button className='relative inline-flex px-4 py-2 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset hover:bg-slate-600 hover:text-white rounded-full' onClick={() => nav('/editor/timesheetSetting')}>Cancel</button>
          <button className={(c_value !== '' && value !== '' && periodStart !== '' && periodEnd !== '') ? show : 'relative inline-flex px-4 py-1 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-lg lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12'} onClick={handelEdit}>Add</button>
        </div>
    </div>
  )
}

export default EditTimesheetSetting;