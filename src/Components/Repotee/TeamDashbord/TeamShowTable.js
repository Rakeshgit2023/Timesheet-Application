import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
const TeamShowTable = ({ onDelete, showDel, handleData, status, taskinfo, index }) => {
    const [value, setValue] = useState((status === 'draft' || status === 'submit' || status === 'approved' || status === 'rejected' || status === '' && taskinfo !== 1) && { value: taskinfo.taskId, label: taskinfo.taskName });
    const [option, setOption] = useState([]);
    const [weeklyHours, setweeklyHours] = useState((status === 'draft' || status === 'submit' || status === 'approved' || status === 'rejected' || status === '' && taskinfo !== 1) && taskinfo.weeklyHours);
    const [weeklyNotes, setweeklyNotes] = useState((status === 'draft' || status === 'submit' || status === 'approved' || status === 'rejected' || status === '' && taskinfo !== 1) && taskinfo.weeklyNotes);
    const selectStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'none' : 'gray',
            padding: 1,
            backgroundColor: "white"
        }),
    }
    console.log(taskinfo);
    const handelDelete = () => {
        onDelete(index);
    }
    const handelGetTaskData = () => {
        axios
            .get('https://timesheetapplication.onrender.com/task/1000')
            .then((res) => {
                const newOptions = res.data.data.map((e) => ({ value: e.taskId, label: e.project_Info.name + '-' + e.chargeCode + '-' + e.activityType + '-' + e.task }));
                setOption(newOptions);
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err.message)
            });
    }
    useEffect(() => {
        handelGetTaskData();
    }, [])
    const handelSun = (e) => {
        setweeklyHours({ sun: Number(e.target.value), mon: weeklyHours.mon, tue: weeklyHours.tue, wed: weeklyHours.wed, thurs: weeklyHours.thurs, fri: weeklyHours.fri, sat: weeklyHours.sat })
    }
    const handelMon = (e) => {
        setweeklyHours({ sun: weeklyHours.sun, mon: Number(e.target.value), tue: weeklyHours.tue, wed: weeklyHours.wed, thurs: weeklyHours.thurs, fri: weeklyHours.fri, sat: weeklyHours.sat })
    }
    const handelTue = (e) => {
        setweeklyHours({ sun: weeklyHours.sun, mon: weeklyHours.mon, tue: Number(e.target.value), wed: weeklyHours.wed, thurs: weeklyHours.thurs, fri: weeklyHours.fri, sat: weeklyHours.sat })
    }
    const handelWed = (e) => {
        setweeklyHours({ sun: weeklyHours.sun, mon: weeklyHours.mon, tue: weeklyHours.tue, wed: Number(e.target.value), thurs: weeklyHours.thurs, fri: weeklyHours.fri, sat: weeklyHours.sat })
    }
    const handelThu = (e) => {
        setweeklyHours({ sun: weeklyHours.sun, mon: weeklyHours.mon, tue: weeklyHours.tue, wed: weeklyHours.wed, thurs: Number(e.target.value), fri: weeklyHours.fri, sat: weeklyHours.sat })
    }
    const handelFri = (e) => {
        setweeklyHours({ sun: weeklyHours.sun, mon: weeklyHours.mon, tue: weeklyHours.tue, wed: weeklyHours.wed, thurs: weeklyHours.thurs, fri: Number(e.target.value), sat: weeklyHours.sat })
    }
    const handelSat = (e) => {
        setweeklyHours({ sun: weeklyHours.sun, mon: weeklyHours.mon, tue: weeklyHours.tue, wed: weeklyHours.wed, thurs: weeklyHours.thurs, fri: weeklyHours.fri, sat: Number(e.target.value) })
    }

    const handelSunNotes = (e) => {
        setweeklyNotes({ sun: e.target.value, mon: weeklyNotes.mon, tue: weeklyNotes.tue, wed: weeklyNotes.wed, thurs: weeklyNotes.thurs, fri: weeklyNotes.fri, sat: weeklyNotes.sat })
    }
    const handelMonNotes = (e) => {
        setweeklyNotes({ sun: weeklyNotes.sun, mon: e.target.value, tue: weeklyNotes.tue, wed: weeklyNotes.wed, thurs: weeklyNotes.thurs, fri: weeklyNotes.fri, sat: weeklyNotes.sat })
    }
    const handelTueNotes = (e) => {
        setweeklyNotes({ sun: weeklyNotes.sun, mon: weeklyNotes.mon, tue: e.target.value, wed: weeklyNotes.wed, thurs: weeklyNotes.thurs, fri: weeklyNotes.fri, sat: weeklyNotes.sat })
    }
    const handelWedNotes = (e) => {
        setweeklyNotes({ sun: weeklyNotes.sun, mon: weeklyNotes.mon, tue: weeklyNotes.tue, wed: e.target.value, thurs: weeklyNotes.thurs, fri: weeklyNotes.fri, sat: weeklyNotes.sat })
    }
    const handelThuNotes = (e) => {
        setweeklyNotes({ sun: weeklyNotes.sun, mon: weeklyNotes.mon, tue: weeklyNotes.tue, wed: weeklyNotes.wed, thurs: e.target.value, fri: weeklyNotes.fri, sat: weeklyNotes.sat })
    }
    const handelFriNotes = (e) => {
        setweeklyNotes({ sun: weeklyNotes.sun, mon: weeklyNotes.mon, tue: weeklyNotes.tue, wed: weeklyNotes.wed, thurs: weeklyNotes.thurs, fri: e.target.value, sat: weeklyNotes.sat })
    }
    const handelSatNotes = (e) => {
        setweeklyNotes({ sun: weeklyNotes.sun, mon: weeklyNotes.mon, tue: weeklyNotes.tue, wed: weeklyNotes.wed, thurs: weeklyNotes.thurs, fri: weeklyNotes.fri, sat: e.target.value })
    }
    useEffect(() => {
        handleData(weeklyHours, weeklyNotes, value.value, value.label);
    }, [weeklyHours, weeklyNotes, value.value, value.label]);
    return (
        <div className="flex justify-start items-start mb-3">
            <div className="w-4/12 mt-2 px-1 lg:px-4">
                <Select styles={selectStyle} className="text-xs lg:text-base" options={option} defaultValue={value} onChange={setValue} isSearchable />
            </div>
            <div className="flex flex-col w-7/12 mt-2 ml-1 lg:ml-8 mr-1 lg:mr-5">
                <div className="flex justify-between gap-2 lg:gap-8 w-full ">
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.sun} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelSun}></input>
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.mon} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelMon}></input>
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.tue} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelTue}></input>
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.wed} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelWed}></input>
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.thurs} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelThu}></input>
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.fri} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelFri}></input>
                    <input className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-base lg:text-lg" value={weeklyHours.sat} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelSat}></input>
                </div>
                <div className="flex justify-between gap-2 lg:gap-8 mt-2">
                    <input placeholder="Note Here" className="w-1/4 py-2 lg:py-4 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.sun} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelSunNotes}></input>
                    <input placeholder="Note Here" className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.mon} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelMonNotes}></input>
                    <input placeholder="Note Here" className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.tue} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelTueNotes}></input>
                    <input placeholder="Note Here" className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.wed} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelWedNotes}></input>
                    <input placeholder="Note Here" className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.thurs} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelThuNotes}></input>
                    <input placeholder="Note Here" className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.fri} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelFriNotes}></input>
                    <input placeholder="Note Here" className="w-1/4 py-1 lg:py-2 border-solid border-2 border-gray-400 text-center rounded-md text-xs" value={weeklyNotes.sat} readOnly={(status === 'submit' || status === 'approved' || status === 'rejected') && true} onChange={handelSatNotes}></input>
                </div>
            </div>
            <div className="w-1/12 flex items-center justify-center mt-4">
                {showDel && (status === 'draft' || status === '') ? <RiDeleteBin6Line className="cursor-pointer font-medium text-lg lg:text-3xl text-red-500" onClick={handelDelete} /> : <RiDeleteBin6Line className="cursor-pointer font-medium text-lg lg:text-3xl text-zinc-300" />}
            </div>
        </div>
    )
}
export default TeamShowTable;