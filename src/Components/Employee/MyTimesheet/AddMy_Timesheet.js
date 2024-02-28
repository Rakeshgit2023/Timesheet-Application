import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrNext } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import ShowTable from "./ShowTable";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, addDays } from 'date-fns';
const API = 'https://timesheetapplication.onrender.com/addMyTimesheet';
const AddMy_Timesheet = () => {
    const nav = useNavigate();
    const [data, setData] = useState([{
        taskId: "",
        taskName: "",
        weeklyHours: { sun: 0, mon: 0, tue: 0, wed: 0, thurs: 0, fri: 0, sat: 0 },
        weeklyNotes: { sun: '', mon: '', tue: '', wed: '', thurs: '', fri: '', sat: '' },
    }]);
    const [date, setDate] = useState([]);
    const [status, setStatus] = useState('draft')
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [opens, setOpens] = useState(false);
    const [isTrue, setIsTrue] = useState(false)
    const [totalHours, setTotalHours] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [timesheetId, setTimesheetId] = useState('')
    const [tableData, setTableData] = useState([]);
    const showData = () => {
        setData([...data, {
            taskId: "",
            taskName: "",
            weeklyHours: { sun: 0, mon: 0, tue: 0, wed: 0, thurs: 0, fri: 0, sat: 0 },
            weeklyNotes: { sun: '', mon: '', tue: '', wed: '', thurs: '', fri: '', sat: '' },
        }]);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        console.log(format(selectedDate, 'dd/mm/yyyy'))
        const req = {
            employeeId: 1000,
            leadId: 1001,
            status: status,
            weekRange: format(selectedDate, 'yyyy-MM-dd'),
            tasks: data
        }
        console.log(req);
        handleAddNewData(req);
    }
    const handleAddNewData = (req) => {
        axios
            .post(API, req)
            .then((res) => {
                console.log(res.data)
                handelSavedData()
            })
            .catch(err => alert(err.response.data.error))
    }
    const handelEdit = (taskSatatus) => {
        console.log(data)
        console.log(taskSatatus)
        var u_date = new Date();
        var updateDate = `${u_date.getFullYear()}-${u_date.getMonth + 1}-${u_date.getDay}`
        axios
            .put(`https://timesheetapplication.onrender.com/updateMyTimesheet/${timesheetId}`, {
                employeeId: 1000,
                leadId: 1001,
                status: taskSatatus,
                weekRange: updateDate,
                tasks: data
            })
            .then(res => {
                // nav('/editor/chargeActivity')
                console.log(res.data)
                handelSavedData()
            })
            .catch(err => alert(err))
    }
    const deleteShowTable = (index) => {
        var newData = [...data];
        newData.splice(index, 1);
        setData([]);
        setTimeout(() => [
            setData(newData)
        ], 1)
        console.log(index)
    }
    const prevWeek = () => {
        setSelectedDate(subWeeks(selectedDate, 1));
    }
    const nextWeek = () => {
        setSelectedDate(addWeeks(selectedDate, 1));
        // var d = Number(format(startOfWeek(addWeeks(selectedDate, 1)), 'dd')) + 1;
    }
    const startWeek = startOfWeek(selectedDate);
    const endWeek = endOfWeek(selectedDate);
    const handelSavedData = (selectedDate) => {
        console.log(format(startWeek, 'd/M/yyyy'))
        axios
            .get(`https://timesheetapplication.onrender.com/mytimesheet/1000/${format(startWeek, 'd/M/yyyy')}`)
            .then((res) => {
                console.log("Data Process Successfuly");
                setTimeout(() => {
                    console.log(res.data.data.length)
                }, 1000)
                // console.log(res.data.data[0].tasks);
                if ((res.data.data.length) !== 0) {
                    console.log('rakesh')
                    setData([])
                    setIsTrue(true)
                    setTaskStatus(res.data.data[0].status);
                    console.log(res.data.data[0].status)
                    setTotalHours(res.data.data[0].totalHours)
                    setTimesheetId(res.data.data[0].timesheetId)
                    setTimeout(() => {
                        setData(res.data.data[0].tasks);
                    }, 0.001)
                } else {
                    setIsTrue(false)
                    setTaskStatus('')
                    setData([])
                    console.log('shaw')
                    setTimeout(() => {
                        setData([{
                            taskId: "",
                            taskName: "",
                            weeklyHours: { sun: 0, mon: 0, tue: 0, wed: 0, thurs: 0, fri: 0, sat: 0 },
                            weeklyNotes: { sun: '', mon: '', tue: '', wed: '', thurs: '', fri: '', sat: '' },
                        }])
                    }, 0.001)
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log("Data Process Error");
                console.log(err);
            })
    }
    useEffect(() => {
        handelSavedData()
    }, [selectedDate])
    console.log(data);
    return (
        <div className="flex flex-col mt-4 lg:mt-8 pl-6 pr-3 lg:px-12 py-0" style={{ height: '700px' }}>
            <spann className="text-2xl lg:text-3xl font-medium text-slate-500">Weekly Timesheet</spann>
            <div className="flex gap-1 lg:gap-4 mt-3 lg:mt-5">
                <span className="text-base lg:text-xl font-medium text-slate-500">{isTrue && 'Total Hours:'}</span>
                <span className="text-base lg:text-xl font-medium text-slate-500">{isTrue && totalHours}</span>
            </div>
            <div className="flex gap-3 lg:gap-4 mt-2 lg:mt-5">
                <span className="text-base lg:text-xl font-medium text-slate-500">{isTrue && 'Status:'}</span>
                <span className="text-base lg:text-xl font-medium text-slate-500">{isTrue && taskStatus}</span>
            </div>
            <div className="flex lg:justify-between items-center mt-2 lg:mt-3 overflow-hidden">
                <div className="flex lg:justify-between items-center">
                    <span className="text-base lg:text-2xl font-medium text-slate-500 mr-1 lg:mr-7 whitespace-nowrap">Week :</span>
                    <GrNext className="bg-slate-400 text-lg lg:text-3xl mr-3 lg:mr-8" style={{ transform: 'rotate(180deg)' }} onClick={prevWeek} />
                    <span className="text-xs lg:text-base font-normal whitespace-nowrap">{`${format(startWeek, 'dd/M/yyyy')} - ${format(endWeek, 'dd/M/yyyy')}`}</span>
                    <GrNext className="bg-slate-400 text-lg lg:text-3xl ml-3 lg:ml-8" onClick={nextWeek} />
                    <SlCalender className="text-xl lg:text-3xl ml-3 lg:ml-4" onClick={() => setOpens(!opens)} />
                    <DatePicker className='invisible' selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy" open={opens} />
                </div>
                {taskStatus !== 'submit' && <button className="relative inline-flex px-4 py-1 lg:px-8 lg:py-3 font-semibold text-xs lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full whitespace-nowrap absolute lg:relative -ml-40 lg-ml-0" onClick={showData}>Add Task</button>}
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
                <div className="flex flex-col bg-white overflow-auto scrollbar-hide pb-5 w-full h-80 ">
                    {
                        data.map((e, index) => {
                            return <ShowTable
                                key={index}
                                index={index}
                                status={taskStatus}
                                taskinfo={e}
                                onDelete={deleteShowTable}
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
                    <button className={taskStatus === 'submit' ? 'relative inline-flex px-4 py-1 lg:px-8 lg:py-3 text-sm lg:text-xl bg-gray-200 font-semibold text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400' : 'relative inline-flex px-4 py-1 lg:px-8 lg:py-3 text-sm lg:text-xl font-semibold traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full bg-gray-300'} onClick={taskStatus === 'submit' ? null : isTrue === false ? handleSubmit : () => { handelEdit(taskStatus) }}>Save</button>
                    <button className='relative inline-flex px-4 py-1 lg:px-8 lg:py-3 text-sm lg:text-xl font-semibold traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full bg-gray-300 mr-10' onClick={() => { handelEdit('submit') }}>Submit</button>
                </div>
            </div>
        </div>
    )
}
export default AddMy_Timesheet;