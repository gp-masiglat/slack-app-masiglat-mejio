import { FC, ReactElement } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  hasAuthenticatedUser: boolean;
}

const Header: FC<Props> = ({ hasAuthenticatedUser }: Props): ReactElement => {
  const router = useRouter();

  const onLogoutClick = () => {
    sessionStorage.clear();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full bg-[#4fb5bf] flex items-center justify-end h-14">
      <Link href="/" passHref>
        <p className="mx-4">Home </p>
      </Link>
      <Link href="/about" passHref>
        <p className="mx-4">About </p>
      </Link>
      <Link href="/conversations" passHref>
        <p className="mx-4 underline">Conversations </p>
      </Link>
      <Link href="/channels" passHref>
        <p className="mx-4 underline">Channels </p>
      </Link>
      {!hasAuthenticatedUser ? (
        <Link href="/login" passHref>
          <button className="bg-[#2f855a] text-white text-xl p-2 border-none rounded mx-4">
            Login
          </button>
        </Link>
      ) : (
        <button
          className="bg-red-500 text-white text-xl p-2 border-none rounded mx-4"
          onClick={onLogoutClick}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
