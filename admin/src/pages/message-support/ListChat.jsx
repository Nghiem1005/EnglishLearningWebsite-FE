import React from "react";
import { Link } from "react-router-dom";

const ListChat = ({ setChatData, chatData }) => {
  return (
    <div className="w-full xl:w-4/12 pt-4 bg-white border-2 xl:border-r-0 border-[#a7a5a54d]">
      <h1 className="text-center text-[32px] font-bold pb-4 border-b-2 border-[#a7a5a54d]">
        Danh sách trò chuyện
      </h1>
      <ul className="overflow-y-auto">
        {chatData.listChat.map((chatItem) => (
          <Link
            to={`/message-support/${chatItem?.id}`}
            onClick={() =>
              setChatData({ ...chatData, idChat: `user-${chatItem?.id}`, userChatting: chatItem })
            }
            key={chatItem?.id}
          >
            <li
              className={`flex items-center px-4 py-4 gap-2 cursor-pointer hover:bg-[#eae8e8] ${
                chatItem?.id === parseInt(chatData.idChat.split("-")[1])
                  ? "bg-[#eae8e8]"
                  : null
              }`}
            >
              <div className="h-10">
                <img
                  className="h-full rounded-full object-cover"
                  src={
                    chatItem?.image ||
                    "https://th.bing.com/th/id/R.c249dd5e1b1b32255065fe1202bcf887?rik=IL7DvxY%2bSiDyUg&pid=ImgRaw&r=0"
                  }
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-md text-[16px] xl:text-[20px] text-black">
                  {chatItem?.name}
                </h3>
                <span className="text-md text-[12px] xl:text-[16px] text-[#999]">
                  {chatItem?.email}
                </span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ListChat;
