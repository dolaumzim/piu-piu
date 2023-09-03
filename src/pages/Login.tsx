import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../service/requestsAPI";


export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const navigate = useNavigate()
  
  const teste = async() => {
    try {
      setIsLoading(true)
      const data = await loginRequest(user,password)
      console.log(data)
      // navigate('/home')
      
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
        <Button onClick={()=>teste()} loading={isLoading} thickness="thick">
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
