import React, { useEffect, useRef, useState } from "react";
import { RxDoubleArrowLeft, RxSpeakerLoud, RxLoop } from "react-icons/rx";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { thunkWordTypes } from "../../../constants/thunkTypes";
import { flashcardService } from "../../../services/flashcard";
import { dictionaryService } from "../../../services/dictionary";

const LearningWord = () => {
  const [toggleFaceWord, setToggleFaceWord] = useState(false);
  const [dataLearnWord, setDataLearnWord] = useState({
    dataIncomingLearn: [],
    dataLearned: [],
    dataLearning: null,
    numberWordLearning: 0,
    numberTotalWord: 0,
    indexWordLearning: null,
  });
  const audioRef = useRef();
  const { flashcardId } = useParams();
  const { data, isLoading, isError } = useQueryCustom(
    thunkWordTypes.GETALL_WORD,
    () => flashcardService.getFlashcard({ size: 1000, page: 1, flashcardId })
  );

  useEffect(() => {
    if (data) {
      const index = Math.floor(
        Math.random() * data?.data?.data?.wordResponseDTOS?.length
      );
      const dataLearning = data?.data?.data?.wordResponseDTOS[index];
      setDataLearnWord({
        ...dataLearnWord,
        indexWordLearning: index,
        dataIncomingLearn: data?.data?.data?.wordResponseDTOS,
        dataLearning: dataLearning,
        numberTotalWord: data?.data?.data?.wordResponseDTOS?.length,
        numberWordLearning: dataLearnWord.numberWordLearning + 1,
      });
    }
  }, [data]);

  const handlePrevLearned = () => {
    const dataLearning = dataLearnWord.dataLearned.pop();
    dataLearnWord.dataIncomingLearn.push(dataLearning);
    setDataLearnWord({
      ...dataLearnWord,
      dataLearning: dataLearning,
      numberWordLearning: dataLearnWord.numberWordLearning - 1,
    });
    setToggleFaceWord(false);
  };

  const handleNextLearn = () => {
    if (dataLearnWord.indexWordLearning !== null) {
      dataLearnWord.dataLearned.push(
        dataLearnWord.dataIncomingLearn[dataLearnWord.indexWordLearning]
      );
      dataLearnWord.dataIncomingLearn.splice(
        dataLearnWord.indexWordLearning,
        1
      );
      const index = Math.floor(
        Math.random() * dataLearnWord.dataIncomingLearn.length
      );
      const dataLearning = dataLearnWord.dataIncomingLearn[index];
      setDataLearnWord({
        ...dataLearnWord,
        dataLearning,
        indexWordLearning: index,
        numberWordLearning: dataLearnWord.numberWordLearning + 1,
      });
      setToggleFaceWord(false);
    }
  };

  console.log(dataLearnWord.dataLearned);
  console.log(dataLearnWord.dataIncomingLearn);
  if (isLoading || isError) return;

  return (
    <div className="gap-y-6 max-w-[28rem] md:max-w-[38rem] lg:max-w-[40rem] xl:max-w-[55rem] 2xl:max-w-[60rem] mx-auto mb-40">
      <div className="mt-16">
        <h1 className="text-[36px] font-bold">Luyện tập: Academy</h1>
        <Link
          className="mt-10 block text-[17px] text-[#35509a]"
          to={`/flashcard/list/1`}
        >
          <RxDoubleArrowLeft className="inline-block align-[-2px] mr-1" />
          Xem tất cả
        </Link>
        <div className="bg-[#ffefd8] border-[#ffe8c8] border-[1px] text-[#855a1f] p-10 rounded-md mt-2">
          Chú ý: Cick vào vùng chứa từ vựng để xem được chi tiết(định nghĩa, ghi
          chú, ví dụ, hình ảnh) nếu có.
        </div>
        <div className="bg-[#fff] border-[#e0e0e0] border-[1px] min-h-[300px] shadow-[4px_6px_0_0_#c4c4c4] text-[#855a1f] p-1 rounded-md mt-6 relative">
          <div
            className={`h-[280px] w-full flex justify-center items-center flex-col px-8 cursor-pointer ${
              !toggleFaceWord ? "flappable" : "no-flappable"
            }`}
          >
            {/* Front */}
            <div className="flashcard-front">
              <div className="flex items-center gap-2">
                <span className="text-[26px] font-bold block mb-2">
                  {dataLearnWord.dataLearning?.content} (
                  {dataLearnWord.dataLearning?.type})
                </span>
                <span
                  className="text-[16px] mb-2 h-8 w-8 flex items-center place-content-center bg-[#c6dcf8] hover:bg-[#a9caf6] rounded-full cursor-pointer"
                  onClick={async () => {
                    const res = await dictionaryService.getDictionaryByWord({
                      word: dataLearnWord.dataLearning?.content,
                      option: {},
                    });
                    if (res) {
                      audioRef.current.src =
                        res[0]?.phonetics[0]?.audio ||
                        res[0]?.phonetics[1]?.audio ||
                        res[0]?.phonetics[2]?.audio;
                      audioRef.current.play();
                    }
                  }}
                >
                  <audio className="hidden" ref={audioRef}></audio>
                  <RxSpeakerLoud className="text-[#0c6ff9] font-bold" />
                </span>
              </div>
            </div>

            {/* Backside */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center flashcard-back">
              <div className="lg:flex-1 lg:block flex md:gap-3 md:justify-evenly flex-col lg:flex-row sm:gap-3 sm:justify-evenly">
                <span className="text-[18px] block mb-2 font-bold">
                  Phiên âm: <br />
                  <span className="text-[16px] font-normal">
                    {dataLearnWord?.dataLearning?.spelling}
                  </span>
                </span>
                <span className="text-[18px] block mb-2 font-bold">
                  Định nghĩa: <br />
                  <span className="text-[16px] font-normal">
                    {dataLearnWord?.dataLearning?.define}
                  </span>
                </span>
                <span className="text-[18px] block mb-2 font-bold">
                  Ví dụ: <br />
                  <span className="text-[16px] font-normal">
                    {dataLearnWord?.dataLearning?.example}
                  </span>
                </span>
              </div>
              {dataLearnWord.dataLearning?.images && (
                <div className="lg:flex-1">
                  <img
                    className="object-fill w-70% h-[200px] md:w-[24rem]"
                    src={dataLearnWord.dataLearning?.images}
                    alt="banner"
                  />
                </div>
              )}
            </div>
          </div>
          {dataLearnWord.numberWordLearning > 1 && (
            <div
              className="absolute top-[42%] left-6 p-4 rounded-full bg-black/10 cursor-pointer"
              onClick={handlePrevLearned}
            >
              <AiFillCaretLeft size={28} />
            </div>
          )}
          {dataLearnWord.numberWordLearning < dataLearnWord.numberTotalWord && (
            <div
              className="absolute top-[42%] right-6 p-4 rounded-full bg-black/10 cursor-pointer"
              onClick={handleNextLearn}
            >
              <AiFillCaretRight size={28} />
            </div>
          )}
          <div className="absolute bottom-3 right-6 p-4 flex items-center gap-x-10">
            <div>
              Đã học {dataLearnWord.numberWordLearning}/
              {dataLearnWord.numberTotalWord} từ vựng
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setToggleFaceWord((prevState) => !prevState)}
            >
              <RxLoop size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningWord;
