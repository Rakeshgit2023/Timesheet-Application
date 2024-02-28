import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Context from '../../../Context/Context';
const API = 'https://timesheetapplication.onrender.com/timesheetsetting';
const TimesheetSettingHome = () => {
    const [apiData, setApiData] = useState([]);
    const [filterApiData, setFilterApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const nav = useNavigate();
    const {setTimesheetId,setTimesheetEmployeeId,setTimesheetEmployeeName,setTimesheetEmployeeStatus,setTimesheetClientName,setTimesheetClientId,setLocation,setNote,setStartDate,setEndDate}=useContext(Context);

    const handelRow=(row)=>{
        nav('/editor/timesheetSettingDetails')
        const id=row.timesheetId;
        const e_id=row.employee_Info.employeeId
        const e_name=row.fullName;
        const e_status=row.employee_Info.status
        const c_name=row.client_Info.name;
        const c_id=row.client_Info.clientId;
        const location=row.location;
        const note=row.notes;
        const s_date=row.startDate;
        const e_date=row.endDate;
        console.log(e_name)

        setTimesheetId({id});
        setTimesheetEmployeeId({e_id});
        setTimesheetEmployeeName({e_name});
        setTimesheetEmployeeStatus({e_status})
        setTimesheetClientName({c_name});
        setTimesheetClientId({c_id});
        setLocation({location});
        setNote({note});
        setStartDate({s_date});
        setEndDate({e_date});

    }
    const handleDataFetch = () => {
        setIsProcessing(true)
        axios
            .get(API)
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
        setIsProcessing(true);
        handleDataFetch()
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
                        <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20 whitespace-nowrap'>Loading data.....</h2>
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
                                            <input className='outline-none border-5 border-gray-400 rounded px-2 py-1 lg:px-4 lg:py-2' placeholder='Search here' type='text' onChange={handleFilter} />
                                        </div>
                                        <DataTable
                                            columns={columns}
                                            data={apiData}
                                            pagination
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                                            highlightOnHover
                                            customStyles={customStyle}
                                            onRowDoubleClicked={handelRow}

                                        />
                                        <div className='flex justify-end mt-4'>
                                            <button onClick={() => nav('/editor/addTimeSheetSetting')} className='relative inline-flex px-8 py-2 lg:py-3 font-semibold text-base lg:text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300'>ADD</button>
                                        </div>
                                    </>
                                ) 
                        }
                    </>
            }
        </div>
    )
}
export default TimesheetSettingHome;