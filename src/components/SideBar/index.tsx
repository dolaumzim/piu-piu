import { BiHomeCircle } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { LuVerified } from "react-icons/lu";
import { Button } from "../Button";
import { SessionController } from "../SessionController";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog } from "../Dialog";
import NewPiupiu from "../NewPiupiu";
import { useState } from "react";
import { User } from "../../types/Users";
import { routes } from "../../routes";
import { useGlobal } from "../../context/global";
import { newPiuRequest } from "../../service/requestsAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const SideBar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const [textValue, setTextValue] = useState("");
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const {setIsLoggedIn, localUser, token} = useGlobal()

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();


    try {
      setAddingPiupiu(true);
      newPiuRequest(formValue, token)
      queryClient.invalidateQueries(['setpiupius'])
    } catch (error) {
      console.log(error)
    } finally{
      setTextValue('')
      setOpenDialog(false)
      setAddingPiupiu(false)
    }  
    };
  

  const handleLogOut = ()=>{
    localStorage.clear()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <>
      <nav className="px-2 sticky top-0 left-0 h-screen pb-4 xl:w-64 hidden sm:flex flex-col justify-between select-none">
        <div>
        <NavLink to="/home">
          <img
            className="w-16 p-2 rounded-full mb-5 hover:bg-zinc-900"
            src="/logo.png"
          />
          </NavLink>
          <ul>
            <NavLink to="/home">
              <li className="flex mb-4 cursor-pointer pr-8 w-min p-3 rounded-full hover:bg-zinc-900 items-center gap-4">
                <BiHomeCircle className="fill-white text-2xl" />
                <span className="text-xl hidden xl:block ">Home</span>
              </li>
            </NavLink>
            <NavLink
              to={routes.profile(localUser.handle)}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              <li className="flex mb-4 p-3 pr-8 w-min cursor-pointer  rounded-full hover:bg-zinc-900 items-center gap-4">
                <BsPerson className="fill-white text-2xl" />
                <span className="text-xl hidden xl:block">Perfil</span>
              </li>
            </NavLink>
            <li className="flex mb-4 w-min pr-8 cursor-pointer p-3  rounded-full hover:bg-zinc-900 items-center gap-4">
              <LuVerified className="stroke-black fill-white text-2xl" />
              <span className="text-xl hidden xl:block">Verificado</span>
            </li>
          </ul>
          <div className="hidden xl:block">
            <Button
              onClick={() => setOpenDialog(true)}
              thickness="thick"
              variant="secondary"
            >
              Piar
            </Button>
          </div>
        </div>
        <SessionController
          user={localUser}
          options={[
            {
              text: "Entrar com outra conta",
              onClick: () => {},
            },
            { text: `Sair de @${localUser.handle}`, onClick: () => {handleLogOut()} },
          ]}
        />
      </nav>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="w-[min(566px,100vw)] p-1">
          <NewPiupiu
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            loading={addingPiupiu}
            onSubmit={handleSubmit}
            variant="borderless"
            user={localUser as User}
          />
        </div>
      </Dialog>
    </>
  );
};
