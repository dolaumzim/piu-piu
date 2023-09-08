import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/Users";

interface GlobalContextType{
    isLoggedIn : boolean,
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
    localUser : User,
    setLocalUser : React.Dispatch<React.SetStateAction<User>>
    profileUser : User,
    setProfileUser : React.Dispatch<React.SetStateAction<User>>
}

const GlobalContext = createContext<GlobalContextType>({
    isLoggedIn : false,
    setIsLoggedIn : () => {},
    localUser : {} as User,
    setLocalUser : () => {},
    profileUser : {} as User,
    setProfileUser : () => {}
})

export const GlobalProvider = ({children} : React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [localUser, setLocalUser] = useState<User>({} as User)
    const [profileUser, setProfileUser] = useState<User>({} as User)
    
    useEffect(() => {
      const logInToken = localStorage.getItem('token')
      const userAux= localStorage.getItem('user')
      setLocalUser(userAux && JSON.parse(userAux))

      if (!logInToken) {
        setIsLoggedIn(false)
        return
      }
      setIsLoggedIn(true)
    }, [])

    return(
      <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn, localUser, setLocalUser, profileUser, setProfileUser}}>
        {children}
      </GlobalContext.Provider>
        )
}

export const useGlobal = () => {
    const ctx = useContext(GlobalContext);
  if (ctx === undefined) {
    throw new Error("Tem que ser usado dentro de um Provider");
  }
  return ctx
}