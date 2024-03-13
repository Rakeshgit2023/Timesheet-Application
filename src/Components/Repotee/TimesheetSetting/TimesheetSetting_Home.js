import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from '../../../utils';
const API = 'https://timesheetapplication.onrender.com/timesheetsetting/1000';
const TimesheetSetting_Home = () => {
    const [apiData, setApiData] = useState([]);
    const [filterApiData, setFilterApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const nav = useNavigate();
    const handelRow=(row)=>{
        Cookies.set('timesheetSettingId', row.timesheetId)
        Cookies.set('timesheetSettingEmployeeId',row.employee_Info.employeeId);
        Cookies.set('timesheetSettingEmployeeName',row.fullName)
        Cookies.set('timesheetSettingEmployeeStatus',row.employee_Info.status)
        Cookies.set('timesheetSettingClientName',row.client_Info.name)
        Cookies.set('timesheetSettingClientId',row.client_Info.clientId)
        Cookies.set('timesheetSettingLocation',row.location)
        Cookies.set('timesheetSettingNote',row.notes)
        Cookies.set('timesheetSettingStartDate',row.startDate)
        Cookies.set('timesheetSettingEndDate',row.endDate)
        nav('/repotingLead/timesheetSettingDetails')
    }
    const handleDataFetch = (employeeId) => {
        setIsProcessing(true)
        axiosInstance
            .get(`/timesheetsetting/${employeeId}`)
            .then((res) => {
                console.log('Data Process Successfuly');
                console.log(res.data);
                const a_data= res.data.data.filter((e)=>{
                       e.fullName=e.employee_Info.fName+' '+e.employee_Info.lName;
                       return e;
                   })
                   setApiData(a_data)
                   setFilterApiData(a_data);
                   console.log(a_data)
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err)
                setErrorText(err.message);
                setIsError(true)
            })
            .finally(() => setIsProcessing(false))
    }
    const columns = [
        {
            name: 'Employee',
            selector:'timesheetId',
            selector:'employee_Info.employeeId',
            selector:'employee_Info.status',
            selector: 'fullName',
            sortable: true,
            style:{
                color:'blue',
            },
            cell:(row) => <div className='cursor-pointer' onClick={()=> handelRow(row)}>{row.fullName}</div>
        },
        {
            name: 'Location',
            selector:'notes',
            selector: 'location',
            sortable: true
        },
        {
            name:"Client",
            selector:'client_Info.clientId',
            selector: 'client_Info.name',
            sortable: true
        },
        {
            name: 'Period Start',
            selector: 'startDate',
            sortable: true
        },
        {
            name: 'Period End',
            selector: 'endDate',
            sortable: true
        }
    ];

    const customStyle = {
        headRow: {
            style: {
                backgroundColor: '#b0c4de',
                color: "black"
            }
        },
        headCell: {
            style: {
                fontSize: '16px',
                fontWeight: '600',
                TextTransform: 'uppercase'
            }
        },
        cells: {
            style: {
                fontSize: '15px',

            }
        }
    } 

    useEffect(() => {
        let userData = sessionStorage.getItem('66e5957c-a38f-4d6e-bcc6-6da399a71f6f.06191626-9f52-42fe-8889-97d24d7a6e95-login.windows.net-06191626-9f52-42fe-8889-97d24d7a6e95')
        if(userData!==null && Cookies.get('RepoteeTab')!==undefined){
            setIsProcessing(true);
        handleDataFetch(JSON.parse(Cookies.get('userInfo')).employeeId)
        }else{
            nav('/')
        }
    }, [])

    const handleFilter = (e) => {
        const newData = filterApiData.filter(row => row.fullName.toLowerCase().includes(e.target.value.toLowerCase()));
        setApiData(newData)
    }
    return (
        <div className='flex flex-col px-12 py-4'>
            {
                isProcessing ?
                    <div className='flex justify-center items-center w-full py-20 mt-20'>
                        <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>Loading data.....</h2>
                    </div> :
                    <>
                        {
                            isError ? (
                                <div className='flex justify-center items-center w-full py-20 mt-20'>
                                    <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                                </div>
                            ) :
                                (
                                    <>
                                        <div className='flex justify-end mb-2'>
                                            <input className='outline-none border-5 border-gray-400 rounded px-4 py-2' placeholder='Search here' type='text' onChange={handleFilter} />
                                        </div>
                                        <DataTable
                                            columns={columns}
                                            data={apiData}
                                            pagination
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                                            highlightOnHover
                                            customStyles={customStyle}

                                        />
                                        <div className='flex justify-end mt-4'>
                                            <button onClick={() => nav('/repotingLead/addTimeSheetSetting')} className='relative inline-flex px-8 py-2 lg:py-3 font-semibold text-base lg:text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300'>ADD</button>
                                        </div>
                                    </>
                                )
                        }
                    </>
            }
        </div>
    )
}
export default TimesheetSetting_Home;