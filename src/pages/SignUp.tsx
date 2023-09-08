import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { useNavigate } from "react-router-dom";
import { singUpRequest } from "../service/requestsAPI";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    signUpRequisition();
    e.preventDefault();
  };

  const navigate = useNavigate()

  const signUpRequisition = async() => {
  try {
    setSigningUp(true)
    await singUpRequest(name,handle,password)
    navigate('/')
  } catch (error) {
    console.log(error)
    setSignUpError(true)
    setTimeout(() => {
      setSignUpError(false)
    }, 3000);
  }
  finally{
    setSigningUp(false)
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
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {signUpError ? <span className="text-red-600 mx-auto ">Erro no cadastro, tente novamente!</span> : null}
        <Button loading={signingUp} thickness="thick">
          Cadastrar
        </Button>
      </form>
    </AuthFormLayout>
  );
};
