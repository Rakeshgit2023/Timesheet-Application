import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Context from "../../../Context/Context";
import axios from "axios";
const ChargeActivityTypeDetails = () => {
    const nav = useNavigate();
    const { chargeActivityId, chargeProjectName, chargeCode, activityType, chargeTask, chargeNote, chargeDescription } = useContext(Context);
    const handelDelete = () => {
        if (window.confirm('Are you sure you want to delete') == true) {
            axios
                .delete(`https://timesheetapplication.onrender.com/deleteChargeActivity/${chargeActivityId.id}`)
                .then(res => {
                    nav('/editor/chargeActivity')
                })
                .catch(err => alert(err))
        } else {

        }
    }
    return (
        <div className="flex flex-col w-full px-10 py-10 lg:py-10 lg:px-20">
            <div className="flex space-x-20 lg:space-x-40 mb-2 ">
                    <span className='text-base lg:text-4xl font-medium text-slate-500 mt-1 lg:mt-0 mb-2 whitespace-nowrap'>Charge Activity Type Details</span>
                <div className="flex gap-1 space-x-2 relative top-0 lg:top-1">
                    <CiEdit className="text-2xl font-medium cursor-pointer mt-2 rounded-full border-solid border-2 bg-amber-400 " onClick={() => nav('/editor/editChargeActivityType')} />
                    <RiDeleteBin6Line className="cursor-pointer font-medium text-2xl mt-2" onClick={handelDelete} />
                </div>
            </div>
            <div className='w-full lg:w-1/2 grid grid-cols-2 gap-5 lg:flex lg:flex-col'>
            <div className='py-6'>
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Project Name
                </h3>
                <div className="flex w-90 flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={chargeProjectName.projectName}></input>
                </div>
            </div>
            <div className="py-6 lg:py-0">
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Charge Code
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={chargeCode.chargeCode}></input>
                </div>
            </div>
            <div className='py-6'>
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Activity Type
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={activityType.activityType}></input>
                </div>
            </div>
            <div className="py-6 lg:py-0">
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Task
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={chargeTask.task}></input>
                </div>
            </div>
            <div className='py-6'>
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Notes
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={chargeNote.note}></input>
                </div>
            </div>
            <div className="py-6 lg:py-0">
                <h3 className='text-sm lg:text-2xl font-medium mb-2' >
                    Description
                </h3>
                <div className="flex  w-90  flex-col gap-6 ">
                    <input className='outline-none border-5 border-gray-400 bg-gray-100 rounded px-4 py-3 lg:py-2 text-xs lg:text-base' readOnly={true} value={chargeDescription.description}></input>
                </div>
            </div>
            </div>
        </div>
    )
}
export default ChargeActivityTypeDetails;