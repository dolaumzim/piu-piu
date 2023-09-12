import { useState } from "react";
import { PiupiuList } from "../components/PiupiuList";
import { userPiuListRequest } from "../service/requestsAPI";
import { Piu } from "../types/Pius";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/global";
import { useQuery } from "@tanstack/react-query";

type ProfileProps = {
  postsRoute: "posts" | "likes";
};
export const Profile = ({ postsRoute }: ProfileProps) => {
  const [piupius, setPiupius] = useState<Piu[] | undefined>();
  let { handle } = useParams();
  const { token } = useGlobal();

  const { isFetching } = useQuery({
    queryKey: ["postsAndLikes", postsRoute, handle],
    queryFn: async () => {
      const response = await userPiuListRequest(
        handle ?? "",
        postsRoute,
        token
      );
      setPiupius(response);
      return response;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <main>
        <PiupiuList initialLoading={isFetching} piupius={piupius} />
      </main>
    </>
  );
};
