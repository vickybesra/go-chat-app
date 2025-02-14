"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import ChatBody from "../../components/ChatBody";
import { WebsocketContext } from "../../modules/websocket_provider";
import { useRouter } from "next/navigation";
import { API_URL } from "../../constants";
import autosize from "autosize";
import { AuthContext } from "../../modules/auth_provider";
import NavBar from "@/components/NavBar";

export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: "recv" | "self";
};

const chat = () => {
  const [messages, setMessage] = useState<Array<Message>>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { conn } = useContext(WebsocketContext);
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (conn === null) {
      router.push("/");
      return;
    }

    const roomId = conn.url.split("/")[5];
    async function getUsers() {
      try {
        const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    if (textarea.current) {
      autosize(textarea.current);
    }

    if (conn === null) {
      router.push("/");
      return;
    }

    conn.onmessage = (message) => {
      const m: Message = JSON.parse(message.data);
      if (m.content == "A new user has joined the room") {
        setUsers([...users, { username: m.username }]);
      }

      if (m.content == "user left the chat") {
        const deleteUser = users.filter((user) => user.username != m.username);
        setUsers([...deleteUser]);
        setMessage([...messages, m]);
        return;
      }

      user?.username == m.username ? (m.type = "self") : (m.type = "recv");
      setMessage([...messages, m]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};
    conn.onopen = () => {};
  }, [textarea, messages, conn, users]);

  const sendMessage = () => {
    if (!textarea.current?.value) return;
    if (conn === null) {
      router.push("/");
      return;
    }
    conn.send(textarea.current.value);
    textarea.current.value = "";
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center w-full">
        <div className=" md:mx-6 mb-14 w-1/2">
          <ChatBody data={messages} />
        </div>
        <div className="fixed bottom-0 mt-4 w-1/2">
          <div className="flex md:flex-row px-4 py-2 md:mx-4 rounded-md">
            <div className="flex w-full mr-4 rounded-lg border border-blue">
              <textarea
                ref={textarea}
                placeholder="Type your message here"
                className="w-full h-10 p-2 rounded-md focus:outline-none"
                style={{ resize: "none", fontSize: "14px" }}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="flex ">
              <button
                className="px-3 rounded-lg focus:outline-none focus:border-blue border-gray-600 font-bold transition duration-300 border hover:border-gray-600 hover:bg-gray-600 hover:text-white hover:text-white-800"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default chat;
