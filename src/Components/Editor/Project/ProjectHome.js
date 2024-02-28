import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Context from '../../../Context/Context';
const API = 'https://timesheetapplication.onrender.com/project';
const ProjectHome = () => {
    const [apiData, setApiData] = useState([]);
    const [filterApiData, setFilterApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const nav = useNavigate();
    const {setProjectId}=useContext(Context);
    const {setProjectClientId}=useContext(Context);
    const {setProjectName}=useContext(Context);
    const {setProjectClientName}=useContext(Context);
    const {setProjectClientStatus}=useContext(Context);
    const {setProjectDescription}=useContext(Context);
    const {setProjectNote}=useContext(Context);
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
    const handelRow=(row)=>{
        nav('/editor/projectDetails')
        const id=row.projectId;
        const clientId=row.client_Info.clientId;
        const name=row.name;
        const clientName=row.client_Info.name;
        const description=row.descriptions;
        const note=row.notes;
        const status=row.client_Info.status;
        setProjectId({id})
        setProjectClientId({clientId});
        setProjectName({name});
        setProjectClientName({clientName});
        setProjectClientStatus({status})
        setProjectDescription({description});
        setProjectNote({note})
    }
    const columns = [
        {
            name: 'NAME',
            selector:row=>row.projectId,
            selector:row=>row.name,
            sortable: true,
            style:{
                color:'blue',
            },
            cell:(row) => <div className='cursor-pointer' onClick={()=> handelRow(row)}>{row.name}</div>
        },
        {
            name: 'CLIENT',
            selector:row=>row.client_Info.status,
            selector:row=>row.client_Info.name,
            sortable: true
        },
        {
            name:"DESCRIPTION",
            selector:row=>row.descriptions,
            sortable: true
        },
        {
            name: 'NOTE',
            selector: row=>row.notes,
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
        const newData = filterApiData.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()));
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
                                            <button onClick={() => nav('/editor/addProject')} className='relative inline-flex px-8 py-2 lg:py-3 font-semibold text-base lg:text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300'>ADD</button>
                                        </div>
                                    </>
                                )
                        }
                    </>
            }
        </div>
    )
}
export default ProjectHome;