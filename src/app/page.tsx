"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";

export default function Home() {
  const [hasAuthenticatedUser, setHasAuthenticatedUser] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("loggedUser")) {
      setHasAuthenticatedUser(true);
    }
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen items-center overflow-none">
      <Header hasAuthenticatedUser={hasAuthenticatedUser} />
      <main className="flex items-center justify-center gap-8 mx-4">
        <div>
          <h1 className="text-orange-900 font-sans text-6xl font-black">
            Glad to be{" "}
          </h1>

          <h1 className="text-orange-900 font-sans text-6xl font-black">
            chatting with you!
          </h1>
          <br />
          <h3 className="text-2xl font-sans">
            Chat, share, and express yourself with our all-in-one chatting app.
          </h3>
          <h3 className="text-2xl font-sans">
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
