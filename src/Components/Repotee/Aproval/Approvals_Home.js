
import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import Context from "../../../Context/Context";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";


const Approvals_Home = () => {
  const { setApprovals_Week, setApprovals_Id, setApprovals_TaskStatus, setApprovals_TotalHours, setApprovals_Task ,setApprovals_EmpName,setApproval_EmpEmail} = useContext(Context)
  const [apiData, setApiData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const nav = useNavigate();


  const [practiceLeadValue, setPracticeLeadValue] = useState({value:0,label:''});
  const [option_pl, setOption_pl] = useState([]);
  const [option_plChild, setOption_plChild] = useState([]);
  const [RepoteeValue, setRepoteeValue] = useState({value:0,label:''});




  const [optionsYear, setOptionsYear] = useState([]);
  const currentYear = new Date().getFullYear(); // Get current year
  const previousYear = currentYear - 1;
  const [year,setYear] = useState({ value:currentYear,label:`${previousYear}-${currentYear}`});
  const [statusValue, setStatusValue] = useState({value:'submit',label:'Submitted'});
    
  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "none" : "none",
      padding: 1,
      backgroundColor: "white",
    }),
  };
 


  const yearOption = [
    { value: currentYear, label: `${currentYear-1}-${currentYear}` },
    { value: currentYear-1, label: `${currentYear-2}-${currentYear-1}`},
    { value: currentYear-2, label: `${currentYear-3}-${currentYear-2}`},
  ];

  const options_status = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    // { value: "Pratially Submitted", label: "Pratially Submitted" },
    {value:'submit',label:'Submitted'},
    // { value: "Pratially Approved", label: "Pratially Approved" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleDataFetch = (leadId) => {
    setIsProcessing(true);
    // const apiUrl = `${API}?year=${value}&rlpl=${option_pl.value}&directReportee=${RepoteeValue}&status=${statusValue}`;
    // const apiUrl = `${API}/${statusValue}`;
   console.log(year.value,practiceLeadValue.value,RepoteeValue.value,statusValue.value);
    axiosInstance
      .get(`/approval/${year.value}/${leadId}/${RepoteeValue.value}/${statusValue.value}`)
      .then((res) => {
        console.log("Data Process Successfuly");
        console.log(res.data);
        setApiData(res.data.data);
      })
      .catch((err) => {
        console.log("Data Process Error");
        console.log(err);
        setErrorText(err.message);
        setIsError(true);
      })
      .finally(() => setIsProcessing(false));
  };

  const handleFetchPractiseLead = (employeeId) => {
    console.log(employeeId)
    axiosInstance
    .get(`/employee/${employeeId}`)
    .then((res) => {
      const uniqueOptions = res.data.data.reduce((unique, current) => {
        if (current.isLead && !unique.some((item) => item.value === current.leadId)) {
          unique.push({ value: current.leadId, label: current.leadName });
        }
        return unique;
      }, []);
      setOption_pl(uniqueOptions);
   
    })
    .catch((err) => {
      console.log("Data Process Error");
      console.log(err.message);
    });
  };



  const handleFetchLeadDirectRepotee = (selectedLeadId) => {
    axiosInstance
      .get("/employee")
      .then((res) => {
        const children = res.data.data.filter(
          (e) => e.isLead === true && e.leadId === selectedLeadId
        );
        const newOptions = children.map((e) => ({
          value: e.employeeId,
          label: e.fullName,
        }));
        setOption_plChild(newOptions);
      })
      .catch((err) => {
        console.log("Error fetching lead children:", err.message);
      });
  };
  const handelRow = (row) => {
    const startDate = row.weekRange.start.split('/').reverse().join('-');
    const approvalTask={
      startDate:startDate, 
      task:row.tasks,
      status:row.status,
      totalHours:row.totalHours,
      id:row.timesheetId,
      name:row.employee_Info.fullName,
      email:row.employee_Info.email ,
      employeeId:row.employee_Info.employeeId
  }
  Cookies.set('approvalTask',JSON.stringify(approvalTask))
    // const status = row.status;
    // const totalHours = row.totalHours;
    // const task = row.tasks;
    // console.log(task);
    // const id = row.timesheetId;
    // const name = row.employee_Info.fullName;
    // const email = row.employee_Info.email;
    // setApprovals_Week({ startDate });
    // setApprovals_Id({ id })
    // setApprovals_TaskStatus({ status });
    // setApprovals_TotalHours({ totalHours });
    // setApprovals_Task({ task });
    // setApprovals_EmpName({name});
    // setApproval_EmpEmail({email});

    nav('/repotingLead/approvalStatus');
  }
  const columns = [
    {
      name: "Week",
      selector: "weekRange.range",
      sortable: true,
      style: {
        color: "blue",
      },
      cell: (row) => (
        <div className="cursor-pointer" onClick={() => handelRow(row)}>
          {row.weekRange.range}
        </div>
      ),
    },
    {
      name: "Total Hours",
      selector:"tasks",
      selector:'timesheetId',
      selector: "totalHours",
      sortable: true,
    },
    {
      name: "Status",
      selector:"status",
      selector: "statusUpdatedAt",
      sortable: true,
      cell: (row) => (
        <div
          style={{
            color:
            row.status === "submit"
            ? "blue"
            : 
              row.status === "rejected"
                ? "red"
                : row.status === "draft"
                ? "orange"
                : row.status === "approved"
                ? "green"
                : "black", // Default color if status doesn't match any condition
          }}
        >
          {row.statusUpdatedAt}
        </div>
      ),
    },
    // {
    //   name: "Billable",
    //   selector: "statusUpdatedAt",
    //   sortable: true,
    // },
    {
      name: "Employee",
      selector:'employee_Info.employeeId',
      selector:'employee_Info.fullName',
      selector: "employee_Info.email",
      sortable: true,
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#b0c4de",
        color: "black",
      },
    },
    headCell: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        TextTransform: "uppercase",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  useEffect(() => {
    let userData = sessionStorage.getItem('66e5957c-a38f-4d6e-bcc6-6da399a71f6f.06191626-9f52-42fe-8889-97d24d7a6e95-login.windows.net-06191626-9f52-42fe-8889-97d24d7a6e95')
        if(userData!==null && Cookies.get('RepoteeTab')!==undefined){
          setIsProcessing(true);
          console.log(JSON.parse(Cookies.get('userInfo')).employeeId)
    handleDataFetch(JSON.parse(Cookies.get('userInfo')).leadId);
    handleFetchPractiseLead(JSON.parse(Cookies.get('userInfo')).leadId);
        }else{
          nav('/')
        }
  }, []);

  useEffect(()=>{
  
    handleDataFetch(JSON.parse(Cookies.get('userInfo')).leadId);

  },[year.value,
  practiceLeadValue.value,
RepoteeValue.value,
statusValue.value
]);


  return (
    <div className="flex flex-col px-12 py-3">
      {isProcessing ? (
        <div className="flex justify-center items-center w-full py-20 mt-20">
          <h2 className="text-3xl text-slate-400 font-medium mt-20 py-20">
            Loading data.....
          </h2>
        </div>
      ) : (
        <>
          {isError ? (
            <div className="flex justify-center items-center w-full py-20 mt-20">
              <h2 className="text-3xl text-slate-400 font-medium mt-20 py-20">
                {errorText}
              </h2>
            </div>
          ) : (
            <>
              <div className="flex gap-8 mb-1">
                <div className="flex gap-4 items-center">
                  <span className="font-medium text-slate-600 text-lg">
                    Year:
                  </span>
                  <div className="w-48">
                  <Select
                      styles={selectStyle}
                      options={yearOption}
                      // defaultValue={optionsYear[0]}
                      defaultValue={year}
                     onChange={setYear}
                      isSearchable
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="font-medium text-slate-600 text-lg">
                    RL/PL:
                  </span>
                  <div className="w-48">
                    <Select
                      styles={selectStyle}
                      options={option_pl}
                    defaultValue={practiceLeadValue}
                      onChange={(selectedOption) => {
                        setPracticeLeadValue(selectedOption);
                       handleFetchLeadDirectRepotee(selectedOption.value); // Fetch children based on selected RL/PL
                      }}
                      isSearchable
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-600 text-lg">
                      Direct
                    </span>
                    <span className="font-medium text-slate-600 text-lg">
                      Repotess:
                    </span>
                  </div>
                  <div className="w-48">
                    <Select
                      styles={selectStyle}
                      options={option_plChild}
                      defaultValue={RepoteeValue}
                      onChange={setRepoteeValue}
                      isSearchable
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="font-medium text-slate-600 text-lg">
                    Status
                  </span>
                  <div className="w-48">
                    <Select
                      styles={selectStyle}
                      options={options_status}
                      defaultValue={statusValue}
                      onChange={setStatusValue}
                      isSearchable
                    />
                  </div>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={apiData}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10]}
                highlightOnHover
                customStyles={customStyle}
                onRowDoubleClicked={() => nav("/repotingLead/status")}
              />
              <div className="flex justify-end mt-2">
                {/* <button
                  className="relative inline-flex px-9 py-2 font-semibold text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300"
                  onClick={() => nav("/repotingLead/addMyTimesheet")}
                >
                  ADD
                </button> */}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Approvals_Home;

