import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { RxSpeakerLoud } from "react-icons/rx";
import Antonym from "./Antonym";
import Example from "./Example";
import MeaningList from "./MeaningList";
import Synonym from "./Synonym";

axios.defaults.baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const ResultList = ({ data, isLoading, isError }) => {
  const audioRef = useRef();

  if (isError) {
    return (
      <h3 className="text-center my-10 font-semibold text-gray-500">
        No Definitions Found 😥
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl">
        <div className="h-6 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-8 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {data && (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[26px] font-bold block mb-2">
              {data[0]?.word}:
              <span className="italic">{data[0]?.phonetics[1]?.text}</span>
            </span>
            <span
              className="text-[16px] mb-2 h-8 w-8 flex items-center place-content-center bg-[#c6dcf8] rounded-full cursor-pointer "
              onClick={() => {
                audioRef.current.play();
              }}
            >
              <audio
                className="hidden"
                src={data[0]?.phonetics[0]?.audio || data[0]?.phonetics[1]?.audio || data[0]?.phonetics[2]?.audio}
                ref={audioRef}
              ></audio>
              <RxSpeakerLoud className="text-[#0c6ff9] font-bold" />
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">Meaning & Definitions:</h3>
          <MeaningList mean={data} />
          <h3 className="text-2xl font-bold mt-4">Example:</h3>
          <Example mean={data} />
          <h3 className="text-2xl font-bold mt-4">Synonym:</h3>
          <Synonym mean={data} />
          <h3 className="text-2xl font-bold mt-4">Antonym:</h3>
          <Antonym mean={data} />
        </div>
      )}
    </div>
  );
};

export default ResultList;
