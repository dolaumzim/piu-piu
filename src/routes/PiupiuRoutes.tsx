import { Navigate, Route, Routes} from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { MainLayout } from "../pages/MainLayout";
import { useGlobal } from "../context/global";
import { ProfileLayout } from "../pages/ProfileLayout";
import { routes } from ".";
import { Profile } from "../pages/Profile";
import { SinglePiupiu } from "../pages/SinglePiupiu";

export const PiupiuRoutes = () => {

  const isToken = localStorage.getItem('token')
  const {isLoggedIn, setIsLoggedIn} = useGlobal()

  return ( 
    
    <Routes>
      <Route index element={!isLoggedIn? <Login/> : <Navigate to={routes.home}/>}/>

      <Route path={routes.signup} element={!isLoggedIn? <SignUp/> : <Navigate to={routes.home}/>}/>

      <Route path={'/'} element={isLoggedIn ? <MainLayout/> : <Navigate to={routes.login}/>}>
        <Route path={routes.home} element={<Home/>}/>
        
        <Route path={routes.profile(':handle')} element={<ProfileLayout/>}>
          <Route path={routes.profile(':handle')} element={<Profile postsRoute='posts'/>}/>
          <Route path={routes.userLikes(':handle')} element={<Profile postsRoute='likes'/>}/>
        </Route>
      </Route>

      <Route path={routes.following} element={isToken ? <MainLayout/> : <Navigate to={routes.login}/>}>
        <Route path={routes.following} element={<Home/>}/>
      </Route>

      <Route path={routes.singlePiupiu(':id')} element={<MainLayout/>}>
        <Route path={routes.singlePiupiu(':id')} element={<SinglePiupiu/>}/>
      </Route>

      {/* <Route path="/*" element={<Navigate replace to={routes.home}/>}/> */}
     
    </Routes>
    )
};
