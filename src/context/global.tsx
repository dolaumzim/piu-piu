import { createContext, useContext, useState } from "react";

interface GlobalContextType{
    loginToken : string,
    setLoginToken : React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<GlobalContextType>({
    loginToken : '',
    setLoginToken : () => {}
})

export const GlobalProvider = ({children} : React.PropsWithChildren) => {
    const [loginToken, setLoginToken] = useState('')

    return(
      <GlobalContext.Provider value={{loginToken, setLoginToken}}>
        {children}
      </GlobalContext.Provider>
        )
}

export const useToken = () => {
    const ctx = useContext(GlobalContext);
  if (ctx === undefined) {
    throw new Error("Tem que ser usado dentro de um Provider");
  }
  return ctx

}