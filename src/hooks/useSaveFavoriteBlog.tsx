/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useState } from "react";

// Third-party imports
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

// App imports
import { REMOVE_FAVORITE_BLOG, SET_FAVORITE_BLOG } from "@graphql/queries";

/* ––
 * –––– Hook declaration
 * –––––––––––––––––––––––––––––––––– */
export default function useSaveFavoriteBlog() {
  const [blogId, setBlogId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [saveFavoriteBlog, { error }] = useMutation(SET_FAVORITE_BLOG, {
    variables: {
      userEmail: userEmail,
      blogId: blogId,
    },
  });

  const [removeFavoriteBlog, { error: errorRemove }] = useMutation(
    REMOVE_FAVORITE_BLOG,
    {
      variables: {
        blogId: blogId,
        userEmail: userEmail,
      },
    }
  );

  const handleSaveFavoriteBlog = (blogId: string, userEmail: string) => {
    setBlogId(blogId);
    setUserEmail(userEmail);

    saveFavoriteBlog({
      variables: {
        userEmail: userEmail,
        blogId: blogId,
      },
    });

    if (!error) {
      toast.success("Blog added to favorites successfully");
      return true;
    }

    if (error) {
      toast.error("Error adding blog to favorites");
      return false;
    }

    return false;
  };

  const handleRemoveFavoriteBlog = (blogId: string, userEmail: string) => {
    setBlogId(blogId);
    setUserEmail(userEmail);
    removeFavoriteBlog({
      variables: {
        userEmail: userEmail,
        blogId: blogId,
      },
    });

    if (!errorRemove) {
      toast.success("Blog removed from favorites successfully");
      return true;
    }

    if (errorRemove) {
      toast.error("Error removing blog from favorites");
      return false;
    }

    return false;
  };

  return {
    handleSaveFavoriteBlog,
    handleRemoveFavoriteBlog,
  };
}
