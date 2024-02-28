import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Context from '../../../Context/Context';
const API = 'https://timesheetapplication.onrender.com/task';
const TaskAllocationHome = () => {
    const [apiData, setApiData] = useState([]);
    const [filterApiData, setFilterApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const {setTaskId,setTaskName,setTaskEmployeeId,setTaskEmployeeName,setTaskClientId,setTaskProjectId,setTaskProjectName,setTaskChargeCode,setTaskActivityType,setTaskEstimatedHours,setTaskBillable,setTaskStartDate,setTaskEndDate,setTaskNote}=useContext(Context);
    const nav = useNavigate();
    const handelRow=(row)=>{
        nav('/editor/taskDetails')
        const id=row.taskId;
        const t_name=row.task;
        const e_id=row.employee_Info.employeeId;
        const e_name=row.employee_Info.fullName;
        const c_id=row.client_Info.clientId;
        const p_id=row.project_Info.projectId;
        const p_name=row.project_Info.name;
        const c_code=row.chargeCode;
        const a_type=row.activityType;
        const e_hours=row.estimatedHours;
        const billable=row.billable;
        const s_date=row.startDate;
        const e_date=row.endDate;
        const note=row.notes;
        setTaskId({id});
        setTaskName({t_name});
        setTaskEmployeeId({e_id});
        setTaskEmployeeName({e_name})
        setTaskClientId({c_id});
        setTaskProjectId({p_id});
        setTaskProjectName({p_name})
        setTaskChargeCode({c_code});
        setTaskActivityType({a_type});
        setTaskEstimatedHours({e_hours});
        setTaskBillable({billable});
        setTaskStartDate({s_date});
        setTaskEndDate({e_date});
        setTaskNote({note});
    }
    const handleDataFetch = () => {
        setIsProcessing(true)
        axios
            .get(API)
            .then((res) => {
                console.log('Data Process Successfuly');
                console.log(res.data);
                setApiData(res.data.data)
                setFilterApiData(res.data.data);
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
            name: 'Task',
            selector:'taskId',
            selector: 'task',
            sortable: true,
            style:{
                color:'blue',
            },
            cell:(row) => <div className='cursor-pointer' onClick={()=> handelRow(row)}>{row.task}</div>
        },
        {
            name: 'Project',
            selector:'client_Info.clientId',
            selector:'project_Info.projectId',
            selector: 'project_Info.name',
            sortable: true
        },
        {
            name:"Activity Type",
            selector:'chargeCode',
            selector: 'activityType',
            sortable: true
        },
        {
            name: 'Employee',
            selector:'billable',
            selector:'estimatedHours',
            selector:'employee_Info.employeeId',
            selector: 'employee_Info.fullName',
            sortable: true
        },
        {
            name: 'Start Date',
            selector: 'startDate',
            sortable: true
        },
        {
            name: 'End Date',
            selector:'notes',
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
        const newData = filterApiData.filter(row => row.task.toLowerCase().includes(e.target.value.toLowerCase()));
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
                                            <button onClick={() => nav('/editor/addTask')} className='relative inline-flex px-8 py-2 lg:py-3 font-semibold text-base lg:text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300'>ADD</button>
                                        </div>
                                    </>
                                )
                        }
                    </>
            }
        </div>
    )
}
export default TaskAllocationHome;