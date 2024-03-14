import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils";
import Select from 'react-select';
const EditEmployee = () => {
    const [value, setValue] = useState({value:Cookies.get('employeeStatus'),label:Cookies.get('employeeStatus')})
    const [leadValue, setLeadValue] = useState({value:Cookies.get('leadIdOfEmployee'), label:Cookies.get('leadNameOfEmployee')})
    const [leadOption, setLeadOption] = useState([])
    const [effectiveForm, setEffectiveForm] = useState('')
    const nav = useNavigate()
    const options = [
        { value: 'active', label: 'active' },
        { value: 'inactive', label: 'inactive' }
    ];
    const selectStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'none' : 'none',
            padding: 1,
            backgroundColor: "white"
        }),
    }
    const handelUpdateActiveEmployee=(employeeId)=>{
        axiosInstance
        .put(`/updateEmployee/${employeeId}`,{
            status:value.value,
             leadId:leadValue.value,
        })
        .then((res) => {
        nav('/editor/employeeDetails')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handelUpdateInActiveEmployee=(employeeId)=>{
        axiosInstance
        .put(`/deleteEmployee/${employeeId}`)
        .then((res) => {
        nav('/editor/employeeDetails')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handelEdit=()=>{
        value.value==='active' ? handelUpdateActiveEmployee(Cookies.get('employeeId')) : handelUpdateInActiveEmployee(Cookies.get('employeeId'))
    }
    const handleGetLead = () => {
        axiosInstance
            .get('/employee')
            .then((res) => {
                const newOptions = res.data.data
                    .filter((e) => e.status === 'active')
                    .map((e) => ({ value: e.employeeId, label: e.fullName }));
                setLeadOption(newOptions);
                //    handelFetchClientData(e_value.value);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        handleGetLead()
        Cookies.get('EditorTab') === undefined && nav('/')
    }, [])
    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const display = `${year}-${month}-${day}`
        leadValue.value===Number(Cookies.get('leadIdOfEmployee')) ? setEffectiveForm(Cookies.get('effectiveForm')) : setEffectiveForm(display)
    }, [leadValue.value])
    useEffect(() => {
        setEffectiveForm(Cookies.get('effectiveForm'))
    }, [])
    return (
        <div className="flex flex-col px-20 py-12">
            <span className='text-4xl font-medium text-slate-500'>Rakesh Shaw</span>
            <div className="flex flex-col mt-10 px-10 py-8 w-full bg-white rounded-md shadow-2xl">
                <span className='text-2xl font-medium text-slate-500'>Employee Info</span>
                <div className=" flex justify-between items-center w-1/2 mt-5">
                    <span className='font-medium text-lg text-slate-500'>Status</span>
                    <div className=" w-8/12">
                        <Select styles={selectStyle} options={options} defaultValue={value} onChange={setValue} isSearchable />
                    </div>
                </div>
                <div className="w-full h-0.5 bg-slate-200 mt-6 mb-6"></div>
                <div className="mb-4">
                    <span className='text-2xl font-medium text-slate-500'>Lead Info</span>
                </div>
                <div className="grid grid-cols-2 mt-10">
                    <div className=" flex justify-between items-center w-full mb-20">
                        <span className='font-medium text-lg text-slate-500'>Lead</span>
                        <div className="w-8/12">
                            <Select styles={selectStyle} options={leadOption} defaultValue={leadValue} onChange={setLeadValue} isSearchable />
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full mb-20">
                        <span className='font-medium text-lg text-slate-500'>Effective Form</span>
                        <div className="w-8/12">
                            <input className='outline-none cursor-pointer border-5 border-gray-400 bg-slate-100  rounded px-4 py-2 mr-2 w-11/12 font-normal text-lg' value={effectiveForm} readOnly />
                            {/* <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select> */}
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full invisible">
                        <span className='font-medium text-lg text-slate-500'>Requested By</span>
                        <div className="w-8/12">
                            <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full invisible">
                        <span className='font-medium text-lg text-slate-500'>Reason</span>
                        <div className="w-8/12">
                            <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-10 w-full relative bottom-9 left-0 ... mt-20">
                    <button className='relative inline-flex px-8 py-3 bg-gray-200 font-semibold text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12' onClick={handelEdit}>Save</button>
                </div>
            </div>
        </div>
    )
}
export default EditEmployee;