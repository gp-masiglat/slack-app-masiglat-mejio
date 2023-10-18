"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { json } from "stream/consumers";
import Input from "../components/Input";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState({});

  const onEmailChange = (e: any) => setEmail(e.target.value);
  const onPasswordChange = (e: any) => setPassword(e.target.value);

  const authenticateUser = async () => {
    const body = {
      email,
      password,
    };

    try {
      const res = await fetch(`http://206.189.91.54/api/v1/auth/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.hasOwnProperty("errors")) {
        setErrorMessage(data.errors.join("\n"));
        return;
      }
      const id = data.data.id;
      const uid = res.headers.get("uid");
      const expiry = res.headers.get("expiry")!;
      const accessToken = res.headers.get("access-token");
      const client = res.headers.get("client");
      const loggedUser = {
        id,
        accessToken,
        expiry,
        client,
        uid,
      };
      return loggedUser;
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticateUser();
    const responseObject = await authenticateUser();
    if (responseObject !== undefined) {
      sessionStorage.setItem("loggedUser", JSON.stringify(responseObject));
      router.push("./");
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <form
        className="flex flex-col w-1/2 items-center bg-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
        onSubmit={submitHandler}
      >
        <Input
          key="email"
          label="Email"
          type="text"
          id="email"
          value={email}
          onChange={onEmailChange}
        />
        <Input
          key="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
          type="submit"
          disabled={email === "" || password === ""}
        >
          Login
        </button>
        <h1 className="text-red-700 text-2xl bg-gray-200">{errorMessage}</h1>
        <Link className="underline" href="/login/signup">
          <button className="bg-green-800 hover:bg-green-500 text-white">
            Create Account
          </button>
        </Link>
      </form>
    </div>
  );
}
