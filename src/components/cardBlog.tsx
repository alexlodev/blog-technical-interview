import momment from "moment";
import { useEffect, useState } from "react";
import MotionDiv from "./motion.div";
import { useRouter } from "next/router";
import useSaveFavoriteBlog from "@hooks/useSaveFavoriteBlog";

interface BlogThumbnail {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  author: string;
  authorImg: string;
  price: string;
  modality: string;
}

export default function CardBlog({
  blog,
  isFavorite,
  isUserActive,
  handleFavorite,
}: {
  blog: BlogThumbnail;
  isUserActive: boolean;
  isFavorite: boolean;
  handleFavorite: (blogId: string, isSave: boolean) => boolean;
}) {
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  const formatedDate = momment(blog.date).format("MMM DD").toUpperCase();
  return (
    <MotionDiv
      tabIndex="0"
      onClick={(event: any) => {
        event.stopPropagation();
        router.push(`/article/${blog._id}`);
      }}
      className="bg-white shadow-sm flex flex-col justify-center items-center relative rounded-md max-w-xs my-4 mx-2 cursor-pointer"
    >
      <img
        alt="login-photo"
        id="card-img"
        className="rounded-t-md object-cover w-full h-48 [clip-path:ellipse(100%_92%_at_30%_8%)]        "
        crossOrigin="anonymous"
        src={blog.thumbnail}
      />
      <div className="px-6 py-4 mt-4 divide-y divide-gray-300">
        <div className="mb-4">
          <h2 className="font-bold text-xl line-clamp-3">{blog.title}</h2>
          <p className="line-clamp-2 text-base text-gray-300-lighter mt-2">
            {blog.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center">
            <img
              className="shadow-lg rounded-full relative w-8 h-8 align-middle border-none object-cover mr-2"
              src={blog.authorImg}
              alt={`${blog.author}-image`}
            />
            <p className="text-gray-300-lighter opacity-70 font-bold text-xs">
              {blog.author.toUpperCase()}
            </p>
          </div>

          <p className="text-gray-300-lighter opacity-70 font-bold text-xs">
            {formatedDate}
          </p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full text-white bg-success-green font-bold flex align-center w-max absolute top-4">
          {`$${blog.price} / mo`}
        </span>
      </div>
      {!!isUserActive && (
        <span
          className="absolute top-1 right-1 m-2"
          onClick={(event) => {
            event.stopPropagation();
            if (isFavoriteState) {
              let res = handleFavorite(blog._id, false);

              if (res) {
                setIsFavoriteState(false);
              }
            }

            if (!isFavoriteState) {
              let res = handleFavorite(blog._id, true);

              if (res) {
                setIsFavoriteState(true);
              }
            }
          }}
        >
          {isFavoriteState ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6.20038C16 6.38185 15.875 6.55325 15.75 6.68431L12.2596 10.2533L13.0865 15.2943C13.0962 15.3648 13.0962 15.4253 13.0962 15.4959C13.0962 15.758 12.9808 16 12.7019 16C12.5673 16 12.4327 15.9496 12.3173 15.879L8 13.4997L3.68269 15.879C3.55769 15.9496 3.43269 16 3.29808 16C3.01923 16 2.89423 15.758 2.89423 15.4959C2.89423 15.4253 2.90385 15.3648 2.91346 15.2943L3.74038 10.2533L0.240385 6.68431C0.125 6.55325 0 6.38185 0 6.20038C0 5.89792 0.298077 5.77694 0.538462 5.73661L5.36538 5.00063L7.52885 0.413359C7.61538 0.221802 7.77885 0 8 0C8.22115 0 8.38462 0.221802 8.47115 0.413359L10.6346 5.00063L15.4615 5.73661C15.6923 5.77694 16 5.89792 16 6.20038Z"
                fill="url(#paint0_linear_1_923)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_923"
                  x1="9.00355"
                  y1="23.4982"
                  x2="24"
                  y2="7.49822"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC726" />
                  <stop offset="1" stopColor="#F99716" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6.20038C16 6.38185 15.875 6.55325 15.75 6.68431L12.2596 10.2533L13.0865 15.2943C13.0962 15.3648 13.0962 15.4253 13.0962 15.4959C13.0962 15.758 12.9808 16 12.7019 16C12.5673 16 12.4327 15.9496 12.3173 15.879L8 13.4997L3.68269 15.879C3.55769 15.9496 3.43269 16 3.29808 16C3.01923 16 2.89423 15.758 2.89423 15.4959C2.89423 15.4253 2.90385 15.3648 2.91346 15.2943L3.74038 10.2533L0.240385 6.68431C0.125 6.55325 0 6.38185 0 6.20038C0 5.89792 0.298077 5.77694 0.538462 5.73661L5.36538 5.00063L7.52885 0.413359C7.61538 0.221802 7.77885 0 8 0C8.22115 0 8.38462 0.221802 8.47115 0.413359L10.6346 5.00063L15.4615 5.73661C15.6923 5.77694 16 5.89792 16 6.20038Z"
                fill="#B4C2D3"
              />
            </svg>
          )}
        </span>
      )}
    </MotionDiv>
  );
}
