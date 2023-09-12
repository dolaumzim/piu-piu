import { createContext, useContext, useState } from "react";
import { User } from "../types/Users";

//contexto criado para armazenar dados do usuário logado, token e um estado de logado ou deslogado

const logInToken = localStorage.getItem("token");
const userAux: User = JSON.parse(localStorage.getItem("user") as string);

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  localUser: User;
  setLocalUser: React.Dispatch<React.SetStateAction<User>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  localUser: {} as User,
  setLocalUser: () => {},
  token: {} as string,
  setToken: () => {},
});

export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [localUser, setLocalUser] = useState<User>(userAux);
  const [isLoggedIn, setIsLoggedIn] = useState(localUser ? true : false);
  const [token, setToken] = useState<string>(logInToken ?? "");

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        localUser,
        setLocalUser,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (ctx === undefined) {
    throw new Error("Tem que ser usado dentro de um Provider");
  }
  return ctx;
};
