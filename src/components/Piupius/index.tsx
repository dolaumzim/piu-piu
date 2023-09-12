import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { User } from "../../types/Users";
import { ProfilePic } from "../ProfilePic";
import { ReactionsBar, reactions } from "../ReactionsBar";
import { Username } from "../Username";
import { useNavigate } from "react-router-dom";
import NewPiupiu from "../NewPiupiu";
import { forwardRef } from "react";
import { checkForImageLinks } from "../../helpers";
import { routes } from "../../routes";
import { dislikeRequest, likeRequest, likedRequest, replyRequest } from "../../service/requestsAPI";
import { useGlobal } from "../../context/global";

type PiupiuProps = {
  id: string;
  author: User;
  body: string;
  onChange?: () => void;
  reactions: Record<
  (typeof reactions)[number],
  { active?: boolean; total?: number }
  >;
  onClick?: () => void;
};

export const Piupiu = forwardRef(
  ({ id, author, body, reactions, onChange, onClick }: PiupiuProps, ref) => {
    const [liked, setLiked] = useState(reactions.like?.active);
    const [likesTotal, setLikesTotal] = useState(reactions.like?.total || 0);
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState(reactions.comment.total || 0);
    const navigate = useNavigate();
    const replyRef = useRef<HTMLDivElement | null>(null);
    const [foundLinks, setFoundLinks] = useState("");
    const storageUser = JSON.parse(localStorage.getItem('user') as string)
    
    const {token} = useGlobal()

    const handleLike = useCallback(async () => {
      try {
        liked ? 
        await dislikeRequest(id ? id : '', storageUser.handle, token)
        :await likeRequest(id ? id : '', storageUser.handle, token)
        const responseLiked = await likedRequest(id as string, storageUser.handle)
        const likedByUser : number = responseLiked.data.total
        setLikesTotal(likedByUser)
      } catch (error) {
        console.log(error)
      } finally {
        setLiked(!liked)
      }
    },[liked])

    const handleSubmit = async (e: React.FormEvent, submitingText?: string) => {
      e.preventDefault();
      setReplying(true);
      try {
        replyRequest(id as string, replyText as string, storageUser.handle,token);
        setReplies(replies + 1);
        setReplyText("");
      } catch (err) {
        console.log(err);
      }
      onChange?.();
      setReplying(false);
    };

    const handleClick = () => {
      onClick ? onClick() : navigate(routes.singlePiupiu(id));
    };
    const reactionProps = useMemo(() => {
      return {
        comment: {
          total: replies,
          active: replying,
          onClick: () => setReplying(!replying),
        },
        repiu: { ...reactions.repiu },
        like: {
          total: likesTotal,
          replies,
          active: liked,
          onClick: () => handleLike(),
        },
      };
    }, [reactions, liked, likesTotal, handleLike, replying]);

    useEffect(() => {
      setLiked(reactions?.like?.active);
      setLikesTotal(reactions?.like?.total || 0);
      setReplies(reactions?.comment.total || 0);
    }, [reactions]);

    useEffect(() => {
      const closeOnClickOut = (e: MouseEvent) => {
        if (
          replying &&
          replyRef.current &&
          !e.composedPath().includes(replyRef.current)
        ) {
          setReplying(false);
        }
      };

      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && replying) {
          setReplying(false);
        }
      };

      window.addEventListener("mousedown", closeOnClickOut);
      window.addEventListener("keydown", handleEscKey);

      return () => {
        window.removeEventListener("mousedown", closeOnClickOut);
        window.removeEventListener("keydown", handleEscKey);
      };
    }, [replying]);

    return (
      <div ref={replyRef}>
        <div className="flex flex-col w-full">
          <article
            ref={ref as any}
            onClick={handleClick}
            className="flex cursor-pointer hover:bg-[rgba(255,255,255,0.03)] select-none border-t-0 w-full px-4 py-2 border-[#2f3336] border-[1px] "
          >
            <ProfilePic image={author.image_url} userName={author.name} />
            <div className="px-2 w-full">
              <Username user={author} />
              <main className="mt-1 break-words pr-8 text-left mb-1">
                {checkForImageLinks(body, (link) => {
                  !foundLinks && setFoundLinks(link);
                })}
                <img className="w-full my-2" src={foundLinks} />
              </main>
              <ReactionsBar reactions={reactionProps} />
            </div>
          </article>
        </div>
        {replying && (
          <NewPiupiu
            value={replyText}
            onSubmit={handleSubmit}
            onChange={(e) => setReplyText(e.target.value)}
            variant="reply"
            user={{} as User}
          />
        )}
      </div>
    );
  }
);

export default Piupiu;
