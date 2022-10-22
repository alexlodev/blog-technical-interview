import Image from "next/image";
import Logo from "@assets/Logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthModal from "./authModal";
import { useState } from "react";
import { ModalAuthTypes } from "@constants/enums/modal-auth-types";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
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
        <div className="justify-between max-w-5xl flex items-center m-auto">
          <Image src={Logo} alt="app-logo" />
          <ul className="space-x-10 items-center flex">
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
            <div className="space-x-4">
              <button
                className="text-lg font-bold leading-6 text-gray-700"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => openModal(ModalAuthTypes.SIGN_IN)}
              >
                Login
              </button>
              <button
                className="text-lg font-bold leading-6 text-gray-700"
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
                className="text-lg font-bold leading-6 text-gray-700"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      {showModal && <AuthModal type={modalType} closeModal={closeModal} />}
    </>
  );
}
