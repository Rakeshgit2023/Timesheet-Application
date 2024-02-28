import React from "react";
const EditEmployee = () => {
    return (
        <div className="flex flex-col px-20 py-12">
            <span className='text-4xl font-medium text-slate-500'>Rakesh Shaw</span>
            <div className="flex flex-col mt-10 px-10 py-8 w-full bg-white rounded-md shadow-2xl">
                <span className='text-2xl font-medium text-slate-500'>Employee Info</span>
                <div className=" flex justify-between items-center w-1/2 mt-5">
                    <span className='font-medium text-lg text-slate-500'>Status</span>
                    <div className=" w-8/12">
                        <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 w-full'>
                            <option></option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Relived</option>
                        </select>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-slate-200 mt-6 mb-6"></div>
                <div className="mb-4">
                    <span className='text-2xl font-medium text-slate-500'>Lead Info</span>
                </div>
                <div className="grid grid-cols-2 mt-10">
                    <div className=" flex justify-between items-center w-full mb-20">
                        <span className='font-medium text-lg text-slate-500'>Lead</span>
                        <div className="w-8/12">
                            <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full mb-20">
                        <span className='font-medium text-lg text-slate-500'>Effective Form</span>
                        <div className="w-8/12">
                            <input className='outline-none cursor-pointer border-5 border-gray-400 bg-slate-100  rounded px-4 py-2 mr-2 w-11/12 font-normal text-lg' type="date" />
                            {/* <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select> */}
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full">
                        <span className='font-medium text-lg text-slate-500'>Requested By</span>
                        <div className="w-8/12">
                            <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full">
                        <span className='font-medium text-lg text-slate-500'>Reason</span>
                        <div className="w-8/12">
                            <select className='outline-none border-5 border-gray-400 bg-slate-100  rounded px-20 py-2 mr-2 w-11/12'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-10 w-full relative bottom-9 left-0 ... mt-20">
                <button className='relative inline-flex px-8 py-3 bg-gray-200 font-semibold text-xl text-gray-400 traking-widset rounded-full border-solid border-2 border-gray-400 ... mr-12'>Save</button>
                </div>
            </div>
        </div>
    )
}
export default EditEmployee;