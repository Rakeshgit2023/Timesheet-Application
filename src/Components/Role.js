import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewer from './images/Viewer.png';
import NavBar from "./NavBar";
import Cookies from "js-cookie";
import axiosInstance from "../utils";
const Role = () => {
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState('')
    const handelEditor = () => {
        nav('/editor/adminDashbord')
        Cookies.set('EditorTab', 1)
    }
    const handelViewer = () => {
        // nav('/viewer/adminDashbord')
        nav('/viewer/adminDashbord')
        Cookies.set('ViewerTab', 2)
    }
    const handelRepotingLead = () => {
        nav('/repotingLead/teamDashbord')
        Cookies.set('RepoteeTab', 3)
    }
    const handelEmployee = () => {
        nav('/employee/myDashboard')
        Cookies.set('EmployeeTab', 4)
    }
    const handelRole = () => {
        let msalAccountKey = sessionStorage.getItem('msal.account.keys')
        if (msalAccountKey !== null) {
            let userData = sessionStorage.getItem(sessionStorage.getItem('msal.account.keys').replace(/[\[\]"]/g, ""))
            let user = JSON.parse(userData);
            axiosInstance
                .get(`/employee/email/${user.username}`)
                .then((res) => {
                    console.log(res, 'rakesh')
                    Cookies.set('userInfo', JSON.stringify(res.data.data[0]))
                    //console.log(sessionStorage.getItem('msal.account.keys').replace(/[\[\]"]/g,""))
                    setUserInfo(res.data.data[0])
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            nav('/')
        }


    }
    useEffect(() => {
        handelRole()

        Cookies.remove('EditorTab')
        Cookies.remove('ViewerTab')
        Cookies.remove('RepoteeTab')
        Cookies.remove('EmployeeTab')

        Cookies.remove('submittedTask')
        Cookies.remove('teamDashboardEmployee')
        Cookies.remove('clientId')
        Cookies.remove('clientName')
        Cookies.remove('clientStatus')

        Cookies.remove('projectClientId')
        Cookies.remove('projectClientName')
        Cookies.remove('projectClientStatus')
        Cookies.remove('projectId');
        Cookies.remove('projectName');
        Cookies.remove('projectDescription')
        Cookies.remove('projectNotes')

        Cookies.remove('chargeActivityId')
        Cookies.remove('chargeActivityProjectName')
        Cookies.remove('chargeActivityProjectId')
        Cookies.remove('chargeCode')
        Cookies.remove('activityType')
        Cookies.remove('chargeTask')
        Cookies.remove('chargeDescription')
        Cookies.remove('chargeNote')

        Cookies.remove('employeeId')
        Cookies.remove('employeeStatus')
        Cookies.remove('leadNameOfEmployee')
        Cookies.remove('leadIdOfEmployee')
        Cookies.remove('effectiveForm')

        Cookies.remove('timesheetSettingId')
        Cookies.remove('timesheetSettingEmployeeId');
        Cookies.remove('timesheetSettingEmployeeName')
        Cookies.remove('timesheetSettingEmployeeStatus')
        Cookies.remove('timesheetSettingClientName')
        Cookies.remove('timesheetSettingClientId')
        Cookies.remove('timesheetSettingLocation')
        Cookies.remove('timesheetSettingNote')
        Cookies.remove('timesheetSettingStartDate')
        Cookies.remove('timesheetSettingEndDate')

        Cookies.remove('taskAllocation');
        Cookies.remove('taskAllocationBillable')

        Cookies.remove('approvalTask')
        Cookies.remove('approvalEmployeeId')

        Cookies.remove('myTimesheetTask')
    }, [])
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex flex-col justify-center items-center bg-gradient-to-t from-indigo-900 via-indigo-600  to-indigo-500 ... h-svh">
                <div className="">
                    <div className="ml-12 py-6">
                        <h3 className="text-4xl font-medium text-white">Select Your role</h3>
                        <div className="w-24 h-2 bg-yellow-500 rounded-md mt-3"></div>
                    </div>
                    <div className="flex justify-around gap-5 w-full mt-10 h-36 lg:h-60 px-4 lg:px-0">
                        <div className="flex flex-col justify-center items-center bg-white border-solid border-8 border-white hover:border-solid hover:border-8 hover:border-yellow-500 rounded-lg cursor-pointer" onClick={handelEditor}>
                            <img src={viewer} alt="viewer" className="rounded-lg w-52 h-44" />
                            <h3 className="font-medium text-base lg:text-xl mb-2 text-indigo-900">Editor</h3>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white border-solid border-8 border-white hover:border-solid hover:border-8 hover:border-yellow-500 rounded-lg cursor-pointer" onClick={handelViewer}>
                            <img src={viewer} alt="viewer" className="rounded-lg w-52 h-44" />
                            <h3 className="font-medium text-base lg:text-xl text-indigo-900 mb-2">Viewer</h3>
                        </div>
                        {
                            userInfo.isLead
                                ?
                                (
                                    <div className="flex flex-col justify-center items-center bg-white border-solid border-8 border-white hover:border-solid hover:border-8 hover:border-yellow-500 rounded-lg cursor-pointer" onClick={handelRepotingLead}>
                                        <img src={viewer} alt="viewer" className="rounded-lg w-52 h-44" />
                                        <h3 className="font-medium text-base lg:text-xl text-indigo-900 mb-2 whitespace-nowrap">Repoting Lead</h3>
                                    </div>
                                )
                                :
                                (
                                    <div className="flex flex-col justify-center items-center bg-white border-solid border-8 border-white hover:border-solid hover:border-8 hover:border-yellow-500 rounded-lg cursor-pointer" onClick={handelEmployee}>
                                        <img src={viewer} alt="viewer" className="rounded-lg w-52 h-44" />
                                        <h3 className="font-medium text-base lg:text-xl text-indigo-900 mb-2 whitespace-nowrap">Employee</h3>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Role;