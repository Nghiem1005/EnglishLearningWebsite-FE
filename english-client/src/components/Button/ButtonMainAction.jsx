import React from "react";

const ButtonMainAction = ({ content }) => {
  return (
    <button
      type="button"
      className="inline-block h-[max-content] px-6 py-2.5 bg-[#1eb2a6] text-white font-medium text-xs 
      leading-tight uppercase rounded shadow-md hover:bg-[#1eb2a6] hover:shadow-lg 
      focus:bg-[#1eb2a6] focus:shadow-lg focus:outline-none focus:ring-0 
      active:bg-[#1eb2a6] active:shadow-lg transition duration-150 ease-in-out"
    >
      {content}
    </button>
  );
};

export default ButtonMainAction;
