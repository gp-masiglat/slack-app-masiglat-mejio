"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./homepage.css";
import Header from "./components/Header";

export default function Home() {
  type loggedUser = {
    id: number;
    accessToken: string;
    expiry: string;
    client: string;
    uid: string;
  };

  const [loggedUser, setLoggedUser] = useState({
    id: 0,
    accessToken: "",
    expiry: "",
    client: "",
    uid: "",
  });
  const router = useRouter();
  const [hasAuthenticatedUser, setHasAuthenticatedUser] = useState(false);

  useEffect(() => {
    // console.log(localStorage.getItem("accounts"));
    if (sessionStorage.getItem("loggedUser")) {
      setLoggedUser(JSON.parse(sessionStorage.getItem("loggedUser")!));
      setHasAuthenticatedUser(true);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen items-center">
      <Header hasAuthenticatedUser={hasAuthenticatedUser} />
      <main className="main flex items-center justify-center gap-2 mx-4">
        <div>
          <h1>Glad to be </h1>
          <h1>chatting with you!</h1>
          <br />
          <h3>
            Chat, share, and express yourself with our all-in-one chatting app.
          </h3>
          <h3>
            Chat with confidence, knowing that your conversations are secure and
            private.
          </h3>
        </div>
        <img src="https://theworkplacecafe.com/wp-content/uploads/2019/07/workplace-illustration-revised-768x362.png"></img>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
