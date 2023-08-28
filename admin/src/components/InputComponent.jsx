import React from "react";

const InputComponent = ({ props, type = "text", placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
        transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
        focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
        focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300"
      {...props}
    />
  );
};

export default InputComponent;
