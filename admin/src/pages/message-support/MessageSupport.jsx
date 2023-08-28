import React, { useEffect, useState } from "react";
import { IoMdSend, IoIosAttach } from "react-icons/io";
import { BiSmile, BiCamera, BiMicrophone } from "react-icons/bi";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../contexts/authProvider";
import { pusherClient, pusherServer } from "../../socket.io/pusher";
import ListChat from "./ListChat";
import Chat from "./Chat";

const MessageSupport = () => {
  const [valueMessage, setValueMessage] = useState("");
  const [chatData, setChatData] = useState({
    listChat: [],
    idChat: null,
    chatData: [],
    userChatting: null,
  });
  const auth = useAuth();

  useEffect(() => {
    const unSubscribe = db.collection(`chat-group`).onSnapshot((snapshot) => {
      setChatData({
        ...chatData,
        listChat: snapshot.docs.map((doc) => doc.data()),
        idChat: `user-${snapshot.docs.map((doc) => doc.data())[0]?.id}`,
        userChatting: snapshot.docs.map((doc) => doc.data())[0],
      });
    });
    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    pusherClient.subscribe(`chat_to_admin`);
    const handlerReceiveMessage = () => {
      console.log("Receive from user");
    };
    pusherClient.bind(`chat`, handlerReceiveMessage);

    return () => {
      pusherClient.unsubscribe(`chat_to_admin`);
      pusherClient.unbind(`chat`, handlerReceiveMessage);
    };
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    // await pusherServer.trigger(
    //   `chat_user_${chatData?.idChat?.split("-")[1]}`,
    //   "chat_user",
    //   {
    //     senderId: auth?.user?.id,
    //     message: valueMessage,  
    //   }
    // );

    await db
      .collection(`chat-group`)
      .doc(chatData.idChat)
      .collection("chat")
      .add({
        message: valueMessage,
        senderId: auth?.user?.id,
        receiverId: parseInt(chatData?.idChat?.split("-")[1]),
        timestamp: Date.now(),
      });
    setValueMessage("");
  };

  return (
    <div className="flex flex-col xl:flex-row gap-2 xl:gap-0 my-20 mx-10 rounded-md overflow-hidden">
      <ListChat chatData={chatData} setChatData={setChatData} />
      <div className="w-full xl:w-8/12 border-2 h-full border-[#ccc]">
        <div className="flex justify-between items-center p-5 mb-2 border-b-2 border-[#ccc]">
          <div className="flex items-center gap-2">
            <div className="h-10">
              <img
                className="h-full rounded-full object-cover"
                src={
                  chatData.userChatting?.image ||
                  "https://th.bing.com/th/id/R.c249dd5e1b1b32255065fe1202bcf887?rik=IL7DvxY%2bSiDyUg&pid=ImgRaw&r=0"
                }
                alt=""
              />
            </div>
            <h3 className="text-md text-[26px] text-black">
              {chatData.userChatting?.name}
            </h3>
          </div>
        </div>
        <Chat chatData={chatData} setChatData={setChatData} />
        {chatData.listChat.length > 0 && (
          <div className="border-t-2 border-gray-200 px-4 py-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <BiMicrophone size={26} />
                </button>
              </span>
              <input
                type="text"
                placeholder="Viết tin nhắn"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                value={valueMessage}
                onChange={(e) => setValueMessage(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handlePost(e) : null)}
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <IoIosAttach size={24} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <BiCamera size={26} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <BiSmile size={26} />
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  disabled={valueMessage.trim() === ""}
                  onClick={handlePost}
                >
                  <span className="font-bold mr-1">Gửi</span>
                  <IoMdSend size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSupport;
