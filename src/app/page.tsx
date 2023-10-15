"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loggedUser, setLoggedUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    // console.log(localStorage.getItem("accounts"));
    if (!localStorage.getItem("accounts")) router.push("/login");
    // else setLoggedUser(JSON.parse(localStorage.getItem("accounts")!));
  }, []);

  return (
    //put main UI here
    <div className="flex flex-col justify-center h-screen items-center"></div>
  );
}
