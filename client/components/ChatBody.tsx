import React from "react";
import { Message } from "../app/chat/page";

const ChatBody = ({ data }: { data: Array<Message> }) => {
  return (
    <>
      {data.map((message: Message, index: number) => {
        if (message.type == "self") {
          return (
            <div
              className="flex flex-col mt-2 text-right justify-end"
              key={index}
            >
              <div className="text-sm rounded-lg  justify-end">
                <span className="p-1 font-semibold bg-zinc-300 rounded-lg">
                  {message.username}
                </span>
              </div>
              <div>
                <div className="py-1 mb-2 inline-block mt-1">
                  {message.content}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="mt-2 flex flex-col text-left justify-end"
              key={index}
            >
              <div className="text-sm ">
                <span className="p-1  bg-zinc-400 rounded-lg font-semibold">
                  {message.username}
                </span>
              </div>
              <div>
                <div className="px-4 py-1 rounded-md inline-block mt-1">
                  {message.content}
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default ChatBody;
