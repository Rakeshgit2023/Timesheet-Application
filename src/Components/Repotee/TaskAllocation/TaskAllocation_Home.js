import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Context from '../../../Context/Context';
import Cookies from 'js-cookie';
import axiosInstance from '../../../utils';
const TaskAllocation_Home = () => {
    const [apiData, setApiData] = useState([]);
    const [filterApiData, setFilterApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const {setTaskId,setTaskName,setTaskEmployeeId,setTaskEmployeeName,setTaskClientId,setTaskProjectId,setTaskProjectName,setTaskChargeCode,setTaskActivityType,setTaskEstimatedHours,setTaskBillable,setTaskStartDate,setTaskEndDate,setTaskNote}=useContext(Context);
    const nav = useNavigate();
    const handelRow=(row)=>{
        const taskAllocation={
            taskId:row.taskId,
            taskName:row.task,
            employeeId:row.employee_Info.employeeId,
            employeeName:row.employee_Info.fullName,
            clientId:row.client_Info.clientId,
            projectId:row.project_Info.projectId,
            projectName:row.project_Info.name,
            chargeCode:row.chargeCode,
            activityType:row.activityType,
            estimatedHours:row.estimatedHours,
            startDate:row.startDate,
            endDate:row.endDate,
            note:row.notes
           }
   
           Cookies.set('taskAllocation',JSON.stringify(taskAllocation));
           Cookies.set('taskAllocationBillable',row.billable)
        nav('/repotingLead/taskDetails')
    }
    const handleDataFetch = (employeeId) => {
        setIsProcessing(true)
        axiosInstance
            .get(`/task/${employeeId}`)
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
        let userData = sessionStorage.getItem('66e5957c-a38f-4d6e-bcc6-6da399a71f6f.06191626-9f52-42fe-8889-97d24d7a6e95-login.windows.net-06191626-9f52-42fe-8889-97d24d7a6e95')
        if(userData!==null && Cookies.get('RepoteeTab')!==undefined){
            setIsProcessing(true);
            handleDataFetch(JSON.parse(Cookies.get('userInfo')).employeeId)
        }else{
            nav('/')
        }
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

                                        />
                                        <div className='flex justify-end mt-4'>
                                            <button onClick={() => nav('/repotingLead/addTask')} className='relative inline-flex px-8 py-2 lg:py-3 text-lg lg:text-xl font-semibold traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300'>ADD</button>
                                        </div>
                                    </>
                                )
                        }
                    </>
            }
        </div>
    )
}
export default TaskAllocation_Home;