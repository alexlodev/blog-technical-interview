/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useEffect, useState } from "react";

// Third-party imports
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

// App imports
import EmptyState from "@components/emptyState";
import OverLayoutLoading from "@components/overlayLoading";
import BlogList from "@components/blogList";
import SearchBar from "@components/searchBar";
import Wrapper from "@components/wrapper";

import {
  GET_BLOGS_BY_IDS,
  GET_FAVORITE_BLOGS_IDS_BY_USER,
} from "@graphql/queries";
import Footer from "@components/footer";

/* ––
 * –––– Page declaration
 * –––––––––––––––––––––––––––––––––– */
export default function Favorites() {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [limit, setLimit] = useState(6);
  const [searchCriteria, setSearchCriteria] = useState("");
  const { data: session } = useSession();

  const { loading: loadingBlogIds, data: blogIds } = useQuery(
    GET_FAVORITE_BLOGS_IDS_BY_USER,
    {
      variables: {
        email: session?.user?.email,
      },
    }
  );

  const { loading, error, data, fetchMore } = useQuery(GET_BLOGS_BY_IDS, {
    variables: {
      ids: blogIds?.getFavoriteBlogsIdsByUser?.favoriteBlogsIds,
      limit,
      search: searchCriteria,
    },
  });

  useEffect(() => {
    if (!!blogIds && !!blogIds.getFavoriteBlogsIdsByUser && !loadingBlogIds) {
      fetchMore({
        variables: {
          ids: blogIds.getFavoriteBlogsIdsByUser.favoriteBlogsIds,
          limit,
          search: searchCriteria,
        },
      });
    }
  }, [loadingBlogIds]);

  useEffect(() => {
    if (!!data && !!data.getBlogsByIds) setFavoriteBlogs(data.getBlogsByIds);
  }, [data, searchCriteria]);

  const handleLoadMore = () => {
    setLimit(limit + 6);
    fetchMore({
      variables: {
        limit: limit + 6,
        search: searchCriteria,
      },
    });
  };

  const handleSearch = (search: string) => {
    setLimit(6);
    setSearchCriteria(search);
    fetchMore({
      variables: {
        limit,
        search,
      },
    });
  };
  if (loading) return <OverLayoutLoading />;
  return (
    <>
      <Wrapper>
        <SearchBar
          searchCriteria={searchCriteria}
          resultsCount={favoriteBlogs.length}
          handleSearch={handleSearch}
        />

        <>
          {!!favoriteBlogs.length ? (
            <BlogList blogs={favoriteBlogs} loadMore={handleLoadMore} />
          ) : (
            <EmptyState callback={() => setSearchCriteria("")} />
          )}
        </>
      </Wrapper>
      <Footer />
    </>
  );
}
