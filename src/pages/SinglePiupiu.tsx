import { useCallback, useEffect, useRef, useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { NavHeader } from "../components/NavHeader";
import { Piu } from "../types/Pius";
import NewPiupiu from "../components/NewPiupiu";
import { PiupiuList } from "../components/PiupiuList";
import { User } from "../types/Users";
import { dislikeRequest, likeRequest, likedRequest, repliesRequest, replyRequest, singlePiuRequest } from "../service/requestsAPI";
import { useParams } from "react-router-dom";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState<Piu>();
  const [userReply, setuserReply] = useState("");
  const [replying, setReplying] = useState(false);
  const {id} = useParams()
  const storageUser = JSON.parse(localStorage.getItem('user') as string)
  
  const singlePiuStart = async () =>{
  const responseSingle = await singlePiuRequest(id as string)
  const responseLiked = await likedRequest(id as string, storageUser.handle)
  const likedByUser : boolean = responseLiked.data.users.find((handle:string)=>handle===storageUser.handle)
  
  setPost(responseSingle.data)
  setLiked(likedByUser ? true : false)
} 

useEffect(()=> {
  getReplies()
  singlePiuStart()
},[liked,userReply])

const handleSubmit = async (e: React.FormEvent, replyText?: string) => {
  try {
    setReplying(true);
    replyRequest(id as string, replyText as string, storageUser.handle);
  } catch (error) {
    console.log(error)
  } finally{
    setuserReply('')
    setReplying(false)
  }  
};

const getReplies = useCallback(async () => {
    const responseReplies = await repliesRequest(id as string)
    setReplies(responseReplies.data.replies)
  }, [replies]);

  const handleLike = useCallback(async () => {
    try {
      liked ? 
      await dislikeRequest(id ? id : '', storageUser.handle)
      :await likeRequest(id ? id : '', storageUser.handle)
    } catch (error) {
      console.log(error)
    } finally {
      setLiked(!liked)
    }
  }, [liked]);

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
        user={storageUser as User}
        variant="reply"
        value={userReply}
        loading={replying}
      />
      <PiupiuList piupius={replies} onChange={getReplies} />
    </>
  );
};
