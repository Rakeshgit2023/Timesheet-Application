import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TiVendorMicrosoft } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth-config";
import Cookies from "js-cookie";
const Login = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      u_email: "",
      u_pass: "",
    },
    validationSchema: Yup.object({
      u_email: Yup.string()
        .required("Please enter email")
        .email("email invalid"),
      u_pass: Yup.string()
        .required("Password is required")
        .min(8, "At least 8 charachter is requird")
        .matches(/[A-Z]/, "Atleast one uppercase")
        .matches(/[a-z]/, "Atleast one lowercase")
        .matches(/[0-9]/, "Atleast one number")
        .matches(/[^\w]/, "Atleast one special charachter")
        .matches(/^[^\s]*$/, "space not allowed"),
    }),
    onSubmit: (values) => {
      console.log(values);
      formik.handleReset();
    },
  });
  const handelMicrosoftLogin = () => {
    instance
      .loginPopup({
        ...loginRequest,
        prompt: 'create',
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    let data = sessionStorage.getItem('msal.account.keys')
    data !== null && nav('/role')
    Cookies.remove('EditorTab')
    Cookies.remove('ViewerTab')
    Cookies.remove('RepoteeTab')
    Cookies.remove('EmployeeTab')
    
    Cookies.remove('userInfo')
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
  }, [])
  return (
    <>
      <AuthenticatedTemplate>
        {activeAccount ? nav('/role') : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="flex justify-center items-center bg-gradient-to-t from-indigo-900 via-indigo-600  to-indigo-500 ... h-svh">
          <div className="flex- flex-col justify-center items-center bg-white rounded-2xl px-10 pt-6 pb-12">
            <div className="w-full flex justify-center items-center mb-4">
              <img src={Logo} alt="" className="size-20" />
            </div>
            <div className="flex justify-center gap-2  items-center  w-full bg-slate-200 rounded-2xl px-1 py-3 mb-4">
              <div className="flex justify-center items-center">
                <button className="px-8  lg:px-12 py-2 bg-blue-700  hover:bg-[#f7b36a] rounded-xl text-white lg:text-base font-bold w-full">

                  Login
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button className=" px-10 lg:px-14 py-2 bg-blue-700  hover:bg-[#f7b36a] rounded-xl text-white font-bold w-full" onClick={handelMicrosoftLogin}>
                  <TiVendorMicrosoft className="text-2xl" />
                </button>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <label
                for="username"
                className="block appearance-none text-blue-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="shadow border-2 bg-gray-100 focus:bg-white focus:border-blue-400 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                name="u_email"
                id="u_email"
                value={formik.values.u_email}
                onChange={formik.handleChange}
              ></input>
              <p className=" text-red-500 text-xs mt-1 mb-2">
                {formik.errors.u_email && formik.touched.u_email
                  ? formik.errors.u_email
                  : ""}
              </p>

              <label
                for="username"
                className="block appearance-none text-blue-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="**********"
                className="shadow border-2 bg-gray-100 focus:bg-white focus:border-blue-400 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                name="u_pass"
                id="u_pass"
                value={formik.values.u_pass}
                onChange={formik.handleChange}
              ></input>
              <p className=" text-red-500 text-xs mt-1 mb-5">
                {formik.errors.u_pass && formik.touched.u_pass
                  ? formik.errors.u_pass
                  : ""}
              </p>
              <div className=" flex items-center justify-center">
                <button className=" w-full bg-blue-700  rounded-2xl hover:bg-[#f7b36a] text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};

export default Login;