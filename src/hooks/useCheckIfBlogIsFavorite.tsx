/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useEffect, useState } from "react";

// Third-party imports
import { useQuery } from "@apollo/client";

// App imports
import { GET_FAVORITE_BLOGS_IDS_BY_USER } from "@graphql/queries";

/* ––
 * –––– Hook declaration
 * –––––––––––––––––––––––––––––––––– */
export default function useCheckIdBlogIsFavorite(
  userEmail: string,
  blogId: string
) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    loading: loadingBlogIds,
    data: blogIds,
    fetchMore: refreshIds,
  } = useQuery(GET_FAVORITE_BLOGS_IDS_BY_USER, {
    variables: {
      email: userEmail,
    },
  });

  useEffect(() => {
    refreshIds({
      variables: {
        email: userEmail,
      },
    });
  }, []);

  useEffect(() => {
    if (!!blogIds && !!blogIds.getFavoriteBlogsIdsByUser) {
      setIsFavorite(
        blogIds.getFavoriteBlogsIdsByUser.favoriteBlogsIds.includes(blogId)
      );
    }
  }, [blogIds, loadingBlogIds]);

  return isFavorite;
}
