import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Context from '../../../Context/Context';
import Cookies from 'js-cookie';
import axiosInstance from '../../../utils';
const Employee_Home = () => {
    const {setEmployeeId,setFirstName,setLastName,setEmail,setGender,setStatus,setLeadId,setLeadName}=useContext(Context);
    const [activeState, setActiveState] = useState(true);
    const [inActiveState, setInActiveState] = useState(false);
    //const [relivedState, setRelivedState] = useState(false);

    const [activeApiData, setActiveApiData] = useState([]);
    const [inactiveApiData, setInactiveApiData]=useState([])
    const [filterActiveApiData, setFilterActiveApiData] = useState([]);
    const [filterInactiveApiData, setFilterInactiveApiData]=useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const nav = useNavigate();

    const handleDataFetch = (employeeId) => {
        console.log(employeeId)
        setIsProcessing(true)
        axiosInstance
            .get(`/employee/${employeeId}`)
            .then((res) => {
                console.log('Data Process Successfuly');
                console.log(res.data.data);
                console.log(res.data.data)
               const a_data= res.data.data.filter((e)=>{
                 if(e.status==='active'){
                    e.fullName=e.fName+' '+e.lName;
                    return e;
                 }
                })
                setActiveApiData(a_data)
                setFilterActiveApiData(a_data);
                const i_data= res.data.data.filter((e)=>{
                     if(e.status==='inactive'){
                        e.fullName=e.fName+' '+e.lName;
                        return e;
                     }
                  })
                setInactiveApiData(i_data)
                setFilterInactiveApiData(i_data)
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err)
                setErrorText(err.message);
                setIsError(true)
            })
            .finally(() => setIsProcessing(false))
    }
    const handalActiveState = () => {
        setActiveState(true);
        setInActiveState(false);
       // setRelivedState(false);
    }
    const handalInActiveState = () => {
        setActiveState(false);
        setInActiveState(true);
        //setRelivedState(false);
    }
    // const handalRelivedState = () => {
    //     setActiveState(false);
    //     setInActiveState(false);
    //     setRelivedState(true);
    // }
    const handelRow=(row)=>{
        Cookies.set('employeeId',row.employeeId);
          nav('/repotingLead/employeeDetails');
    }
    const columns = [
        {
            name: 'Employment No',
            selector: 'employeeId',
            sortable: true
        },
        {
            name: 'Name',
            selector:'fName',
            selector:'lName',
            selector:'gender',
            selector: 'fullName',
            sortable: true,
            style:{
                color:'blue',
            },
            cell:(row) => <div className='cursor-pointer' onClick={()=> handelRow(row)}>{row.fullName}</div>
        },
        {
            name: "Email",
            selector: 'email',
            sortable: true
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true
        },
        {
            name: 'Lead',
            selector:'leadId',
            selector: 'leadName',
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
        let msalAccountKey=sessionStorage.getItem('msal.account.keys')
        if(msalAccountKey!==null && Cookies.get('RepoteeTab')!==undefined){
            setIsProcessing(true);
        handleDataFetch(JSON.parse(Cookies.get('userInfo')).employeeId)
        }else{
            nav('/')
        }
    }, [])

    const handleActiveFilter = (e) => {
        const newData = filterActiveApiData.filter(row => row.fullName.toLowerCase().includes(e.target.value.toLowerCase()));
        setActiveApiData(newData)
    }
    const handleInactiveFilter = (e) => {
        const newData = filterInactiveApiData.filter(row => row.fullName.toLowerCase().includes(e.target.value.toLowerCase()));
        setInactiveApiData(newData)
    }
    return (
        <div className='flex flex-col pr-5 pl-12 lg:px-12 py-4'>
            <div className='flex justify-between gap-5 lg:gap-0 mb-2'>
                <div className='flex gap-4 pr-4 lg:pr-0 lg:px-10 mt-1'>
                    <div>
                        <span className='cursor-pointer text-sm lg:text-base' onClick={handalActiveState}>Active</span>
                        <div className={activeState ? 'w-13 h-0.5 bg-slate-900 rounded-md' : 'w-11 h-0.5 bg-slate-400 rounded-md'}></div>
                    </div>
                    <div>
                        <span className='cursor-pointer text-sm lg:text-base' onClick={handalInActiveState}>Inactive</span>
                        <div className={inActiveState ? 'w-13 h-0.5 bg-slate-900 rounded-md' : 'w-11 h-0.5 bg-slate-400 rounded-md'}></div>
                    </div>
                    {/* <div>
                        <span className='cursor-pointer' onClick={handalRelivedState}>Relived</span>
                        <div className={relivedState ? 'w-13 h-0.5 bg-slate-900 rounded-md' : ''}></div>
                    </div> */}
                </div>
                <input className='outline-none border-5 border-gray-400 rounded px-2 lg:px-4 py-2' placeholder='Search here' type='text' onChange={activeState===true ?handleActiveFilter:handleInactiveFilter} />
            </div>
            {
                activeState === true && inActiveState === false
                    ?
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
                                            <DataTable
                                                columns={columns}
                                                data={activeApiData}
                                                pagination
                                                paginationPerPage={10}
                                                paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                                                highlightOnHover
                                                customStyles={customStyle}

                                            />
                                        </>
                                    )
                            }
                        </>
                    :
                    (activeState === false && inActiveState === true)
                        &&
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
                                                <DataTable
                                                    columns={columns}
                                                    data={inactiveApiData}
                                                    pagination
                                                    paginationPerPage={10}
                                                    paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                                                    highlightOnHover
                                                    customStyles={customStyle}
                                                 onRowDoubleClicked={handelRow}

                                                />
                                            </>
                                        )
                                }
                            </>
                        // :
                        // (activeState === false && inActiveState === false && relivedState === true)
                        //     &&
                        //     isProcessing ?
                        //     <div className='flex justify-center items-center w-full py-20 mt-20'>
                        //         <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>Loading data.....</h2>
                        //     </div> :
                        //     <>
                        //         {
                        //             isError ? (
                        //                 <div className='flex justify-center items-center w-full py-20 mt-20'>
                        //                     <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                        //                 </div>
                        //             ) :
                        //                 (
                        //                     <>
                        //                         <DataTable
                        //                             columns={columns3}
                        //                             data={apiData}
                        //                             pagination
                        //                             paginationPerPage={10}
                        //                             paginationRowsPerPageOptions={[4, 5, 6, 7, 10]}
                        //                             highlightOnHover
                        //                             customStyles={customStyle}
                        //                         // onRowDoubleClicked={handelRow}

                        //                         />
                        //                     </>
                        //                 )
                        //         }
                        //     </>

            }
            {/* <div className='flex justify-end mt-4'>
                <button className='relative inline-flex px-8 py-3 font-semibold text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300' onClick={() => nav('/editor/addEmployee')}>ADD</button>
            </div> */}
        </div>
    )
}
export default Employee_Home;