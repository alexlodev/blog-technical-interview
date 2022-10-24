/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Third-party imports
import { useSession, signOut } from "next-auth/react";

// App imports
import Logo from "@assets/Logo.png";

import AuthModal from "./authModal";

import { ModalAuthTypes } from "@constants/enums/modal-auth-types";

/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { data: session } = useSession();
  const [modalType, setModalType] = useState<ModalAuthTypes>(
    ModalAuthTypes.SIGN_IN
  );

  const router = useRouter();

  const openModal = (type: ModalAuthTypes) => {
    setShowModal(true);
    setModalType(type);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <nav className=" bg-white h-20 py-4">
        <div className="justify-between max-w-5xl mx-4 relative flex items-center lg:m-auto">
          <Image src={Logo} alt="app-logo" />
          <ul className="space-x-10 hidden sm:flex items-center">
            <li
              className={`text-lg leading-6 font-bold text-gray-700 hover:text-primary ${
                router.pathname === "/" ? "text-primary" : ""
              }`}
            >
              <Link href="/">Articles</Link>
            </li>
            <li
              className={`text-lg leading-6 font-bold text-gray-700 hover:text-primary ${
                router.pathname === "/favorites" ? "text-primary" : ""
              }`}
            >
              <Link href="/favorites">Favorites</Link>
            </li>
          </ul>

          {!session || !session.user ? (
            <div className="space-x-4 hidden sm:flex">  
              <button
                className="bg-primary text-white px-6 py-2 rounded-md"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => openModal(ModalAuthTypes.SIGN_IN)}
              >
                Login
              </button>
              <button
                className="bg-primary text-white px-6 py-2 rounded-md"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => openModal(ModalAuthTypes.SIGN_UP)}
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="space-x-4 hidden sm:block">
              <button
                className="bg-primary text-white px-6 py-2 rounded-md"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          )}

          <button
            type="button"
            className="inline-flex sm:hidden items-center p-2 ml-3 text-sm rounded-lg md:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {showMenu && (
            <div className="text-center bg-white absolute right-0 top-16 w-52 z-10 py-4 rounded-bl-lg rounded-br-lg shadow-lg">
              <ul className="space-y-6">
                <li
                  className={`text-lg leading-6 font-bold text-gray-700 hover:text-primary ${
                    router.pathname === "/" ? "text-primary" : ""
                  }`}
                >
                  <Link href="/">Articles</Link>
                </li>
                <li
                  className={`text-lg leading-6 font-bold text-gray-700 hover:text-primary ${
                    router.pathname === "/favorites" ? "text-primary" : ""
                  }`}
                >
                  <Link href="/favorites">Favorites</Link>
                </li>
                {!session || !session.user ? (
                  <div className="flex flex-col mx-8 space-y-4">
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-md"
                      type="button"
                      data-modal-toggle="defaultModal"
                      onClick={() => openModal(ModalAuthTypes.SIGN_IN)}
                    >
                      Login
                    </button>
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-md"
                      type="button"
                      data-modal-toggle="defaultModal"
                      onClick={() => openModal(ModalAuthTypes.SIGN_UP)}
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div className="space-x-4">
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-md"
                      type="button"
                      data-modal-toggle="defaultModal"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
      {showModal && <AuthModal type={modalType} closeModal={closeModal} />}
    </>
  );
}
