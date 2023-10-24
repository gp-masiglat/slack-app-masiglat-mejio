"use client";
import { FC, ReactElement } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  hasAuthenticatedUser: boolean;
}
const Header: FC<Props> = (props): ReactElement => {
  const { hasAuthenticatedUser } = props;
  const route = useRouter();

  const onLogoutCLick = () => {
    sessionStorage.clear();
    route.push("/");
  };
  return (
    <header className="w-full bg-[#4fb5bf] flex items-center justify-end h-14">
      <Link href="/">
        <p className="mx-4">Home </p>
      </Link>
      <p className="mx-4">About </p>
      <Link href="/conversations" className="mx-4 underline">
        Conversations{" "}
      </Link>
      <Link href="/channels" className="mx-4 underline">
        Channels{" "}
      </Link>
      {!hasAuthenticatedUser ? (
        <Link href="/login">
          <button
            className={`bg-[#2f855a] text-white text-xl p-2 border-none rounded mx-4`}
          >
            Login
          </button>
        </Link>
      ) : (
        <button
          className={`bg-red-500 text-white text-xl p-2 border-none rounded mx-4`}
          onClick={onLogoutCLick}
        >
          Logout
        </button>
      )}
    </header>
  );
};
export default Header;
