import { useEffect, useState } from "react";
import { PiupiuList } from "../components/PiupiuList";
import { userPiuListRequest } from "../service/requestsAPI";
import { Piu } from "../types/Pius";
import { useNavigate, useParams } from "react-router-dom";

type ProfileProps = {
  postsRoute: "posts" | "likes";
};
export const Profile = ({ postsRoute }: ProfileProps) => {
  const [piupius, setPiupius] = useState<Piu[] | undefined>();
  const [initialLoading, setInitialLoading] = useState<boolean>();
  let {handle} = useParams()
  
  useEffect(() => {
    const listPius = async() => {
      const data = await userPiuListRequest(handle? handle:'', postsRoute)
      setPiupius(data)
    }

    try {
      setInitialLoading(true)
      listPius()
      
    } catch (error) {
      console.log(error)

    } finally {
      setInitialLoading(false)
    }
  },[postsRoute])

  return (
    <>
      <main>
        <PiupiuList initialLoading={initialLoading} piupius={piupius} />
      </main>
    </>
  );
};
