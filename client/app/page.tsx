"use client";
import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "@/modules/auth_provider";
import { useRouter } from "next/navigation";
import { API_URL, WEBSOCKET_URL } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { WebsocketContext } from "@/modules/websocket_provider";

export default function Home() {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState("");
  const { user } = useContext(AuthContext);
  const { setConn } = useContext(WebsocketContext);

  const router = useRouter();

  const getRooms = async () => {
    try {
      const res = await fetch(`${API_URL}/ws/getRooms`, {
        method: "GET",
      });

      const data = await res.json();
      if (res.ok) {
        setRooms(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setRoomName("");
      const res = await fetch(`${API_URL}/ws/createRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: uuidv4(),
          name: roomName,
        }),
      });

      if (res.ok) {
        getRooms();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const joinRoom = (roomId: string) => {
    const ws = new WebSocket(
      `${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`,
    );
    if (ws.OPEN) {
      setConn(ws);
      router.push("/chat");
      return;
    }
  };

  return (
    <main>
      <NavBar />
      <div className="my-8  md:mx-32 ">
        <div className="flex justify-center mt-3 p-5">
          <input
            type="text"
            className="border border-grey p-2 rounded-md focus:outline-none focus:border-blue"
            placeholder="Enter your Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="ml-2 p-3 rounded-lg focus:outline-none focus:border-blue border-gray-600 font-bold transition duration-300 border hover:border-gray-600 hover:bg-gray-600 hover:text-white hover:text-white-800"
            onClick={submitHandler}
          >
            create room
          </button>
        </div>
        <div className="mt-6">
          <div className="font-bold">Available Rooms</div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="border border-blue p-4 flex items-center rounded-md w-full"
              >
                <div className="w-full">
                  <div className="text-sm">room</div>
                  <div className="text-blue font-bold text-lg">{room.name}</div>
                </div>
                <div className="">
                  <button
                    className="px-3 rounded-lg focus:outline-none focus:border-blue border-gray-600 font-bold transition duration-300 border hover:border-gray-600 hover:bg-gray-600 hover:text-white hover:text-white-800"
                    onClick={() => joinRoom(room.id)}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
