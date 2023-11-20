"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import UserSearchBar from "../components/UserSearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type User = {
  id: number;
  email: string;
  accessToken?: string;
  client?: string;
  expiry?: string;
  uid?: string;
};

interface Message {
  id: number;
  receiver: User;
  sender: User;
  body: string;
}

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [messagesArray, setMessagesArray] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>();
  const [messageBody, setMessageBody] = useState("");
  const [conversationPartner, setConversationPartner] = useState<User | null>();
  const [conversationPartnerArray, setConversationPartnerArray] = useState<
    User[]
  >([]);

  useEffect(() => {
    if (isLoaded) {
      if (!sessionStorage.getItem("loggedUser")) {
        alert("You Need to Login to Access that Page!");
        router.push("/login");
      } else {
        setLoggedUser(JSON.parse(sessionStorage.getItem("loggedUser")!));
      }
    }

    setIsLoaded(true);
  }, [isLoaded]);

  useEffect(() => {
    if (messagesArray.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messagesArray.length]);

  useEffect(() => {
    if (conversationPartner) {
      retrieveMessages();

      const interval = setInterval(() => retrieveMessages(), 5000);
      return () => clearInterval(interval);
    }
  }, [conversationPartner]);

  useEffect(() => {
    if (localStorage.getItem("conversations") && loggedUser) {
      setConversationPartnerArray(
        JSON.parse(localStorage.getItem("conversations")!).find(
          (item: { user_id: number }) => item.user_id === loggedUser.id
        ).conversation_partners
      );
    }
  }, [loggedUser]);

  const onMessageBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMessageBody(e.target.value);

  const retrieveMessages = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "access-token": loggedUser?.accessToken ?? "",
        expiry: loggedUser?.expiry ?? "",
        client: loggedUser?.client ?? "",
        uid: loggedUser?.uid ?? "",
      };

      const res = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${
          conversationPartner!.id
        }&receiver_class=User`,
        {
          method: "GET",
          headers,
        }
      );
      const data = await res.json();
      setMessagesArray(
        Array.from(
          data.data
            .filter(Boolean)
            .reduce(
              (
                acc: { set: (arg0: any, arg1: any) => void },
                item: { id: any }
              ) => {
                acc.set(item.id, item);
                return acc;
              },
              new Map()
            )
            .values()
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "access-token": loggedUser?.accessToken ?? "",
      expiry: loggedUser?.expiry ?? "",
      client: loggedUser?.client ?? "",
      uid: loggedUser?.uid ?? "",
    };
    try {
      const res = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${
          conversationPartner!.id
        }&receiver_class=User`,
        {
          method: "POST",
          headers,
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

        const conversationRecordsArray = JSON.parse(
          localStorage.getItem("conversations")!
        );
        const loggedUserIndex = conversationRecordsArray!.findIndex(
          (userObject: { user_id: number }) =>
            userObject.user_id === loggedUser!.id
        );

        // Add the new partner to the array
        conversationRecordsArray[loggedUserIndex].conversation_partners.push({
          id: conversationPartner!.id,
          email: conversationPartner!.email,
        });

        // Use a Set to remove duplicates based on 'id'
        const uniquePartnersSet = new Set(
          conversationRecordsArray[loggedUserIndex].conversation_partners.map(
            (partner: { id: any }) => partner.id
          )
        );

        // Convert the Set back to an array of unique partners
        const uniquePartnersArray = Array.from(uniquePartnersSet).map((id) =>
          conversationRecordsArray[loggedUserIndex].conversation_partners.find(
            (partner: { id: number }) => partner.id === id
          )
        );

        // Update the conversation_partners array with unique partners
        conversationRecordsArray[loggedUserIndex].conversation_partners =
          uniquePartnersArray;

        setConversationPartnerArray(uniquePartnersArray);
        localStorage.setItem(
          "conversations",
          JSON.stringify(conversationRecordsArray)
        );
        retrieveMessages();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <Header hasAuthenticatedUser={true} />
      <div className="flex p-4 bg-white w-full h-screen overflow-hidden">
        <div className="w-1/3 pt-3 bg-white border-r border-slate-100">
          <div className=" h-10 text-slate-300">
            {loggedUser && (
              <UserSearchBar
                setUserObject={setConversationPartner}
                placeHolderText="Enter Email Address to Start or Continue a Conversation . . ."
              />
            )}
          </div>
          <div className="user-list overflow-y-auto h-screen bg-white">
            {conversationPartnerArray.map((item) => (
              <div
                key={item.id}
                className="flex gap-8 items-center hover:bg-slate-100 transition px-5 py-3 hover:cursor-pointer"
                onClick={() => setConversationPartner(item)}
              >
                <div className="flex h-12 w-12 border items-center justify-center border-black rounded-full text-center">
                  {item.email[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-violet-500 tex-md">{item.email}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 mb-4">
          <div className="flex items-center justify-center text-4xl py-4 h-1/10">
            <h3 className="text-gray-400 tex-md pl-4">
              {conversationPartner
                ? conversationPartner.email
                : "Start a Conversation"}
            </h3>
          </div>
          <div className="w-full bg-gray-500 h-4/5 flex flex-col overflow-y-scroll">
            {messagesArray.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col w-1/2  p-1 break-all mb-4 group ${
                  item.sender.id === loggedUser!.id ? "self-end" : ""
                }`}
              >
                <div
                  className={`flex ${
                    item.sender.id === loggedUser!.id ? " flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-14 w-16 border items-center justify-center  rounded-full text-center  ${
                      item.sender.id === loggedUser!.id
                        ? "bg-violet-200"
                        : "bg-violet-400"
                    }`}
                  >
                    <span>{item.sender.uid![0].toUpperCase()}</span>
                  </div>
                  <div
                    className={`w-full rounded-lg p-2 mx-4  ${
                      item.sender.id === loggedUser!.id
                        ? "bg-violet-200"
                        : "bg-violet-400"
                    }`}
                  >
                    {item.body}
                  </div>
                </div>

                <span className="hidden text-gray-200 text-right w-full rounded-lg overflow-none break-normal pr-8 text-xs  group-hover:block">
                  {item.sender.uid}
                </span>
              </div>
            ))}
            <div ref={ref} />
          </div>
          <div className="w-full h-1/10 flex justify-center items-center border pt-1">
            <textarea
              rows={4}
              className="h-full w-4/5 bg-gray-50 border-none focus:outline-none rounded-lg p-2"
              placeholder="type your message here . . ."
              value={messageBody}
              onChange={onMessageBodyChange}
            />
            <button
              className="h-20 mr-1 w-1/5 border border-black rounded-lg disabled:cursor-not-allowed"
              disabled={!conversationPartner || messageBody === ""}
              onClick={sendMessage}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="h-2/3 text-blue-500"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
