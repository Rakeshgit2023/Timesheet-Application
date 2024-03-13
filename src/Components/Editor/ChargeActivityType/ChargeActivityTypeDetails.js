import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const ChargeActivityTypeDetails = () => {
    const editor=Cookies.get('EditorTab')
    const viewer=Cookies.get('ViewerTab')
    const nav = useNavigate();
    const handelDelete = () => {
        if (window.confirm('Are you sure you want to delete') == true) {
            axiosInstance
                .delete(`/deleteChargeActivity/${Cookies.get('chargeActivityId')}`)
                .then(res => {
                    nav('/editor/chargeActivity')
                    Cookies.remove('chargeActivityId')
                    Cookies.remove('chargeActivityProjectName')
                    Cookies.remove('chargeActivityProjectId')
                    Cookies.remove('chargeCode')
                    Cookies.remove('activityType')
                    Cookies.remove('chargeTask')
                    Cookies.remove('chargeDescription') 
                    Cookies.remove('chargeNote')
                })
                .catch(err => alert(err))
        } else {

        } 
    }
    useEffect(()=>{
        if(editor===undefined && viewer===undefined){
            nav('/')
        }
        if(Cookies.get('chargeActivityId')===undefined && editor!==undefined && viewer===undefined){
            nav('/editor/adminDashbord')
        }
        // Cookies.get('chargeActivityId')===undefined && nav('/editor/adminDashbord')
        // Cookies.get('EditorTab')===undefined && nav('/')
    },[])
    return (
        <div className="flex flex-col w-full px-10 py-10 lg:py-10 lg:px-20">
            <div className="flex space-x-20 lg:space-x-40 mb-2 ">
                    <span className='text-base lg:text-4xl font-medium text-slate-500 mt-1 lg:mt-0 mb-2 whitespace-nowrap'>Charge Activity Type Details</span>
                <div className="flex gap-1 space-x-2 relative top-0 lg:top-1">
                    {
                        editor!==undefined && <CiEdit className="text-2xl font-medium cursor-pointer mt-2 rounded-full border-solid border-2 bg-amber-400 " onClick={() => nav('/editor/editChargeActivityType')} />
                    }
                    {
                        editor!==undefined && <RiDeleteBin6Line className="cursor-pointer font-medium text-2xl mt-2" onClick={handelDelete} />
                    }
                </div>
            </div>
            <div className='w-full lg:w-1/2 grid grid-cols-2 gap-5 lg:flex lg:flex-col'>
            <div className='py-6'>
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Project Name
                </h3>
                <div className="flex w-90 flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('chargeActivityProjectName')}></input>
                </div>
            </div>
            <div className="py-6 lg:py-0">
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Charge Code
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('chargeCode')}></input>
                </div>
            </div>
            <div className='py-6'>
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Activity Type
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('activityType')}></input>
                </div>
            </div>
            <div className="py-6 lg:py-0">
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Task
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('chargeTask')}></input>
                </div>
            </div>
            <div className='py-6'>
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Notes
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('chargeNote')}></input>
                </div>
            </div>
            <div className="py-6 lg:py-0">
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Description
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={Cookies.get('chargeDescription')}></input>
                </div>
            </div>
            </div>
        </div>
    )
}
export default ChargeActivityTypeDetails;