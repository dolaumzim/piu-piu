import { useState, useEffect, useMemo} from "react";
import { NavHeader } from "../components/NavHeader";
import NavTitle from "../components/NavTitle";
import ProfilePic from "../components/ProfilePic";
import { Username } from "../components/Username";
import { User } from "../types/Users";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { Dialog } from "../components/Dialog";
import { routes } from "../routes";
import { useGlobal } from "../context/global";
import { postsRequest } from "../service/requestsAPI";
import { useQuery } from "@tanstack/react-query";

export const ProfileLayout = () => {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<number>();
  const [dialogOpen, setDialogOpen] = useState(false);
  let {handle} = useParams()

  const handleDialogClick = async() => {
    setDialogOpen(!dialogOpen);
  };

  const {localUser,token} = useGlobal()
  const navigate = useNavigate()

  const {} = useQuery({
    queryKey : ['profilePosts', handle],
    queryFn : async() =>{
      const response = await postsRequest(handle ?? '',token)
      setUserPosts(response.data.posts)
      setUser(response.data.user)
      return response
    },
    onError: () => {
      navigate(routes.home)
    },
    retry : 0
  })

  return (
    <>
      <NavHeader
        title={user?.name || ""}
        subtitle={`${userPosts || 0} piadas`}
      />
      <NavTitle
        position="relative"
        navOptions={[
          { title: "Perfil", path: routes.profile(user?.handle) },
          { title: "Curtidas", path: routes.userLikes(user?.handle) },
        ]}
      >
        <section className="h-48 w-full bg-zinc-700" />
        <section className="relative mb-2 select-none px-3 w-full">
          <div className="min-h-[5rem] flex justify-end w-full">
            <div className="absolute -top-16 left-4 ">
              <ProfilePic
                border
                variant="reallyBig"
                userName={user?.name || ""}
                image={user?.image_url}
              />
            </div>
            {user?.handle === localUser.handle ? 
            <div
              onClick={handleDialogClick}
              className="absolute cursor-pointer rounded-full bg-zinc-950 hover:bg-zinc-900 p-6 right-4 top-4"
            >
              <BsFillPencilFill />
            </div> : null
            }
          </div>
          <div>
            <Username size="xl" variant="column" user={user} />
            <p className="text-white mt-3 text-sm">{user?.description}</p>
          </div>
        </section>
      </NavTitle>
      <Outlet />
      <Dialog
        onClose={() => {
          setDialogOpen(false);
        }}
        open={dialogOpen}
      >
        {user && <ProfileEditForm onSubmit={() => setDialogOpen(!dialogOpen)} user={user} />}
      </Dialog>
    </>
  );
}