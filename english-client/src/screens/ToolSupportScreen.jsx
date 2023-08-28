import React, { useRef, useState } from "react";
import { RiMessengerFill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import ChatScreen from "./chat/ChatScreen";
import DictionaryScreen from "./dictionary/DictionaryScreen";

const ToolSupportScreen = () => {
  const [isShowChatBox, setIsShowChatBox] = useState(false);
  const [isShowDictionary, setIsShowDictionary] = useState(false);
  const phoneRef = useRef();
  const groupMessageRef = useRef();

  return (
    <>
      <div className="px-3 py-2 bg-white fixed top-[40%] right-0 rounded-tl-md rounded-bl-md">
        <div
          className="flex flex-col w-7 border-b-[1px] pb-2 cursor-pointer"
          onClick={() => setIsShowDictionary(true)}
        >
          <abbr
            data-title="Từ điển"
            className="flex flex-col justify-center items-center no-underline w-5 mx-auto"
          >
            <img
              className="w-full"
              src="https://cdn-icons-png.flaticon.com/512/5027/5027435.png"
              alt=""
            />
          </abbr>
          <span className="text-[9px] w-full font-thin tracking-tighter inline-block text-[#677788] mt-1 whitespace-nowrap">
            Từ điển
          </span>
        </div>
        <div
          className="w-7 border-b-[1px] py-2 cursor-pointer"
          onClick={() => groupMessageRef.current.click()}
        >
          <abbr
            data-title="Nhóm Fb học tập"
            className="flex flex-col justify-center items-center no-underline"
          >
            <RiMessengerFill className="text-[#007aff]" size={20} />
            <a
              className="hidden"
              href="https://m.me/cm/AbYPxxjN-FNXcrt7/"
              target="blank"
              ref={groupMessageRef}
            ></a>
          </abbr>
        </div>
        <div
          className="w-7 py-2 cursor-pointer"
          onClick={() => phoneRef.current.click()}
        >
          <abbr
            data-title="Liên hệ trung tâm"
            className="flex flex-col justify-center items-center no-underline"
          >
            <FiPhone size={20} />
          </abbr>
          <a className="hidden" href="tel:+84364795151" ref={phoneRef}></a>
        </div>
      </div>
      <ChatScreen
        isShowChatBox={isShowChatBox}
        setIsShowChatBox={setIsShowChatBox}
        data={{}}
      />
      {isShowDictionary && (
        <DictionaryScreen
          isShowModal={isShowDictionary}
          setIsShowModal={setIsShowDictionary}
        />
      )}
    </>
  );
};

export default ToolSupportScreen;
