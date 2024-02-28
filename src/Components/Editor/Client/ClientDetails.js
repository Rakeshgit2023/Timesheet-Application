import React, { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import AddProjectClientDetails from "./AddProjectClientDetails";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Context from "../../../Context/Context";
import axios from "axios";
const API='https://timesheetapplication.onrender.com/project'
const ClientDetails=()=>{
    const [apiData, setApiData]=useState([])
    const [chargeApiData, setChargeApiData]=useState([])
    const nav=useNavigate();
    const{cilentId,clientName,clientStatus} = useContext(Context)
    const [showAddProjectPopUp, setShowAddProjectPopUp]=useState(false);
    const handelFetchProjectDtat=()=>{
        axios 
            .get(API)
            .then(res=>{
                console.log(res)
             const arr=res.data.data.filter((e,i)=>{
                  return e.client_Info.clientId===cilentId.id;
                })
                setApiData(arr)
                console.log(arr)
                handelFetchChargeActivityData();
            })
            .catch(err=>alert(err.message))
    }
    const handelFetchChargeActivityData=()=>{
        axios   
            .get('https://timesheetapplication.onrender.com/chargeactivity')
            .then(res=>{
                setChargeApiData(res.data.data);
                console.log(chargeApiData);
                console.log(res.data.data)
            })
            .catch(err=>alert(err.message))
    }
    useEffect(()=>{
        handelFetchProjectDtat();
    },[])
        useEffect(()=>{
            if(cilentId.id===undefined)
            nav('/editor/adminDashbord');
        },[])
    const columns =[
        {
            name:'Name',
            selector:row=>row.projectId,
            selector:row=>row.name,
            sortable:true
        },
        {
            name:'Description',
            selector:row=>row.descriptions,
            sortable:true
        },
        {
            name:'Note',
            selector:row=>row.notes,
            sortable:true
        },
        {
            cell: (row) => (
                <div>
                  <RiDeleteBin6Line
                    style={{ marginLeft: 40, paddingLeft: 10 }}
                    className="cursor-pointer font-medium text-3xl"
                    onClick={() => handelDeletProject(row)}
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
        setShowAddProjectPopUp(false);
       handelFetchProjectDtat()
    }
    const handelDelete=()=>{
        if(apiData.length===0){
            if(window.confirm('Are you sure you want to delete')==true){
                axios
            .delete(`https://timesheetapplication.onrender.com/deleteClient/${cilentId.id}`)
            .then(res=>{
               // alert('Data Deleted Successfuly')
                console.log(res)
                nav('/editor/client')
            })
            .catch(err=>alert(err.response.data.error))
            }else{

            }
        }else{
            alert('This client is associated.Therefore,delete is not allowed')
        }
    }
    const handelDeletProject=(row)=>{
        console.log(row.projectId)
        for (var i=0;i<chargeApiData.length;i++){
            if(chargeApiData[i].project_Info.projectId===row.projectId){
                var match_Id=chargeApiData[i].project_Info.projectId;
                break;
            }
        }
    if(match_Id!==row.projectId){
        if(window.confirm('Are you sure you want to delete')==true){
            axios
            .delete(`https://timesheetapplication.onrender.com/deleteProject/${row.projectId}`)
            .then(res=>{
               // alert('Data Deleted Successfuly')
                console.log(res)
                handelFetchProjectDtat()
            })
            .catch(err=>console.log(err))
        }else{

         }
    }else{
        alert('This Project is already used in Charge Code.Therefore, delete is not allowed')
    }
         
    }
    return(
        <div className="flex flex-col mt-8 px-6 lg:px-12 py-4">
            <div className="flex space-x-28 lg:space-x-40 mb-4">
                <span className="text-2xl lg:text-4xl font-medium text-slate-500 whitespace-nowrap">Client Details</span>
                <div className="flex gap-1 space-x-2 relative top-0 lg:top-1">
                    <CiEdit className="text-2xl font-medium cursor-pointer mt-2 rounded-full border-solid border-2 bg-amber-400 " onClick={()=>nav('/editor/editClient')} />
                    <RiDeleteBin6Line onClick={handelDelete} className="cursor-pointer font-medium text-2xl mt-2" />
                </div>
            </div>
            <div className="w-8/12 lg:w-1/2 mb-8">
                <div className="py-6">
                    <h3 className="text-sm lg:text-2xl font-medium mb-2">Name</h3>
                    <div className="flex w-90 flex-col gap-6">
                        <input className="outline-none border-5 border-gray-400 bg-gray-100 rounded px-2 py-2 lg:px-4 text-xs lg:text-base" readOnly={true} placeholder="Name" value={clientName.c_name} id="name" name="name" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm lg:text-2xl font-medium mb-2">Status</h3>
                    <div className="flex w-90 flex-col gap-6">
                        <input className="outline-none border-5 border-gray-400 bg-gray-100 rounded px-2 py-2 lg:px-4 text-xs lg:text-base" readOnly={true} placeholder="Status" value={clientStatus.c_status} id="name" name="status"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg lg:text-2xl font-medium mb-0 lg:mb-2">List of project</h3>
                {clientStatus.c_status==='Avtive' || clientStatus.c_status==='active' && <button onClick={()=>setShowAddProjectPopUp(true)} className="relative inline-flex lg:px-8 lg:py-3 px-4 py-2 font-semibold text-lg lg:text-xl traking-widset bg-slate-400 hover:bg-slate-600 hover:text-white rounded-full">Add Project</button>}
            </div>
            <div className="">
                <DataTable columns={columns}
                       data={apiData}
                       pagination
                       paginationPerPage={5}
                       paginationRowsPerPageOptions={[3,4]}
                       highlightOnHover
                       fixedHeader
                       customStyles={customStyle}
            />
            </div>
            <AddProjectClientDetails visible={showAddProjectPopUp} onClose={handalOnClose}/>
        </div>
    )
}
export default ClientDetails;