/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useState } from "react";
import Image from "next/image";

// Third-party imports
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

// App imports
import AuthModalImg from "@assets/auth-modal.png";
import useScapeKey from "@hooks/useEscapeKey";
import { ModalAuthTypes } from "@constants/enums/modal-auth-types";

/* ––
 * –––– Props interface declaration
 * –––––––––––––––––––––––––––––––––– */
interface AuthModalProps {
  type: ModalAuthTypes;
  closeModal: () => void;
}

/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function AuthModal({ type, closeModal }: AuthModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const isSignIn = type === ModalAuthTypes.SIGN_IN;

  const onSubmit = async (data: any) => {
    let res;
    if (!isSignIn) {
      res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        name: data.name,
      });
    } else {
      res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    }

    if (res && !res.error) {
      reset();
      closeModal();
    }
  };

  useScapeKey({ callback: closeModal });

  return (
    <motion.div>
      <div
        id="defaultModal"
        aria-hidden="true"
        className=" fixed overflow-y-auto overflow-x-hidden bg-backdrop-modal opacity-80 top-0 right-0 left-0 z-40 w-full inset-0 h-full"
      ></div>
      <div className="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full  max-w-4xl">
        <div className="relative flex justify-center sm:justify-between  items-center bg-white rounded-lg h-[426px] shadow ">
          <div className="m-0 hidden relative sm:block h-full w-full max-w-md">
            <Image
              layout="fill"
              objectFit="cover"
              alt="login-photo"
              src={AuthModalImg}
            />
          </div>

          <div className="px-14 text-center">
            <h1 className="font-bold text-3xl ">
              Sign {isSignIn ? "In" : "Up"}
            </h1>
            <p className="text-gray-700-light opacity-80 text-lg font-bold mb-6">
              Simplify your reading in minutes.
            </p>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                {...register("email")}
                className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your email"
                required
              />

              {!isSignIn && (
                <input
                  {...register("name")}
                  type="text"
                  className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Full name"
                  min={4}
                  required
                />
              )}

              <div className="relative space-y-0">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="border border-gray-300 placeholder:text-gray-700-light font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Password"
                  minLength={6}
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700-light"
                  >
                    {!showPassword ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    )}
                  </svg>
                </span>
              </div>

              <button
                type="submit"
                value="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-blue-700 focus:ring-blue-800"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
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
