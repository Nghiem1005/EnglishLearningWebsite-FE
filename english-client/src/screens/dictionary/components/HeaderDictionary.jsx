import React from "react";

const HeaderDictionary = ({ value, setValue, setIsShowModal, refetch }) => {
  const handleInputChange = (e) => setValue(e.target.value);

  const handleSubmit = () => {
    refetch();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      refetch();
    }
  };

  return (
    <div className="bg-[#1eb2a6] relative">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-white">
          E-Academy Dictionary
        </h1>
        <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
          Find definisions for word
        </p>

        <div className="flex items-center justify-center mt-5">
          <div className="flex border-2 border-gray-200 rounded">
            <input
              className="px-4 py-2 md:w-80"
              type="text"
              placeholder="Search..."
              onChange={handleInputChange}
              value={value}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="bg-blue-400 border-l px-4 py-2 text-white"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>

        {value && (
          <h3 className="text-gray-50 text-center mt-4">
            Result for: <span className="text-white font-bold">{value}</span>
          </h3>
        )}
      </div>
      <div
        className="absolute right-3 top-3 p-2 px-4 font-bold border-black border-[2px] rounded-lg bg-white text-gray-600 cursor-pointer"
        onClick={() => setIsShowModal(false)}
      >
        Close
      </div>
    </div>
  );
};

export default HeaderDictionary;
