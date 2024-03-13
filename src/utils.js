import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: `${process.env.REACT_APP_SERVER_LINK}`,
});

export default axiosInstance; 