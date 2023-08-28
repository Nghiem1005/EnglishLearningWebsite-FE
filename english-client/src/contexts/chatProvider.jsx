import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./authProvider";
import { pusherServer } from "../socket.io/pusher";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [chatData, setChatData] = useState([null]);
  const auth = useAuth();

  useEffect(() => {
    const unSubscribe = db
      .collection(`chat-group`)
      .doc(`user-${auth?.user?.id}`)
      .collection("chat")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setChatData(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      unSubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const removeDB = async () => {
  //     await db
  //       .collection("chat-group")
  //       .doc(`user-${auth?.user?.id}`)
  //       .collection("chat")
  //       .doc()
  //       .delete();
  //     await db.collection("chat-group").doc(`user-${auth?.user?.id}`).delete();
  //   };
  //   window.addEventListener("beforeunload", removeDB);
  //   return () => window.removeEventListener("beforeunload", removeDB);
  // }, []);

  const handlePost = async ({ senderId, message }) => {
    // await pusherServer.trigger(`chat_to_admin`, 'chat', {
    //   senderId,
    //   message
    // })

    await db
      .collection(`chat-group`)
      .doc(`user-${senderId}`)
      .set({
        ...auth?.user,
      });

    await db
      .collection(`chat-group`)
      .doc(`user-${senderId}`)
      .collection("chat")
      .add({
        message: message,
        senderId: senderId,
        receiverId: 1,
        timestamp: Date.now(),
      });
  };

  return (
    <ChatContext.Provider
      value={{
        handlePost,
        chatData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
