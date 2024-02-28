import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientHome from "./Pages/Client/ClientHome";
import ProjectHome from "./Pages/Project/ProjectHome";
import ChargeActivityTypeHome from "./Pages/ChargeActivityType/ChargeActivityTypeHome";
import EmployeeHome from "./Pages/Employees/EmployeeHome";
import TimesheetSettingHome from "./Pages/TimesheetSetting/TimesheetSettingHome";
import TaskAllocationHome from "./Pages/TaskAllocation/TaskAllocationHome";
import AddClient from "./Pages/Client/AddClient";
import AddProject from "./Pages/Project/AddProject";
import CreateChargeActivityType from "./Pages/ChargeActivityType/CreateChargeActivityType";
import AddEmployee from "./Pages/Employees/AddEmployee";
import AddTimesheetSetting from "./Pages/TimesheetSetting/AddTimesheetSetting";
import AddTaskAllocation from "./Pages/TaskAllocation/AddTaskAllocation";
import ClientDetails from "./Pages/Client/ClientDetails";
import EditClient from "./Pages/Client/EditClient";
import ProjectDetails from "./Pages/Project/ProjectDetails";
import EditProject from "./Pages/Project/EditProject";
import ChargeActivityTypeDetails from "./Pages/ChargeActivityType/ChargeActivityTypeDetails";
import EditChargeActivityType from "./Pages/ChargeActivityType/EditChargeActivityType";
import EmployeeDetails from "./Pages/Employees/EmployeDetails";
import EditEmployee from "./Pages/Employees/EditEmployee";
import TimesheetSettingDetails from "./Pages/TimesheetSetting/TimesheetSettingDetails";
import TaskDetails from "./Pages/TaskAllocation/TaskDetails";
import MyTimesheet from "./MyTimesheet/MyTimesheet";
import MyContribution from "./MyContribution/MyContribution";
import EditTimesheetSetting from "./Pages/TimesheetSetting/EditTimesheetSetting";
import EditTask from "./Pages/TaskAllocation/EditTask";
import AddMyTimesheet from "./MyTimesheet/AddMyTimesheet";
import Role from "./Role";
const ChildRoute=()=>{
    return(
        <>
        <Routes>

            {/* Client */}
            <Route path="/client" element={<ClientHome/>} />
            <Route path="/addClient" element={<AddClient/>}/>
            <Route path="/clientDetails" element={<ClientDetails/>}/>
            <Route path="/editClient" element={<EditClient/>}/>

             {/* Project */}
            <Route path="/project" element={<ProjectHome />} />
            <Route path="/addProject" element={<AddProject/>}/>
            <Route path="/projectDetails" element={<ProjectDetails/>}/>
            <Route path="/editProject" element={<EditProject/>}/>

            {/* Charge-Activity  */}
            <Route path="/chargeActivity" element={<ChargeActivityTypeHome />} />
            <Route path="/createChargeActivity" element={<CreateChargeActivityType/>}/>
            <Route path="/chargeActivityTypeDetails" element={<ChargeActivityTypeDetails/>}/>
            <Route path="/editChargeActivityType" element={<EditChargeActivityType/>}/>

             {/* Employee */}
            <Route path="/employee" element={<EmployeeHome />} />
            <Route path="/addEmployee" element={<AddEmployee/>}/>
            <Route path="/employeeDetails" element={<EmployeeDetails/>}/>
            <Route path="/editEmployee" element={<EditEmployee/>}/>

             {/* Timesheet-setting */}
            <Route path="/timesheetSetting" element={<TimesheetSettingHome />} />
            <Route path="/addTimeSheetSetting" element={<AddTimesheetSetting/>}/>
            <Route path="/timesheetSettingDetails" element={<TimesheetSettingDetails/>}/>
            <Route path="/editTimesheetSetting" element={<EditTimesheetSetting/>}/>

             {/* Task-Allocation */}
            <Route path="/taskAllocation" element={<TaskAllocationHome />} />
            <Route path="/addTask" element={<AddTaskAllocation/>}/>
            <Route path="/taskDetails" element={<TaskDetails/>}/>
            <Route path="/editTask" element={<EditTask/>}/>

            <Route path="/myTimesheet" element={<MyTimesheet/>}/>
            <Route path="/addMyTimesheet" element={<AddMyTimesheet/>}/>
            <Route path="/MyContribution" element={<MyContribution/>}/>
          </Routes>
        </>
    )
}
export default ChildRoute;