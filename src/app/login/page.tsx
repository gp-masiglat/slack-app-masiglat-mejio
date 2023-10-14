"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e: any) => setUsername(e.target.value);
  const onPasswordChange = (e: any) => setPassword(e.target.value);

  async function getData() {
    const body = {
      email: username,
      password: password,
    };
    try {
      const res = await fetch(`http://206.189.91.54/api/v1/auth/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //fetch messages
      // const res = await fetch(
      //   `http://206.189.91.54/api/v1/messages?receiver_id=3919&receiver_class=User`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "access-token": "AqYBR_nLgMH27sIke6M-1w",
      //       expiry: "1698441627",
      //       client: "0Z7wiwfHAvTC30S_aTZrtg",
      //       uid: "gerome.pm@gmail.com",
      //     },
      //   }
      // );

      //fetch all users
      // const res = await fetch(`http://206.189.91.54/api/v1/users`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "access-token": "AqYBR_nLgMH27sIke6M-1w",
      //     expiry: "1698441627",
      //     client: "0Z7wiwfHAvTC30S_aTZrtg",
      //     uid: "gerome.pm@gmail.com",
      //   },
      // });

      //send messages
      // const res = await fetch(`http://206.189.91.54/api/v1/auth/sign_in`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });

      const data = await res.json();
      const uid = res.headers.get("uid");
      const expiry = res.headers.get("expiry");
      const accessToken = res.headers.get("access-token");
      const client = res.headers.get("client");

      console.log(data);
      console.log(uid);
      console.log(expiry);
      console.log(accessToken);
      console.log(client);
    } catch (err) {
      console.log(err);
    }
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();
    getData();

    // console.log(data);
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <form
        className="flex flex-col w-1/2 items-center bg-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
        onSubmit={submitHandler}
      >
        <div className="w-full">
          <label htmlFor="username" className="block text-gray-700 font-bold">
            Username
          </label>
          <input
            id="username"
            title="Username"
            type="text"
            onChange={onUsernameChange}
            value={username}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  text-center font-bold"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-gray-700 font-bold">
            Password
          </label>
          <input
            id="password"
            title="Password"
            type="password"
            onChange={onPasswordChange}
            value={password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  text-center font-bold"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
          type="submit"
          disabled={username === "" || password === ""}
        >
          Login
        </button>
        <h1 className="text-red-700 text-2xl bg-gray-200">{errorMessage}</h1>
        <Link className="underline" href="/login/signup">
          Create Account
        </Link>
      </form>
    </div>
  );
}
