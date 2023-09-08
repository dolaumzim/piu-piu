import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { Link, useNavigate } from "react-router-dom";
import { logInRequest } from "../service/requestsAPI";
import { useGlobal } from "../context/global";


export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    logInRequisition();
    e.preventDefault();
  };

  const navigate = useNavigate()
  const {setIsLoggedIn} = useGlobal()

  const logInRequisition = async() => {
    try {
      setIsLoading(true)
      const data = await logInRequest(user,password)
      localStorage.setItem('token',data.token)
      localStorage.setItem('user',JSON.stringify(data.user))
      setIsLoggedIn(true)
      navigate('/home')
      
    } catch (error) {
      console.log(error)
      setLoginError(true)
      setTimeout(() => {
        setLoginError(false)
      }, 3000);
      
    }
    finally{
      setIsLoading(false)
    }

  }


  return (
    <AuthFormLayout>
      <form
        onSubmit={onSubmit}
        className="flex justify-center w-[min(384px,100%)] md:w-[min(566px,100%)] gap-4 flex-col"
      >
        <h1 className="text-5xl font-bold mb-8">Rolando agora</h1>
        <h2 className="text-2xl font-bold mb-8">Junte-se aos bons</h2>
        <Input
          placeholder="Handle"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button loading={isLoading} thickness="thick">
          Login
        </Button>
        {loginError ? <span className="text-red-600 mx-auto ">Email ou Senha incorretos!</span> : null}
        <Link className="pt-4 hover:underline mx-auto " to="/signup">
          Cadastrar
        </Link>
      </form>
    </AuthFormLayout>
  );
};
