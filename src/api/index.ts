import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BASE_API;


const getToken=()=>{
  return localStorage.getItem("app_token");
}
const apiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization:  `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});


export default apiInstance;
