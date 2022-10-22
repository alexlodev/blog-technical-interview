/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Third-party imports
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import momment from "moment";

// App imports
import FacebookIcon from "@assets/icons/face.png";
import TwitterIcon from "@assets/icons/twitter.png";
import InstagramIcon from "@assets/icons/insta.png";

import BlogModal from "@components/blogModal";

import { ModalBlogTypes } from "@constants/enums/modal-auth-types";

import { GET_BLOG_BY_ID } from "@graphql/queries";

interface BlogContent {
  _id: string;
  title: string;
  description: string;
  author: string;
  authorImg: string;
  date: string;
  img: string;
  captionImage: string;
  content: string;
}

/* ––
 * –––– Page declaration
 * –––––––––––––––––––––––––––––––––– */
export default function Article() {
  const [blog, setBlog] = useState<BlogContent | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const { data, fetchMore } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id: router.query.id,
    },
  });

  useEffect(() => {
    if (!!data && !!data.getBlogById) setBlog(data.getBlogById);
  }, [data]);

  useEffect(() => {
    fetchMore({
      variables: {
        id: router.query.id,
      },
    });
  }, [isModalOpen]);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {blog && (
        <div className="text-center mx-5 flex-1 justify-center sm:m-auto max-w-2xl mt-20">
          <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
          <h3 className="text-2xl text-gray-700 font-bold">
            {blog.description}
          </h3>

          <div className="flex items-center justify-between my-16">
            <div className="flex items-center">
              <img
                className="shadow-lg rounded-full w-8 h-8 align-middle border-none object-cover mr-2"
                src={blog.authorImg}
                alt={`${blog.author}-image`}
              />
              <div className="text-left">
                <p className="text-xs font-bold">{blog.author}</p>
                <p className="text-xs text-gray-600 font-bold">
                  Published on {momment(blog.date).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-xs mr-4 text-gray-600 font-bold">SHARE:</p>

              <a className="mr-4">
                <Image
                  className="align-middle border-none object-cover"
                  src={FacebookIcon}
                  width={24}
                  height={24}
                  alt="facebook-icon"
                />
              </a>
              <a className="mr-4">
                <Image
                  className="align-middle border-none object-cover"
                  src={TwitterIcon}
                  width={24}
                  height={24}
                  alt="twitter-icon"
                />
              </a>
              <a className="mr-4">
                <Image
                  className="align-middle border-none object-cover"
                  width={24}
                  height={24}
                  src={InstagramIcon}
                  alt="instagram-icon"
                />
              </a>
            </div>
          </div>

          <img className="w-full " src={blog.img} alt={blog.captionImage} />
          <p className="text-base text-gray-600 my-7 font-bold">
            {blog.captionImage}
          </p>

          <p className="text-lg font-bold text-justify break-all">
            {blog.content}
          </p>
        </div>
      )}
      {isModalOpen && (
        <BlogModal
          type={ModalBlogTypes.UPDATE}
          blog={blog}
          closeModal={handleModal}
        />
      )}

      {!!session && (
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="fixed bottom-0 right-0 mb-10 mr-10 bg-primary text-white font-bold py-5 px-5 rounded-full"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}
    </>
  );
}
