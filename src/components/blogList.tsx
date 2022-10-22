/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useEffect, useState } from "react";

// Third-party imports
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

// App imports
import CardBlog from "@components/cardBlog";

import { GET_FAVORITE_BLOGS_IDS_BY_USER } from "@graphql/queries";

import useSaveFavoriteBlog from "@hooks/useSaveFavoriteBlog";

/* ––
 * –––– Props interface declaration
 * –––––––––––––––––––––––––––––––––– */
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

interface BlogListProps {
  blogs: BlogThumbnail[];
  loadMore: () => void;
}
/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function BlogList({ blogs, loadMore }: BlogListProps) {
  const [favoritesBlogsIds, setFavoritesBlogsIds] = useState<string[]>([]);
  const { handleSaveFavoriteBlog, handleRemoveFavoriteBlog } =
    useSaveFavoriteBlog();
  const { data: session } = useSession();
  const {
    loading: loadingBlogIds,
    data: blogIds,
    fetchMore: refreshIds,
  } = useQuery(GET_FAVORITE_BLOGS_IDS_BY_USER, {
    variables: {
      email: session?.user?.email,
    },
  });

  useEffect(() => {
    if (blogIds && blogIds.getFavoriteBlogsIdsByUser) {
      setFavoritesBlogsIds(blogIds.getFavoriteBlogsIdsByUser.favoriteBlogsIds);
    }
  }, [blogIds, loadingBlogIds]);

  const handleFavorite = (blogId: string, isSave: boolean): boolean => {
    setTimeout(() => {
      if (session?.user?.email) {
        refreshIds({
          variables: {
            email: session?.user.email,
          },
        });
      }
    }, 0);

    if (session?.user?.email && isSave) {
      return handleSaveFavoriteBlog(blogId, session?.user?.email);
    }

    if (session?.user?.email && !isSave) {
      return handleRemoveFavoriteBlog(blogId, session?.user?.email);
    }

    return false;
  };

  const checkIfBlogIsFavorite = (blogId: string): boolean => {
    if (!!favoritesBlogsIds.length) {
      return favoritesBlogsIds.includes(blogId);
    }

    return false;
  };

  return (
    <div className="max-w-5xl m-auto mt-8 mb-7 flex flex-col justify-center items-center">
      <div>
        <div className="justify-center flex flex-wrap items-center m-auto">
          {blogs.map((blog: BlogThumbnail, index) => (
            <CardBlog
              isFavorite={checkIfBlogIsFavorite(blog._id)}
              isUserActive={!!session?.user?.email}
              handleFavorite={handleFavorite}
              key={index}
              blog={blog}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          className="flex items-center relative font-bold justify-center px-6 py-2 w-7/12 rounded-md text-primary border-2 border-gray-300"
          onClick={loadMore}
        >
          Load more{" "}
          <ArrowRightIcon className="h-4 font-bold absolute right-10" />
        </button>
      </div>
    </div>
  );
}
