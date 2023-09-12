import { SideBar } from "../components/SideBar";
import { SideCard } from "../components/Sidecard";
import Button from "../components/Button";
import { SideList } from "../components/SideList";
import { Outlet } from "react-router-dom";
import { latestRequest } from "../service/requestsAPI";
import {useEffect, useState} from 'react'
import { User } from "../types/Users";

export const MainLayout = () => {
  const [loading, setLoading] = useState(false)
  const [latestUsers, setLatestUsers] = useState<User[] | undefined>()
  
  const latest = async () => {
    const response = await latestRequest()
    setLatestUsers(response)
  }
  
  useEffect(()=>{
    try {
      setLoading(true)
      latest()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  },[])

  return (
    <>
      <SideBar />
      <div className="flex px-2 flex-col w-[100vw] ws:w-[min(566px,65vw)]">
        <Outlet />
      </div>
      <div className="ml-4 mt-12 w-72 sticky top-12 lg:w-96 h-min rounded-md hidden ws:block">
        <SideCard>
          <h1 className="text-xl font-bold mb-3">Assine o Premium</h1>
          <p className="mb-2">
            Pague por uma bolinha colorida e me deixe rico.
          </p>
          <div className="w-min">
            <Button thickness="thin" variant="secondary">
              Assinar
            </Button>
          </div>
        </SideCard>
        <SideList loading={loading} users={latestUsers} />
      </div>
    </>
  );
};
