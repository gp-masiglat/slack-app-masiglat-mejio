"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { json } from "stream/consumers";

export default function Page() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailChange = (e: any) => setEmail(e.target.value);
  const onPasswordChange = (e: any) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e: any) =>
    setConfirmPassword(e.target.value);

  async function createUser() {
    const body = {
      email,
      password,
      confirmPassword,
    };
    try {
      const res = await fetch(`http://206.189.91.54/api/v1/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.status === "error")
        setErrorMessage(data.errors.full_messages.join("\n"));
      else router.push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorMessage(
        "Please follow the following format (example@example.com"
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password does not match!");
      setConfirmPassword("");
      return;
    }

    createUser();

    // console.log(data);
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <form
        className="flex flex-col w-1/2 items-center bg-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
        onSubmit={submitHandler}
      >
        <Input
          key="email"
          label="Email Address"
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
        <Input
          key="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
          type="submit"
          disabled={email === "" || password === "" || confirmPassword === ""}
        >
          Signup
        </button>
        <button className="underline" onClick={() => router.back()}>
          Back to Login
        </button>
        <strong className="font-bold whitespace-pre-line">
          {errorMessage}
        </strong>
      </form>
    </div>
  );
}
