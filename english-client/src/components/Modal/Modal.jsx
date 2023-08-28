import React from "react";

const Modal = ({ children, isShowModal, width = 'max-w-2xl', responsive = 'w-11/12 md:w-6/12' }) => {
  return (
    <div
      className={`${
        isShowModal ? "flex fadeIn faster" : "hidden fadeOut"
      } main-modal fixed w-full inset-0 z-[10000] overflow-hidden justify-center items-center animated`}
      style={{ background: "rgba(0,0,0,.6)" }}
    >
      <div className={`shadow-lg modal-container max-h-100 bg-white ${responsive} md:${width} mx-auto rounded z-50 overflow-y-auto transition-[max-height] ease-linear duration-1000`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
