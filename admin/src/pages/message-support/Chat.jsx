import React, { useRef, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../contexts/authProvider";
import moment from "moment";

const Chat = ({ chatData, setChatData }) => {
  const listRef = useRef();
  const auth = useAuth();

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chatData.chatData]);

  useEffect(() => {
    const unSubscribe = chatData.idChat
      ? db
          .collection("chat-group")
          .doc(chatData?.idChat)
          .collection("chat")
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) => {
            setChatData({
              ...chatData,
              chatData: snapshot.docs.map((doc) => doc.data()),
            });
          })
      : () => {};
    return () => {
      unSubscribe();
    };
  }, [chatData.idChat]);

  return (
    <ul
      className="overflow-y-auto h-[350px] xl:h-[420px] p-[30px_20px]"
      ref={listRef}
    >
      {chatData?.chatData?.map((chatItem, index) =>
        chatItem?.senderId === auth?.user?.id ? (
          <li
            className="list-none my-2 flex items-end justify-end gap-3 mb-2"
            key={index}
          >
            <div>
              <span className="flex gap-x-2 justify-end items-end">
                <p className="whitespace-pre-wrap py-2 px-2 rounded-[10px_10px_0_10px] max-w-[75%] text-black text-[.95rem] bg-[#ececeb]">
                  {chatItem?.message}
                </p>
                <img
                  className="w-8 h-8 rounded-full cursor-default object-fill"
                  src={
                    auth?.user?.image ||
                    "https://demoda.vn/wp-content/uploads/2022/01/anh-dai-dien-nguoi-giau-mat.jpg"
                  }
                />
              </span>
              <span className={` float-right pr-10 text-[14px] text-[#afaeae]`}>
                {moment(chatItem?.timestamp).format('HH:MM')}
              </span>
            </div>
          </li>
        ) : (
          <li className="incoming list-none mb-2" key={index}>
            <span className="flex gap-x-2 items-end">
              <img
                className="w-8 h-8 rounded-full cursor-default object-fill"
                src="https://demoda.vn/wp-content/uploads/2022/01/anh-dai-dien-nguoi-giau-mat.jpg"
              />
              <p className="whitespace-pre-wrap py-2 px-2 rounded-[10px_10px_10px_0] max-w-[70%] text-white text-[.95rem] bg-[#1eb2a6] ">
                {chatItem?.message}
              </p>
            </span>
            <span className={`text-[14px] text-[#afaeae] pl-10`}>
              {moment(chatItem?.timestamp).format('HH:MM')}
            </span>
          </li>
        )
      )}
    </ul>
  );
};

export default Chat;
