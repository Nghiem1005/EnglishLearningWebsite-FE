import React from "react";

const ButtonSuccess = ({ content, type, bgColor = 'green', handleSubmit = () => {} }) => {
  return (
    <button
      type={type}
      className={`inline-block px-6 py-2.5 bg-[#277949] text-white 
      font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#1f5e39] 
      hover:shadow-lg focus:bg-[#1f5e39]/90 focus:shadow-lg focus:outline-none focus:ring-0 
      active:bg-[#1f5e39] active:shadow-lg transition duration-150 ease-in-out`}
      onClick={handleSubmit}
    >
      {content}
    </button>
  );
};

export default ButtonSuccess;
