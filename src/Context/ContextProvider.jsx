import React, { useState } from "react";
 
import Context from "./Context";
 
const ContextProvider = ({children}) =>{
 
     const [cilentId,setCilentId] = useState('')         //client_page_clientId
     const [clientName, setClientName]=useState('');     //client_page_clientName
     const [clientStatus, setClientStatus]=useState('')  //client_page_clientStatus

     const [projectId, setProjectId]=useState('')
     const [projectClientId, setProjectClientId]=useState('');
     const [projectClientStatus, setProjectClientStatus]=useState('')
     const [projectName, setProjectName]=useState('')
     const [projectClientName, setProjectClientName]=useState('')
     const [projectDescription, setProjectDescription]=useState('')
     const [projectNote, setProjectNote]=useState('');

     const [chargeActivityId, setChargeActivityId]=useState('')
     const [chargeProjectName, setChargeProjectName]=useState('')
     const [chargeProjectId, setChargeProjectId]=useState('')
     const [chargeCode, setChargeCode]=useState('')
     const [activityType, setActivityType]=useState('')
     const [chargeTask, setChargeTask]=useState('')
     const [chargeNote, setChargeNote]=useState('')
     const [chargeDescription, setChargeDescription]=useState('');

     const [employeeId, setEmployeeId]=useState('');
     const [firstName, setFirstName]=useState('');
     const [lastName, setLastName]=useState('');
     const [email, setEmail]=useState('');
     const [gender, setGender]=useState('');
     const [status, setStatus]=useState('');
     const [leadId, setLeadId]=useState('');
     const [leadName, setLeadName]=useState('');

     const [timesheetId, setTimesheetId]=useState('');
     const [timesheetEmployeeId, setTimesheetEmployeeId]=useState('');
     const [timesheetEmployeeName, setTimesheetEmployeeName]=useState('');
     const [timesheetEmployeeStatus, setTimesheetEmployeeStatus]=useState('');
     const [timesheetClientName, setTimesheetClientName]=useState('');
     const [timesheetClientId, setTimesheetClientId]=useState('');
     const [location, setLocation]=useState('');
     const [note, setNote]=useState('');
     const [startDate, setStartDate]=useState('');
     const [endDate, setEndDate]=useState('');

     const [taskId, setTaskId]=useState('');
     const [taskName, setTaskName]=useState('')
     const [taskEmployeeId, setTaskEmployeeId]=useState('');
     const [taskEmployeeName, setTaskEmployeeName]=useState('')
     const [taskClientId, setTaskClientId]=useState('');
     const [taskProjectId, setTaskProjectId]=useState('');
     const [taskProjectName, setTaskProjectName]=useState('');
     const [taskChargeCode, setTaskChargeCode]=useState('');
     const [taskActivityType, setTaskActivityType]=useState('');
     const [taskEstimatedHours, setTaskEstimatedHours]=useState('');
     const [taskBillable, setTaskBillable]=useState('');
     const [taskStartDate, setTaskStartDate]=useState('');
     const [taskEndDate, setTaskEndDate]=useState('');
     const [taskNote, setTaskNote]=useState('');

     const [week, setWeek]=useState('');
     const [myTimesheetId, setMyTimesheetId]=useState('')
     const [myTimesheettTaskStatus, setMyTimesheetTaskStatus]=useState('');
     const [myTimesheetTotalHours, setMyTimesheetTotalHours]=useState('');
     const [myTimesheetTask, setMyTimesheetTask]=useState('');

     const [approvals_Week, setApprovals_Week]=useState('');
     const [approvals_Id, setApprovals_Id]=useState('');
     const [approvals_TaskStatus, setApprovals_TaskStatus]=useState('');
     const [approvals_TotalHours, setApprovals_TotalHours]=useState('');
     const [approvals_Task, setApprovals_Task]=useState('');
     const [approvals_EmpName,setApprovals_EmpName] = useState('');
     const [approvals_EmpEmail, setApproval_EmpEmail] = useState('')

     

     return(
        <Context.Provider value ={{
            cilentId , setCilentId,
            clientName, setClientName,
            clientStatus, setClientStatus,

            projectId, setProjectId,
            projectClientId, setProjectClientId,
            projectName, setProjectName,
            projectClientName, setProjectClientName,
            projectClientStatus, setProjectClientStatus,
            projectDescription, setProjectDescription,
            projectNote, setProjectNote,

            chargeActivityId, setChargeActivityId,
            chargeProjectName, setChargeProjectName,
            chargeProjectId, setChargeProjectId,
            chargeCode, setChargeCode,
            activityType, setActivityType,
            chargeTask, setChargeTask,
            chargeNote, setChargeNote,
            chargeDescription, setChargeDescription,

            employeeId, setEmployeeId,
            firstName, setFirstName,
            lastName, setLastName,
            email, setEmail,
            gender, setGender,
            status, setStatus,
            leadId, setLeadId,
            leadName, setLeadName,

            timesheetId, setTimesheetId,
            timesheetEmployeeId, setTimesheetEmployeeId,
            timesheetEmployeeName, setTimesheetEmployeeName,
            timesheetEmployeeStatus, setTimesheetEmployeeStatus,
            timesheetClientName, setTimesheetClientName,
            timesheetClientId, setTimesheetClientId,
            location, setLocation,
            note, setNote,
            startDate, setStartDate,
            endDate, setEndDate,

            taskId, setTaskId,
            taskName, setTaskName,
            taskEmployeeId, setTaskEmployeeId,
            taskEmployeeName, setTaskEmployeeName,
            taskClientId, setTaskClientId,
            taskProjectId, setTaskProjectId,
            taskProjectName, setTaskProjectName,
            taskChargeCode, setTaskChargeCode,
            taskActivityType, setTaskActivityType,
            taskEstimatedHours, setTaskEstimatedHours,
            taskBillable, setTaskBillable,
            taskStartDate, setTaskStartDate,
            taskEndDate, setTaskEndDate,
            taskNote, setTaskNote,

            week, setWeek,
            myTimesheetId, setMyTimesheetId,
            myTimesheettTaskStatus, setMyTimesheetTaskStatus,
            myTimesheetTotalHours, setMyTimesheetTotalHours,
            myTimesheetTask, setMyTimesheetTask,

           approvals_Week, setApprovals_Week,
            approvals_Id, setApprovals_Id,
            approvals_TaskStatus, setApprovals_TaskStatus,
            approvals_TotalHours, setApprovals_TotalHours,
            approvals_Task, setApprovals_Task,
            approvals_EmpName,setApprovals_EmpName,
            approvals_EmpEmail, setApproval_EmpEmail,
        }}>
            {children}
        </Context.Provider>
     )
}
 
export default ContextProvider;