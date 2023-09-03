import axios from "axios"

const piupiuAPI = axios.create({
    baseURL: 'https://piupiu-api.onrender.com/',
  });
  

export async function loginRequest (handle : string, password : string)  {
    const response = await piupiuAPI.post(`login`,{handle : handle, password : password})
    return (response && response.data)     
}
