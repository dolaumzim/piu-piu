import { useState } from "react";
import Input from "../Input";
import ProfilePic from "../ProfilePic";
import { User } from "../../types/Users";
import Button from "../Button";
import { Textarea } from "../Textarea";
import { editUserRequest } from "../../service/requestsAPI";
import { useGlobal } from "../../context/global";

type ProfileEditFormProps = {
  onSubmit?: (user: Partial<User>) => void;
  user: User;
};

export const ProfileEditForm = ({ onSubmit, user }: ProfileEditFormProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState(user.description || "");
  const [name, setName] = useState(user.name);

  const {localUser, setLocalUser,token} = useGlobal()

  const handleOnSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const userData: Partial<User> = {
      description,
      image_url: imageUrl,
      name,
    };
    onSubmit?.(userData);

      try {
        const updatedUser = {...localUser, ...userData}
        await editUserRequest(localUser.handle, updatedUser, token)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setLocalUser(updatedUser)
      } catch (error) {
        console.log(error)
      } 
  };
  
  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="w-[min(500px,90vw)] p-8 select-none gap-4 items-center flex-col flex"
      >
        <ProfilePic
          variant="reallyBig"
          userName=""
          image={imageUrl || user.image_url}
        />
        <Input
          placeholder="Link da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Input
          defaultValue={user.name}
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          variant="styled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <Button type="submit">Salvar</Button>
      </form>
    </>
  );
};
