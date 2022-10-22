/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import { useForm } from "react-hook-form";

/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function SearchBar({
  handleSearch,
  resultsCount,
  searchCriteria,
}: {
  handleSearch: (search: string) => void;
  searchCriteria: string;
  resultsCount: number;
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (event: any) => {
    handleSearch(event.search);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="justify-between flex-1 max-w-5xl items-center m-auto mt-7"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-700 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          {...register("search")}
          onChange={(e) => handleSearch(e.target.value)}
          className="block p-4 pl-10 w-full shadow-lg text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          value={searchCriteria || ""}
          required
        />
        {/* Results count */}
        <div className="flex absolute bottom-2.5 right-2.5 items-center">
          {searchCriteria && (
            <span className="font-bold text-xs text-gray-700 mr-4">
              {resultsCount > 1
                ? resultsCount + " RESULTS"
                : resultsCount === 1
                ? resultsCount + " RESULT"
                : "NO RESULTS"}
            </span>
          )}
          <button
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
