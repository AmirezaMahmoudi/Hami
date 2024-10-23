
import axios from "axios";

export const apiPath = "http://172.16.10.102:1880";


// export const Axios = axios.create({
//   baseURL: apiPath,
//   // withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


const httpService = (url, method = "GET", data=null , headers = {"Content-Type" : "application/json",})=>{
    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'))
    return axios({
        url: apiPath + url,
        method,
        data,
        headers:{
            Authorization : tokenInfo ? tokenInfo : 0,
            ...headers
        },
    })
}
export default httpService
