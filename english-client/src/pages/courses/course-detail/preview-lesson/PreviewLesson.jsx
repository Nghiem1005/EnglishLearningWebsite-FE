import React from "react";
import "./PreviewLesson.css";

const PreviewLesson = ({ isShowModal, setIsShowModal, data }) => {
  return (
    <div
      className={`${
        isShowModal ? "flex fadeIn faster" : "hidden fadeOut"
      } main-modal fixed w-full h-100 inset-0 z-[10000] overflow-hidden justify-center items-center animated`}
      style={{ background: "rgba(0,0,0,.6)" }}
    >
      <div className=" shadow-lg modal-container bg-white w-11/12 md:max-w-3xl mx-auto rounded z-50 overflow-y-auto">
        {isShowModal ? (
          <div
            className="modal-close cursor-pointer z-50"
            onClick={() => setIsShowModal(false)}
          >
            <div className="relative">
              <video
                className="VideoInput_video"
                width="100%"
                // height={00}
                controls
                src={data?.document}
              />
              <div
                className="absolute top-[10px] right-[20px] cursor-pointer p-1 bg-black/10 rounded-full"
                onClick={() => {
                  setIsShowModal(false);
                }}
              >
                <svg
                  className="fill-current text-[#375a17]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PreviewLesson;
