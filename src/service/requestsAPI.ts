import axios from "axios"

const piupiuAPI = axios.create({
    baseURL: 'https://piupiu-api.onrender.com/',
  });
  

export async function logInRequest (handle : string, password : string)  {
    const response = await piupiuAPI.post(`login`,{handle : handle, password : password})
    return (response && response.data)     
}

export async function singUpRequest (name : string, handle : string, password : string)  {
  await piupiuAPI.post(`signup`,{name: name, handle : handle, password : password})
}
