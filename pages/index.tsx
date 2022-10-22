/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// Third-party imports
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

// App imports
import BlogList from "@components/blogList";
import SearchBar from "@components/searchBar";
import Wrapper from "@components/wrapper";
import EmptyState from "@components/emptyState";
import BlogModal from "@components/blogModal";
import OverLayoutLoading from "@components/overlayLoading";
import Footer from "@components/footer";

import { ModalBlogTypes } from "@constants/enums/modal-auth-types";

import { GET_BLOGS } from "@graphql/queries";

/* ––
 * –––– Page declaration
 * –––––––––––––––––––––––––––––––––– */
const Home: NextPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(6);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const { loading, error, data, fetchMore } = useQuery(GET_BLOGS, {
    variables: {
      limit,
      search: searchCriteria,
    },
  });

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!!data && !!data.getAllBlogs) setBlogs(data.getAllBlogs);
  }, [data, searchCriteria]);

  useEffect(() => {
    fetchMore({
      variables: {
        limit,
        search: searchCriteria,
      },
    });
  }, [isModalOpen]);

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

  return (
    <>
      <Wrapper>
        <SearchBar
          searchCriteria={searchCriteria}
          resultsCount={blogs.length}
          handleSearch={handleSearch}
        />

        {loading && !searchCriteria ? (
          <OverLayoutLoading />
        ) : (
          <>
            {!!blogs.length && !loading && !error ? (
              <BlogList blogs={blogs} loadMore={handleLoadMore} />
            ) : (
              <EmptyState callback={() => setSearchCriteria("")} />
            )}
          </>
        )}

        {isModalOpen && (
          <BlogModal type={ModalBlogTypes.CREATE} closeModal={handleModal} />
        )}
      </Wrapper>
      <Footer />
      {session && (
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="fixed bottom-0 right-0 mb-10 mr-10 bg-primary text-white font-bold py-5 px-5 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Home;
