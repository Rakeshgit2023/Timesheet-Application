import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = 'https://timesheetapplication.onrender.com/employee';
const api = 'https://timesheetapplication.onrender.com/addEmployee';
const AddEmployee = () => {
    const nav = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [email, setEmail] = useState('');
    const [option, setOption] = useState([]);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [lead, setLead] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        const req = {
            fName: firstName,
            lName: lastName,
            email: email,
            leadId: value1.value,
            gender: value.value,
            isLead: lead
        }
        console.log(req);
        handleAddNewData(req);
    }
    const handleAddNewData = (req) => {
        if (firstName !== '' && lastName !== '' && email !== '' && value.value !== '' && value1.value !== '' && name !== '') {
            axios
                .post(api, req)
                .then((res) => {
                    console.log(res.data)
                    nav('/editor/employee')
                })
                .catch(err => alert(err.response.data.error))
        } else {
            alert('Please fill all required information')
        }
    }
    const options = [
        { value: 'male', label: 'male' },
        { value: 'female', label: 'female' }
    ];
    const selectStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'none' : 'none',
            padding: 1,
            backgroundColor: "white"
        }),
    }
    const show = 'relative inline-flex px-8 py-3 font-semibold text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full mr-12';
    const handelFetchLead = () => {
        axios
            .get(API)
            .then((res) => {
                const newOptions = res.data.data.map((e) => ({ value: e.leadId, label: e.fullName }));
                setOption(newOptions);
                console.log(newOptions)
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err)
            });
    }
    useEffect(() => {
        handelFetchLead()
    }, [])
    return (
        <div className="flex flex-col mt-8 px-12 py-5 lg:py-4">
            <div className="mb-4">
                <span className="text-2xl lg:text-4xl font-medium text-slate-500">Add Employee</span>
            </div>
            <div className="w-full lg:w-3/4 mb-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
                    <div className="pt-4 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">First Name</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base" placeholder="Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="pt-4 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Last Name</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base" placeholder="Status" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="pt-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Name</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    {/* <div>
                        <h3 className="text-2xl font-medium mb-2">Employee Number</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 rounded px-4 py-2" placeholder="Status" value={employeeNumber} onChange={handalEmployeeNumber} />
                        </div>
                    </div> */}
                    <div className="pt-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Email</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 rounded px-4 py-3 lg:py-2 text-xs lg:text-base " placeholder="Status" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="pt-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Gender</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <Select styles={selectStyle} options={options} defaultValue={value} onChange={setValue} isSearchable />
                        </div>
                    </div>
                    <div className="pt-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Lead</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <Select styles={selectStyle} options={option} defaultValue={value1} onChange={setValue1} isSearchable />
                        </div>
                    </div>
                    <div className="pt-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-4">Practice Lead</h3>
                        <div className="flex flex-row gap-4">
                            <input type="radio" value={true} name="Plead" onClick={() => setLead(true)} />Yes
                            <input type="radio" value={false} name="Plead" onClick={(e) => setLead(false)} />No
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-5 lg:gap-10 pl-10 mt-24 ml-12 lg:mt-20 lg:ml-10 w-full'>
                    <button className='relative inline-flex px-4 py-1 lg:px-8 lg:py-3 font-semibold text-lg lg:text-xl traking-widset hover:bg-slate-600 hover:text-white rounded-full' onClick={() => nav('/editor/employee')}>Cancel</button>
                    <button className={firstName !== '' && lastName !== '' && name !== '' && email !== '' && value1.value !== '' && value.value !== '' ? show : 'relative inline-flex px-4 py-1 lg:px-8 lg:py-3 bg-gray-200 font-semibold text-lg lg:text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12'} onClick={handleSubmit}>Save</button>
                </div>
        </div>
    )
}
export default AddEmployee;