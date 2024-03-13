import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import Context from "../../../Context/Context";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils";
const MyTimesheet = () => {
  const { setWeek, setMyTimesheetId, setMyTimesheetTaskStatus, setMyTimesheetTotalHours, setMyTimesheetTask } = useContext(Context)
  const [apiData, setApiData] = useState([]);
  const [filterApiData, setFilterApiData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const nav = useNavigate();
  const [value, setValue] = useState("");

  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "none" : "none",
      padding: 1,
      backgroundColor: "white",
    }),
  };
  const options = [
    { value: "Active", label: "Active" },
    { value: "inactive", label: "inactive" },
  ];

  const handleDataFetch = (employeeId) => {
    setIsProcessing(true);
    axiosInstance
      .get(`/mytimesheet/${employeeId}`)
      .then((res) => {
        console.log("Data Process Successfuly");
        console.log(res.data);
        setApiData(res.data.data);
        setFilterApiData(res.data.data);
      })
      .catch((err) => {
        console.log("Data Process Error");
        console.log(err);
        setErrorText(err.message);
        setIsError(true);
      })
      .finally(() => setIsProcessing(false));
  };
  const handelRow = (row) => {
    const startDate = row.weekRange.start.split('/').reverse().join('-');
    const myTimesheetTask={
      startDate:startDate,
      task:row.tasks,
      status:row.status,
      totalHours:row.totalHours, 
      id:row.timesheetId,
      // name:row.employee_Info.fullName,
      // email:row.employee_Info.email 
  }
  Cookies.set('myTimesheetTask',JSON.stringify(myTimesheetTask))
    // const status = row.status;
    // const totalHours = row.totalHours;
    // const task = row.tasks;
    // const id = row.timesheetId;
    // setWeek({ startDate });
    // setMyTimesheetId({ id })
    // setMyTimesheetTaskStatus({ status });
    // setMyTimesheetTotalHours({ totalHours });
    // setMyTimesheetTask({ task });
    nav('/repotingLead/myTimesheetStatus');
  }
  const columns = [
    {
      name: "Week",
      selectStyle: 'timesheetId',
      selectStyle: 'tasks',
      selectStyle: "weekRange.start",
      selector: "weekRange.range", 
      sortable: true,
      style: {
        color: 'blue',
      },
      cell: (row) => <div className='cursor-pointer' onClick={() => handelRow(row)}>{row.weekRange.range}</div>
    },
    {
      name: "Total Hours",
      selector: "totalHours",
      sortable: true,
    },
    {
      name: "Status",
      selectStyle: 'status',
      selector: "statusUpdatedAt",
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
    handleDataFetch(JSON.parse(Cookies.get('userInfo')).employeeId);
    console.log(JSON.parse(Cookies.get('userInfo')).employeeId)
        }else{
          nav('/')
        }
  }, []);

  const handleFilter = (e) => {
    const newData = filterApiData.filter((row) =>
      row.weekRange.range.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setApiData(newData);
  };
  return (
    <div className="flex flex-col px-12 py-3">
      {
        isProcessing ?
          <div className='flex justify-center items-center w-full py-20 mt-20'>
            <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>Loading data.....</h2>
          </div> :
          <>
            {
              isError ? (
                <div className='flex justify-center items-center w-full py-20 mt-20'>
                  <h2 className='text-3xl text-slate-400 font-medium mt-20 py-20'>{errorText}</h2>
                </div>
              ) :
                (
                  <>
                    <div className="flex justify-between mb-1 w-full">
                      <div className="flex gap-4 items-center">
                        <span className="font-medium text-slate-600 text-2xl">Financial Year</span>
                        <Select
                          styles={selectStyle}
                          options={options}
                          defaultValue={value}
                          onChange={setValue}
                          isSearchable
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-normal text-slate-500 text-base"> Approved </span>
                        <span className="font-bold text-slate-900 text-xl"> 0 Hours</span>
                        <span className="font-normal text-slate-500 text-base">Bilable Hours</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-normal text-slate-500 text-base"> Approved </span>
                        <span className="font-bold text-slate-900 text-xl"> 0 Hours</span>
                        <span className="font-normal text-slate-500 text-base">Bilable Hours</span>
                      </div>
                      <div className="flex items-center justify-end mb-2 mt-5">
                        <input
                          className="outline-none border-5 border-gray-400 rounded px-4 py-2"
                          placeholder="Search here"
                          type="text"
                          onChange={handleFilter}
                        />
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
                      <button
                        className="relative inline-flex px-9 py-2 font-semibold text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300"
                        onClick={() => nav('/repotingLead/addMyTimesheet')}
                      >
                        ADD
                      </button>
                    </div>
                  </>
                )
            }
          </>
      }
    </div>
  );
};
export default MyTimesheet;