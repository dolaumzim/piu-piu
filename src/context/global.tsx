import { createContext, useContext, useState, useEffect } from "react";

interface GlobalContextType{
    isLoggedIn : boolean,
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
}

const GlobalContext = createContext<GlobalContextType>({
    isLoggedIn : false,
    setIsLoggedIn : () => {},
})

export const GlobalProvider = ({children} : React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      const logInToken = localStorage.getItem('token')
  
      if (!logInToken) {
        setIsLoggedIn(false)
        return
      }
      setIsLoggedIn(true)
    }, [])

    return(
      <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
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