import React from "react";
import { useRef } from "react";
import "./DeleteCourse.css";

const DeleteLesson = ({ isShowModal, setIsShowModal }) => {
  const ref = useRef();

  const loginWithGoogle = async () => {
    ref.current.href = "http://localhost:8080/login/google?view=COURSE&redirectView=http://localhost:8080/calendar";
    ref.current.click();
  };

  return (
    <div
      className={`${
        isShowModal ? "flex fadeIn faster" : "hidden fadeOut"
      } main-modal fixed w-full h-100 inset-0 z-[10000] overflow-hidden justify-center items-center animated`}
      style={{ background: "rgba(0,0,0,.6)" }}
    >
      <div className=" shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
        <div className="modal-content py-6 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <div>
              <p className="text-2xl font-bold">Đăng nhập Google</p>
              <p className="text-sm">
                Vì course liên quan đến xác thực email nên bạn cần phải đăng
                nhập.
              </p>
            </div>
            <div
              className="modal-close cursor-pointer z-50"
              onClick={() => setIsShowModal(false)}
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <div
            className="flex items-center py-2 gap-x-2 justify-center px-2 border-2 
        border-gray-300 rounded-2xl transition duration-300 
          hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer"
            onClick={loginWithGoogle}
          >
            <img
              src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
              className="w-5 h-5"
              alt="google logo"
            />
            <span className="block font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
              Continue with Google
            </span>
          </div>
        </div>
      </div>
      <a className="hidden" ref={ref} hidden></a>
    </div>
  );
};

export default DeleteLesson;
