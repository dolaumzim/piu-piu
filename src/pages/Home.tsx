import { useRef, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { PiupiuList } from "../components/PiupiuList";
import { usePagination } from "../hooks/useScroll";
import { piuComponentHeight } from "../consts";
import { User } from "../types/Users";
import { routes } from "../routes";
import { useGlobal } from "../context/global";
import { newPiuRequest, piuListRequest } from "../service/requestsAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVisible } from "../hooks/useVisible";

export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const [piupius, setPiupius] = useState<Piu[] | undefined>();
  const [newData, setNewData] = useState<Piu[] | undefined>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const [newPiusCount, setNewPiusCount] = useState<number>(0);
  
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = Math.ceil(window.screen.height / piuComponentHeight);
  const isOnTop = useVisible(topRef)

  const {localUser,token} = useGlobal()

  const { scrollTop } = usePagination({
    onBottomEnter: () => {
      hasNextPage && fetchNextPage()
    },
    onTopEnter: () => {setNewData([])},
    onTopLeave: () => {},
    bottomRef,
    topRef,
    refreshVariable: piupius,
  });
  
  const{ isLoading, isFetching, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery(
    ['setpiupius'],
    async({pageParam = 1})=>
      {
      const response  = await piuListRequest('', pageParam, itemsPerPage, token)
      return response
      },
      {getNextPageParam: (lastPage, allPages) => {
        if (lastPage.currentPage < allPages[0].totalPages) {
          return lastPage.currentPage + 1
        }
        return undefined;
      },
      onSuccess : (response) => {
        setPiupius(response.pages.flatMap((obj)=>obj?.data))
        
      },
      structuralSharing(oldData, newData){
        if(oldData){
          if (oldData.pages[0].totalPius !== newData.pages[0].totalPius){
            if(!isOnTop)(setNewData(newData.pages[0].data))}
          setNewPiusCount(newData.pages[0].totalPius - oldData.pages[0].totalPius)
        }
        return newData
      
      },
      refetchInterval: 20000,
      },
    
  )

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();
    
  try {
    setAddingPiupiu(true);
    newPiuRequest(formValue, token)
  } catch (error) {
    console.log(error)
  } finally{
    refetch()
    setTextValue('')
    setAddingPiupiu(false)
  }  
  };

  return (
    <div className="relative">
      <NavTitle 
        position="sticky"
        navOptions={[
          { title: "Para você", path: routes.home },
          { title: "Perseguindo", path: routes.following },
        ]}
        refreshButton={{
          newPosts: newData,
          onClick: () => {
            scrollTop();
          },
        }}
        newPiusCount={newPiusCount}
        
      >
        <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
      </NavTitle>
      <div ref={topRef}></div>
      <NewPiupiu 
        loading={addingPiupiu}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onSubmit={handleSubmit}
        user={localUser as User}
      />
      <PiupiuList
        initialLoading={isLoading}
        topRef={topRef}
        bottomRef={bottomRef}
        loading={isFetching}
        piupius={piupius}
        onChange={() => {}}
      />
    </div>
  );
};
