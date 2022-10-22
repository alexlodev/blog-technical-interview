import { motion } from "framer-motion";
import useScapeKey from "@hooks/useEscapeKey";
import { ModalBlogTypes } from "@constants/enums/modal-auth-types";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG, UPDATE_BLOG } from "../graphql/queries";
import toast from "react-hot-toast";

export default function BlogModal({
  type,
  closeModal,
  blog,
}: {
  type: ModalBlogTypes;
  closeModal: () => void;
  blog?: any;
}) {
  const { register, handleSubmit, reset } = useForm();

  const [createBlog, { error: createError }] = useMutation(CREATE_BLOG);
  const [updateBlog, { error: updateError }] = useMutation(UPDATE_BLOG);
  useScapeKey({ callback: closeModal });

  const isCreate = type === ModalBlogTypes.CREATE;

  const onSubmit = async (data: any) => {
    let res;
    if (!isCreate) {
      res = await updateBlog({
        variables: {
          ...data,
          _id: blog._id,
          date: new Date(),
        },
      });
    } else {
      res = await createBlog({
        variables: {
          ...data,
          date: new Date(),
        },
      });
    }

    if (!!res.data && !res.errors) {
      toast.success(`Blog ${isCreate ? "created" : "edited"} successfully`);

      reset();
      closeModal();
    }
  };

  if (createError || updateError) {
    toast.error("Something went wrong. Please try again.");
  }

  return (
    <motion.div>
      <div
        id="defaultModal"
        aria-hidden="true"
        className=" fixed bg-backdrop-modal opacity-80 top-0 right-0 left-0 z-40 w-full inset-0 h-modal h-full"
      ></div>
      <div className="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="relative flex justify-center items-center m-auto bg-white rounded-lg h-auto shadow py-10 max-w-xl my-3">
          <div className="text-center">
            <h1 className="font-bold text-3xl ">
              {isCreate ? "Create blog" : "Edit blog"}
            </h1>
            <p className="text-gray-700-light opacity-80 text-lg font-bold mb-6">
              Simplify your reading in minutes.
            </p>
            <form
              className="flex flex-col space-y-4 text-left"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <input
                  {...register("title")}
                  type="text"
                  className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Blog title"
                  aria-label="Blog title"
                  defaultValue={blog?.title || ""}
                  min={10}
                  required
                />
              </div>

              <input
                {...register("thumbnail")}
                type="url"
                aria-label="Thumbnail"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Thumbnail image"
                defaultValue={blog?.thumbnail || ""}
                min={4}
                required
              />

              <input
                {...register("author")}
                type="text"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Author name"
                aria-label="Author name"
                defaultValue={blog?.author || ""}
                min={4}
                required
              />

              <input
                {...register("authorImg")}
                type="url"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Author image"
                aria-label="Author image"
                defaultValue={blog?.authorImg || ""}
                min={4}
                required
              />

              <input
                {...register("description")}
                type="text"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Blog description"
                aria-label="Blog description"
                defaultValue={blog?.description || ""}
                min={10}
                required
              />

              <input
                {...register("price")}
                type="number"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Price"
                aria-label="Price"
                defaultValue={blog?.price || ""}
                required
              />

              <input
                {...register("modality")}
                type="text"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Modality"
                aria-label="Modality"
                defaultValue={blog?.modality || ""}
                max={7}
                required
              />

              <input
                {...register("img")}
                type="url"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Blog image"
                aria-label="Blog image"
                defaultValue={blog?.img || ""}
                required
              />
              <input
                {...register("captionImage")}
                type="text"
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Caption image"
                aria-label="Caption image"
                defaultValue={blog?.captionImage || ""}
                min={4}
                required
              />
              <textarea
                {...register("content")}
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Blog content"
                aria-label="Blog content"
                defaultValue={blog?.content || ""}
                required
              />

              <button
                type="submit"
                value="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-blue-700 focus:ring-blue-800"
              >
                {isCreate ? "Create blog" : "Update blog"}
              </button>
            </form>
          </div>

          <button
            type="button"
            aria-label="Close"
            className="text-gray-400 absolute top-0 right-0 p-4 rounded-lg text-sm text-white-gray"
            onClick={closeModal}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
