import React from "react";

const ButtonSuccess = ({ content, type, bgColor = 'green', onClick = () => {} }) => {
  return (
    <button
      type={type}
      className={`inline-block px-6 py-2.5 bg-cyan-500 text-white 
      font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-${bgColor}-600 
      hover:shadow-lg focus:bg-${bgColor}-600 focus:shadow-lg focus:outline-none focus:ring-0 
      active:bg-${bgColor}-700 active:shadow-lg transition duration-150 ease-in-out`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default ButtonSuccess;
