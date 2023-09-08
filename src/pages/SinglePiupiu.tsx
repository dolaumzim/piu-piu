import { useCallback, useEffect, useRef, useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { NavHeader } from "../components/NavHeader";
import { Piu } from "../types/Pius";
import NewPiupiu from "../components/NewPiupiu";
import { PiupiuList } from "../components/PiupiuList";
import { User } from "../types/Users";
import { likeRequest, singlePiuRequest } from "../service/requestsAPI";
import { useParams } from "react-router-dom";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState<Piu>();
  const [userReply, setuserReply] = useState("");
  const [replying, setReplying] = useState(false);
  const {id} = useParams()
  
  const teste = async () =>{
  const response = await singlePiuRequest(id ? id : '')
  setPost(response.data)
  }
 
  useEffect(()=> {
    teste()
  },[])
  
  const handleSubmit = async (e: React.FormEvent, replyText?: string) => {
    console.log(e, replyText);
  };

  const getReplies = useCallback(async () => {}, []);

  const handleLike = useCallback(async () => {
    try {
      await likeRequest(id ? id : '', liked)
    } catch (error) {
      
    }
  }, []);

  return (
    <>
      <NavHeader title="Post" />
      <CompletePiupiu
        author={post?.author}
        body={post?.message || ""}
        reactions={{
          reactions: {
            comment: {
              active: false,
              total: post?.replies?.total,
            },
            repiu: {
              active: false,
              total: 0,
            },
            like: {
              total: post?.likes?.total,
              active: liked,
              onClick: handleLike,
            },
          },
        }}
      />
      <NewPiupiu
        onChange={(e) => setuserReply(e.target.value)}
        onSubmit={handleSubmit}
        user={{} as User}
        variant="reply"
        value={userReply}
        loading={replying}
      />
      <PiupiuList piupius={replies} onChange={getReplies} />
    </>
  );
};
