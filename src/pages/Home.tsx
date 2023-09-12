import axios from "axios";
import { useEffect, useRef, useState } from "react";
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


export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const [piupius, setPiupius] = useState<Piu[] | undefined>();
  const [newData, setNewData] = useState<Piu[] | undefined>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = Math.ceil(window.screen.height / piuComponentHeight);

  const { scrollTop } = usePagination({
    onBottomEnter: () => {},
    onTopEnter: () => {},
    onTopLeave: () => {},
    bottomRef,
    topRef,
    refreshVariable: piupius,
  });

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();
    
  try {
    setAddingPiupiu(true);
    newPiuRequest(formValue)
  } catch (error) {
    console.log(error)
  } finally{
    setTextValue('')
    setAddingPiupiu(false)
  }  
  };

  const listPius = async() => {
    const data = await piuListRequest('', 1, itemsPerPage)
    setPiupius(data)
  }

  useEffect(() => {

    try {
      listPius()
    } catch (error) {
      console.log(error)
    }
  },[])

  const {localUser} = useGlobal()

  return (
    <div ref={topRef} className="relative">
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
      >
        <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
      </NavTitle>
      <NewPiupiu
        loading={addingPiupiu}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onSubmit={handleSubmit}
        user={localUser as User}
      />
      <PiupiuList
        initialLoading={false}
        topRef={topRef}
        bottomRef={bottomRef}
        loading={false}
        piupius={piupius}
        onChange={() => {}}
      />
    </div>
  );
};
