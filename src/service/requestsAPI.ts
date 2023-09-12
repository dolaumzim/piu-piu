import axios from "axios"
import { backendRoutes, routes } from "../routes";
import { User } from "../types/Users";
import { Piu } from "../types/Pius";


const piupiuAPI = axios.create({
    baseURL: 'https://piupiu-api.onrender.com/'
  });
  
  interface PiuPage{
    totalPius : number
    totalPages : number
    currentPage : number
    data : Piu[]
  }

  interface ReplyPius{
    replies : Piu[],
    total : number
  }

export async function logInRequest (handle : string, password : string)  {
    const response = await piupiuAPI.post(`login`,{handle, password})
    return (response && response.data)     
}

export async function singUpRequest (name : string, handle : string, password : string)  {
  await piupiuAPI.post(`signup`,{name, handle , password})
}

export async function postsRequest (handle : string, token :string)  {
  return await piupiuAPI.get(`users/${handle}`,
  {
    headers: {Authorization : `Bearer ${token}`},
  }
  )
}

export async function newPiuRequest (message : string|undefined, token: string)  {
  await piupiuAPI.post(`posts`, {message},
  {
    headers: {Authorization : `Bearer ${token}`},
  })
}

export async function piuListRequest (handle : string, page : number, per_page: number, token:string) : Promise<PiuPage> {
  const response =  await piupiuAPI.get(`pius`,
  {
    headers: {Authorization : `Bearer ${token}`},
    params:{handle, page, per_page}})
  return response.data
}

export async function userPiuListRequest (handle : string, kind : string, token:string)  {
  const response =  await piupiuAPI.get(
  kind === 'posts' ? 
  backendRoutes.user.posts(handle) :
  backendRoutes.user.likes(handle),
  {
    headers: {Authorization : `Bearer ${token}`},
  })
  return response.data
}

export async function latestRequest (token : string) : Promise<User[]>  {
  const response =  await piupiuAPI.get(backendRoutes.latestUsers,
  {
    headers: {Authorization : `Bearer ${token}`},
  }
  )
  return response.data
}

export async function editUserRequest (handle : string, user : User, token : string)  {
  await piupiuAPI.patch(backendRoutes.profile(handle), user,
  {
    headers: {Authorization : `Bearer ${token}`},
  }
  )
}

export async function singlePiuRequest (id : string, token:string)  {
  return await piupiuAPI.get(routes.singlePiupiu(id),
  {
    headers: {Authorization : `Bearer ${token}`},
  })
}

export async function repliesRequest (id : string, token : string)   {
  return await piupiuAPI.get(backendRoutes.singlePiupiu.replies(id),
  {
    headers: {Authorization : `Bearer ${token}`},
  }
  )
}

export async function replyRequest (id : string, message : string, handle : string, token:string)  {
  return await piupiuAPI.post(backendRoutes.singlePiupiu.reply(id), {message},
  {
    headers: {Authorization : `Bearer ${token}`},
    params:{handle}})
}
export async function likeRequest (id : string, handle : string, token : string)  {
  await piupiuAPI.post(backendRoutes.singlePiupiu.like(id),null, 
  {
    headers: { Authorization: `Bearer ${token}` },
    params: { handle },
  }
);
}


export async function dislikeRequest (id : string, handle : string, token : string)  {
  await piupiuAPI.delete(backendRoutes.singlePiupiu.like(id),
  {
    headers: {Authorization : `Bearer ${token}`},
    params:{handle}
  }
  );
  }

  export async function likedRequest (id : string, handle : string)  {
    return await piupiuAPI.get(`/posts/${id}/likes`, {params:{handle}})
  }
