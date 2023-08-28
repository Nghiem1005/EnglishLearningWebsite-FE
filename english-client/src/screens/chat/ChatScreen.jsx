import React, { useEffect, useRef, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { useAuth } from "../../contexts/authProvider";
import { useChatContext } from "../../contexts/chatProvider";
import moment from "moment";
import { pusherClient } from "../../socket.io/pusher";

const ChatScreen = ({ isShowChatBox, setIsShowChatBox }) => {
  const [valueMessage, setValueMessage] = useState("");
  const listRef = useRef();
  const auth = useAuth();
  const chatContext = useChatContext();

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chatContext?.chatData]);

  useEffect(() => {
     const a = pusherClient.subscribe(`chat_user_${auth?.user?.id}`);
    const handlerReceiveMessage = (data) => {
      console.log('Receive message from admin:', data);
    };
    a.bind(`chat_user`, handlerReceiveMessage);

    return () => {
      pusherClient.unsubscribe(`chat_user_${auth?.user?.id}`);
      pusherClient.unbind(`chat_user`, handlerReceiveMessage);
    };
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    chatContext.handlePost({
      senderId: auth?.user?.id,
      message: valueMessage.trim(),
    });
    setValueMessage("");
  };

  return (
    <>
      <div
        className={`fixed right-6 bottom-8 w-14 h-14 flex cursor-pointer justify-center items-center rounded-full bg-[#1eb2a6] transition-all duration-200 ease-in text-white animate-ping ${
          isShowChatBox ? "show" : "hidden-btn"
        }`}
        onClick={() => setIsShowChatBox((prevState) => !prevState)}
      >
        <abbr className="show-chatbox-btn" data-title="Trung tâm hỗ trợ">
          <FiMessageSquare size={24} />
        </abbr>
        <MdClose className="close-chatbox-btn" size={24} />
      </div>
      <div
        className={`chatbox fixed right-7 bottom-24 w-[410px] bg-white overflow-hidden opacity-0 pointer-events-none scale-50 origin-bottom-right drop-shadow-shadowThin transition-all duration-100 ease-in rounded-xl ${
          isShowChatBox ? "show-chatbox" : ""
        }`}
      >
        <header className="px-4 py-3 relative text-center text-[1.4rem] text-white bg-[#1eb2a6] shadow-[0_2px_10px_rgba(0,0,0,.1)] ">
          <h2>Hỗ trợ khách hàng</h2>
          <div onClick={() => setIsShowChatBox(false)}>
            <MdClose
              className="absolute right-6 top-[50%] cursor-pointer translate-y-[-50%]"
              size={24}
            />
          </div>
        </header>
        <ul className="overflow-y-auto h-[400px] p-[0_20px]" ref={listRef}>
          {chatContext?.chatData?.length === 0 && (
            <div className="w-[80%] m-auto mt-2 flex flex-col justify-center items-center gap-2">
              <img
                className="h-36 w-36 rounded-t-full object-cover"
                src="https://www.guertech.com/wp-content/uploads/2017/05/final-soutien-technique.png  "
                alt=""
              />
              <span className="text-[20px] text-[#255e82]">
                Trung tâm hỗ trợ khách hàng
              </span>
              <span className="text-[12px]">
                Chúng tôi có thể giúp gì được cho bạn?
              </span>
            </div>
          )}
          {chatContext?.chatData?.map((chatItem) => (
            <li
              className={
                chatItem?.senderId === auth?.user?.id
                  ? "list-none my-2 flex justify-end"
                  : "incoming flex list-none items-start gap-3"
              }
              key={JSON.stringify(chatItem)}
            >
              {chatItem?.senderId !== auth?.user?.id && (
                <img
                  className="w-8 h-8 rounded-full cursor-default object-fill"
                  src="https://demoda.vn/wp-content/uploads/2022/01/anh-dai-dien-nguoi-giau-mat.jpg"
                />
              )}
              <span
                className={
                  chatItem?.senderId === auth?.user?.id
                    ? "max-w-[75%]"
                    : "max-w-[70%]" + " block"
                }
              >
                <p
                  className={`break-words py-1 px-2 text-[.95rem] ${
                    chatItem?.senderId === auth?.user?.id
                      ? "bg-[#ececeb] rounded-[10px_10px_0_10px] text-black"
                      : "bg-[#1eb2a6] rounded-[10px_10px_10px_0] text-white"
                  }`}
                >
                  {chatItem?.message}
                </p>
                <span
                  className={`text-[14px] text-[#afaeae] ${
                    chatItem?.senderId === auth?.user?.id ? "float-right" : null
                  }`}
                >
                  {moment(chatItem?.timestamp).format("HH:MM")}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 h-16 bottom-0 w-full bg-white py-1 px-5 border-t-[1px] border-[#ddd]">
          <textarea
            className="inputchat h-full w-full border-none outline-none resize-none max-h-[180px] p-4 pl-0 text-[.95rem] chat-input"
            placeholder="Bạn cần hỗ trợ gì..."
            typeof="text"
            value={valueMessage}
            onChange={(e) => setValueMessage(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handlePost(e) : null)}
          />
          <button
            type="submit"
            className={`text-[#724ae8] cursor-pointer justify-center items-center inputchat-valid:flex inputchat-valid:visible visible hover:opacity-70 ${
              valueMessage.trim() ? "flex" : "hidden"
            }`}
            onClick={handlePost}
          >
            <TbSend size={26} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
