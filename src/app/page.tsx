"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import './homepage.css';

export default function Home() {
  const [loggedUser, setLoggedUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    // console.log(localStorage.getItem("accounts"));
    //if (!localStorage.getItem("accounts")) router.push("/login");
    // else setLoggedUser(JSON.parse(localStorage.getItem("accounts")!));
  }, []);

  return (
    <div className="flex flex-col h-screen items-center">
      <header className="header">
        <p>Home </p>
        <p>About </p>
        <p>Discover </p>
        <Link href="/login"><button className="login">Login</button></Link>
      </header>
      <main className="main">
        <div>
        <h1>Glad to be </h1>
        <h1>chatting with you!</h1><br />
        <h3>Chat, share, and express yourself with our all-in-one chatting app.</h3>
        <h3>Chat with confidence, knowing that your conversations are secure and private.</h3>
        </div>
        <img src="https://theworkplacecafe.com/wp-content/uploads/2019/07/workplace-illustration-revised-768x362.png"></img>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
