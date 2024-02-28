import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "../../../Context/Context";
import { RxCross1 } from "react-icons/rx";
const API = 'https://timesheetapplication.onrender.com/addProject'
const AddProjectClientDetails = ({ visible, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const { cilentId, clientName } = useContext(Context)
  const handleSubmit = (e) => {
    // e.preventDefault()
    const req = {
      name: projectName,
      notes: note,
      descriptions: description,
      clientId: cilentId.id
    }
    console.log(req);
    handleAddNewData(req);
    setProjectName('')
    setDescription('')
    setNote('')
    //onClose()

  }
  const handleAddNewData = (req) => {
    projectName !== '' && axios
      .post(API, req)
      .then((res) => {
        console.log(res.data)
      })
      .catch(err => alert(err.response.data.error))
  }
  const handleClose = (e) => {
    if (e.target.id === 'container')
      onClose();
  }
  if (!visible) {
    return null;
  }
  return (
    <div id="container" className="fixed inset-0 flex items-top justify-end mt-10 lg:mt-6">
      <div className="bg-white p-2 rounded w-48 lg:w-72 h-max mt-10">
        <div className="flex py-2 justify-between">
          <span className="font-semibold text-center text-base lg:text-xl text-slate-900">
            Add Project
          </span>
          <RxCross1 onClick={onClose} className=" mt-1" />
        </div>
        <hr />
        {/* <form onSubmit={handleSubmit}> */}
        <div className="flex flex-col mt-2 lg:mt-3">
          <div>
            <h3 className="font-semibold text-sm lg:text-lg text-gray-700">ClientId</h3>
            <input
              type="text"
              value={clientName.c_name}
              className="outline-none border border-5 border-gray-300 bg-gray-100 rounded p-1 mb-2 w-40 lg:w-60"
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm lg:text-lg text-gray-700">Project Name</h3>
            <input
              type="text"
              value={projectName} id="projectName" name="projectName" onChange={(e) => setProjectName(e.target.value)}
              className="border border-gray-700 lg:p-1 rounded mb-2 w-40 lg:w-60"
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm lg:text-lg text-gray-700">Description</h3>
            <input
              type="text"
              value={description} id="description" name="description" onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-700 lg:p-1 rounded mb-2 w-40 lg:w-60"
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm lg:text-lg text-gray-700">Notes</h3>
            <input
              type="text"
              value={note} id="note" name="note" onChange={(e) => setNote(e.target.value)}
              className="border border-gray-700 lg:p-1 rounded mb-2 w-40 lg:w-60"
            />
          </div>
        </div>
        <div className="text-center mt-2 lg:mt-5">
          <button id="container" onClick={handleSubmit} className="px-5 py-1 lg:px-5 lg:py-2 text-sm lg:text-base bg-gray-700 text-white rounded">
            Add
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
export default AddProjectClientDetails;