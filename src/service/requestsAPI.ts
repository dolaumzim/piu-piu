import axios from "axios"
import { backendRoutes, routes } from "../routes";
import { User } from "../types/Users";

const piupiuAPI = axios.create({
    baseURL: 'https://piupiu-api.onrender.com/',
    headers: {
      Authorization : `Bearer ${localStorage.getItem('token')}`
      }
  });
  

export async function logInRequest (handle : string, password : string)  {
    const response = await piupiuAPI.post(`login`,{handle, password})
    return (response && response.data)     
}

export async function singUpRequest (name : string, handle : string, password : string)  {
  await piupiuAPI.post(`signup`,{name, handle , password})
}

export async function postsRequest (handle : string)  {
  return await piupiuAPI.get(`users/${handle}`)
}

export async function newPiuRequest (message : string|undefined)  {
  await piupiuAPI.post(`posts`,{message})
}

export async function piuListRequest (handle : string, page : number, per_page: number)  {
  const response =  await piupiuAPI.get(`pius`,{params:{handle, page, per_page}})
  return response.data.data
}

export async function userPiuListRequest (handle : string, kind : string)  {
  const response =  await piupiuAPI.get(
  kind === 'posts' ? 
  backendRoutes.user.posts(handle) :
  backendRoutes.user.likes(handle))
  return response.data
}

export async function latestRequest ()  {
  const response =  await piupiuAPI.get(backendRoutes.latestUsers)
  return response.data
}

export async function editUserRequest (handle : string, user : User)  {
  await piupiuAPI.patch(backendRoutes.profile(handle), user )
}

export async function singlePiuRequest (id : string)  {
  return await piupiuAPI.get(routes.singlePiupiu(id))
}

export async function repliesRequest (id : string)  {
  return await piupiuAPI.get(backendRoutes.singlePiupiu.replies(id))
}

export async function replyRequest (id : string, message : string, handle : string)  {
  return await piupiuAPI.post(backendRoutes.singlePiupiu.reply(id), {params:{handle}, message})
}

export async function likeRequest (id : string, handle : string)  {
  await piupiuAPI.post(backendRoutes.singlePiupiu.like(id),{params:{handle}})
  }

export async function dislikeRequest (id : string, handle : string)  {
  await piupiuAPI.delete(backendRoutes.singlePiupiu.like(id),{params:{handle}})
  }

  export async function likedRequest (id : string, handle : string)  {
    return await piupiuAPI.get(`/posts/${id}/likes`, {params:{handle}})
  }
