import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import AddChargeCodeProjectDetails from "./AddChargeCodeProjectDetails";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const ProjectDetails = () => {
    const editor=Cookies.get('EditorTab')
    const viewer=Cookies.get('ViewerTab')
    const nav=useNavigate();
    const [apiData, setApiData]=useState([]);
    const [showAddChargeCodePopUp, setShowAddChargeCodePopUp]=useState(false);
    
    const columns = [
        {
            name: 'Charge Code',
            selector:row=>row.chargeActivityId,
            selector:row=>row.chargeCode,
            sortable: true
        },
        {
            name: 'Activity Type',
            selector:row=>row.activityType,
            sortable: true
        },
        {
            name: 'Task',
            selector:row=>row.task,
            sortable: true
        },
        {
            name: 'Description',
            selector:row=>row.descriptions,
            sortable: true
        },
        {
            name: 'Note',
            selector:row=>row.notes,
            sortable: true
        },
        {
            cell: (row) => (
                <div>
                  <RiDeleteBin6Line
                    style={{ marginLeft: 60, paddingLeft: 10 }}
                    className={`cursor-pointer font-medium text-3xl ${viewer!==undefined && 'invisible'}`}
                     onClick={() => handelDeletChargeActivity(row)}
                  />
                </div>
              ),
        }
    ]
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
    const handalOnClose=()=>{
        setShowAddChargeCodePopUp(false);
        handelFetchChargeActivityData();
    }
    const handelDelete=()=>{
        if(apiData.length===0){
            if(window.confirm('Are you sure you want to delete')==true){
                axiosInstance
        .delete(`/deleteProject/${Cookies.get('projectId')}`)
        .then(res=>{
            console.log(res)
            nav('/editor/project')
            Cookies.remove('projectId');
        Cookies.remove('projectClientId');
        Cookies.remove('projectName');
        Cookies.remove('projectClientName')
        Cookies.remove('projectClientStatus')
        Cookies.remove('projectDescription')
        Cookies.remove('projectNotes')
        })
        .catch(err=>console.log(err))
            }else{

            }
        }else{
            alert('This Charge Code is already assigned to an Employee')
        }
    }
    const handelFetchChargeActivityData=()=>{
        axiosInstance
            .get('/chargeactivity')
            .then(res=>{
             const arr=res.data.data.filter((e,i)=>{
                  return e.project_Info.projectId===Number(Cookies.get('projectId'));
                })
                setApiData(arr)
            })
            .catch(err=>alert(err.message))
    }
    useEffect(()=>{
        if(editor!==undefined || viewer!==undefined){
            handelFetchChargeActivityData();
        }else{
            nav('/')
        }
        if(Cookies.get('projectId')===undefined && editor!==undefined && viewer===undefined){
            nav('/editor/adminDashbord')
        }
        // handelFetchChargeActivityData();
        // Cookies.get('projectId')===undefined && nav('/editor/adminDashbord')
        // Cookies.get('EditorTab')===undefined && nav('/')
    },[])
    const handelDeletChargeActivity=(row)=>{
        if(window.confirm('Are you sure you want to delete')==true){
            axiosInstance
            .delete(`/deleteChargeActivity/${row.chargeActivityId}`)
            .then(res=>{
               // alert('Data Deleted Successfuly')
                console.log(res)
                handelFetchChargeActivityData()
            })
            .catch(err=>console.log(err))
        }else{

        }
    }
    return (
        <div className="flex flex-col mt-8 px-6 lg:px-12 py-4">
            <div className="flex space-x-28 lg:space-x-40 mb-10">
                <span className="text-2xl lg:text-4xl font-medium text-slate-500 whitespace-nowrap">Project Details</span>
                <div className="flex gap-1 space-x-2 relative top-0 lg:top-1">
                    {
                        editor!==undefined && <CiEdit className="text-2xl font-medium cursor-pointer mt-2 rounded-full border-solid border-2 bg-amber-400 " onClick={()=>nav('/editor/editProject')} />
                    }
                    {
                        editor!==undefined && <RiDeleteBin6Line className="cursor-pointer font-medium text-2xl mt-2" onClick={handelDelete}/>
                    }
                </div>
            </div>
            <div className="w-11/12 lg:w-3/4 mb-8">
                <div className="grid grid-cols-2 gap-4 lg:gap-8">
                    <div className="py-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Project Name</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 bg-gray-100 rounded px-2 py-2 lg:px-4 text-xs lg:text-base" readOnly={true} placeholder="Name" value={Cookies.get('projectName')} />
                        </div>
                    </div>
                    <div className="py-3 lg:py-6">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Client</h3>
                        <div className="flex w-90 flex-col gap-1">
                            <input className="outline-none border-5 border-gray-400 bg-gray-100 rounded px-2 py-2 lg:px-4 text-xs lg:text-base" readOnly={true} placeholder="Status" value={Cookies.get('projectClientName')} />
                            {(Cookies.get('projectClientStatus')==='inactive' || Cookies.get('projectClientStatus')==='Inactive') && <span className="text-red-600">This client is Inactive</span>}
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Note</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 bg-gray-100 rounded px-2 py-2 lg:px-4 text-xs lg:text-base" readOnly={true} placeholder="Name" value={Cookies.get('projectNotes')} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm lg:text-2xl font-medium mb-2">Description</h3>
                        <div className="flex w-90 flex-col gap-6">
                            <input className="outline-none border-5 border-gray-400 bg-gray-100 rounded px-2 py-2 lg:px-4 text-xs lg:text-base" readOnly={true} placeholder="Status" value={Cookies.get('projectDescription')}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-10 mb-4">
                <h3 className="text-base lg:text-2xl font-medium mb-0 lg:mb-2 whitespace-nowrap">List of Charge Code</h3>
                {(Cookies.get('projectClientStatus')==='active'|| Cookies.get('projectClientStatus')==='Active') && <button className={`relative inline-flex lg:px-8 lg:py-3 px-4 py-2 font-semibold text-xs lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full whitespace-nowrap ${viewer!==undefined && 'invisible'}`} onClick={()=>setShowAddChargeCodePopUp(true)}>Create Charge code</button>}
            </div>
            <div className="">
                <DataTable columns={columns}
                    data={apiData}
                    pagination
                    paginationPerPage={3}
                    paginationRowsPerPageOptions={[3,4,5]}
                    highlightOnHover
                    fixedHeader
                    customStyles={customStyle}
                />
            </div>
            <AddChargeCodeProjectDetails visible={showAddChargeCodePopUp} onClose={handalOnClose}/>
        </div>
    )
}
export default ProjectDetails;