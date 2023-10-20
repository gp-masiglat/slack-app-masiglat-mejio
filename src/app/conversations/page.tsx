"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import UserSearchBar from "../components/UserSearchBar";
import { stringify } from "querystring";

type User = {
  id: string;
  email: string;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: null | string;
  nickname: null | string;
  image: null | string;
};

export default function Page() {
  const router = useRouter();
  const [messagesArray, setMessagesArray] = useState<any[]>([]);
  const [conversationPartner, setConversationPartner] = useState<User>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>();
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    if (isLoaded) {
      if (!sessionStorage.getItem("loggedUser")) {
        alert("You Need to Login to Access that Page!");
        router.push("/login");
      } else setLoggedUser(JSON.parse(sessionStorage.getItem("loggedUser")!));
    }

    setIsLoaded(true);
  }, [isLoaded]);

  useEffect(() => {
    if (conversationPartner) retrieveMessages();
  }, [conversationPartner]);

  const onMessageBodyChange = (e: any) => setMessageBody(e.target.value);

  const retrieveMessages = async () => {
    try {
      const res = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${
          conversationPartner!.id
        }&receiver_class=User`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": loggedUser.accessToken,
            expiry: loggedUser.expiry,
            client: loggedUser.client,
            uid: loggedUser.uid,
          },
        }
      );
      const data = await res.json();
      setMessagesArray([
        ...new Map(
          data.data.filter(Boolean).map((item: any) => [item["id"], item])
        ).values(),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${
          conversationPartner!.id
        }&receiver_class=User`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": loggedUser.accessToken,
            expiry: loggedUser.expiry,
            client: loggedUser.client,
            uid: loggedUser.uid,
          },
          body: JSON.stringify({
            receiver_id: conversationPartner!.id,
            receiver_class: "User",
            body: messageBody,
          }),
        }
      );
      const data = await res.json();

      if (!data.hasOwnProperty("errors")) {
        setMessageBody("");

        retrieveMessages();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <Header hasAuthenticatedUser={true} />
      <div className="flex w-full h-full mb-2 mx-4">
        <div className="w-1/3 h-full flex flex-col border border-black">
          <div className="text-center text-4xl py-4 border-b-4 border-black">
            Messages
          </div>
          <div className="h-full p-4 flex flex-col items-center justify-center">
            <UserSearchBar setUserObject={setConversationPartner} />
          </div>
        </div>
        <div className="w-2/3 h-full flex flex-col border border-black">
          <div className="text-center text-4xl py-4 border-b-4 border-black h-1/10">
            {conversationPartner
              ? conversationPartner.email
              : "Start a Conversation"}
          </div>
          <div className="w-full h-4/5 flex flex-col overflow-scroll p-2">
            {messagesArray.map((item) => (
              <div
                key={item.id}
                className={`w-1/2 border border-black p-1 break-all rounded-lg mb-4 ${
                  item.receiver.id === conversationPartner!.id ? "self-end" : ""
                }`}
              >
                {item.body}
              </div>
            ))}
          </div>
          <div className="w-full h-1/10 flex border border-black pt-1">
            <textarea
              rows={4}
              className="h-full w-4/5 bg-gray-50 border-none focus:outline-none rounded-lg p-2"
              placeholder="type your message here . . ."
              value={messageBody}
              onChange={onMessageBodyChange}
            />
            <button
              className="h-full w-1/5 border border-black rounded-lg disabled:cursor-not-allowed"
              disabled={!conversationPartner || messageBody === ""}
              onClick={sendMessage}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
