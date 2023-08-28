import React, { useEffect, useRef, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { FcIdea } from "react-icons/fc";
import {
  AiOutlineCheckCircle,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineMinus,
} from "react-icons/ai";
import { GiTargetShot, GiSandsOfTime } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import ModalDetailAnswer from "./ModalDetailAnswer";
import { useQueryCustom } from "../../../hooks";
import { thunkPracticeTypes } from "../../../constants/thunkTypes";
import { practiceService } from "../../../services/practice";
import { formatAnswer, formatTime } from "../../../constants/defaultData";

const StatisticTest = () => {
  const [isShowModal, setIsShowModal] = useState({
    isShowModal: false,
    data: null,
  });
  const { testId } = useParams();
  const answerContainerRef = useRef();
  const { data, isLoading, isError, refetch } = useQueryCustom(
    thunkPracticeTypes.GET_PRACTICE_SCORE,
    () => practiceService.getDetailHistoryPracticeByUser({ testId })
  );

  useEffect(() => {
    refetch()
  }, [testId])
  
  if (isLoading || isError) return;
  return (
    <section className="">
      <div className="text-[40px] font-bold bg-[#aee1f9] bg-gradient-to-br from-[#aee1f9] to-[#f6ebe6]">
        <div className="gap-y-6 px-8 h-40 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[71rem] mx-auto flex gap-4 items-center">
          <FaChartLine />
          <h1> Kết quả thi của tôi</h1>
        </div>
      </div>
      <div className="p-4 my-4 mx-[auto] bg-[#ffefd8] border-[#ffe8c8] border-[1px] text-[#855a1f] rounded-lg w-[96%] align-middle">
        <TbListDetails className="inline-block align-[-4px] mr-4" size={20} />
        <span>
          Tất cả kết quả dưới dây dựa trên bài đã thi của bạn. Bạn có muốn làm
          bài khác?
          <Link
            to={"/test/choose"}
            className="inline-block text-black font-normal underline ml-2 hover:text-[#0b8484] hover:animate-wobbleTop"
          >
            Làm bài thi ngay bây giờ
          </Link>
        </span>
      </div>
      <section className="mt-4 gap-y-4 min-h-[36vh] max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10">
        <div className="p-5 bg-white rounded-xl border-[2px] border-[#40ebe6] shadow-[4px_10px_0_0_#c4c4c4]">
          <div className="text-[14px] mb-1 flex flex-wrap gap-x-1 mt-3">
            {data?.typesPart?.map((type) => (
              <span className="py-[2px] px-2 bg-[#eee] text-[#1e2022] rounded-lg" key={type}>
                #{type}
              </span>
            ))}
          </div>
          <div>
            <h3 className="mt-4 inline-block h-[max-content] items-center gap-x-4 text-[#35509a] font-bold text-[2rem]">
              {data?.examName}
            </h3>
            <div className="flex flex-wrap gap-x-1 mt-1">
              {data?.partResultResponseDTOS?.map((partExam) => (
                <span
                  key={partExam?.partId}
                  className="py-[2px] px-1 bg-[#ffad3b] text-white rounded-md"
                >
                  Part {partExam?.serial}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 block">
            <button
              className="mt-2 h-[max-content] text-[14px] font-medium text-center px-4 py-[2px] border-[#35509a] border-[1px] rounded-lg bg-[#35509a] hover:bg-[#2c458b] text-white mr-2"
              onClick={() =>
                answerContainerRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              Xem đáp án
            </button>
            <Link
              to={`/test/choose`}
              className="mt-2 h-[max-content] text-[14px] font-medium text-center px-4 py-[2px] border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-black hover:text-white cursor-pointer"
            >
              Quay lại trang đề thi
            </Link>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-2 mt-4">
            <div className="flex flex-col gap-y-6 p-4 py-6 w-full lg:w-3/12 bg-[#f8f9fa] border-[1px] border-[#efefef] shadow-[0_2px_8px_rgba(0,0,0,.05)] rounded-sm">
              <span className="flex justify-between font-bold">
                <span className="font-normal">
                  <AiOutlineCheckCircle className="inline-block align-[-2px] mr-2" />
                  Kết quả làm bài
                </span>
                {data?.result}
              </span>
              <span className="flex justify-between font-bold">
                <span className="font-normal">
                  <GiTargetShot className="inline-block align-[-2px] mr-2" />
                  Độ chính xác (#đúng/#tổng)
                </span>
                {data?.percent}%
              </span>
              <span className="flex justify-between font-bold">
                <span className="font-normal">
                  <GiSandsOfTime className="inline-block align-[-2px] mr-2" />
                  Thời gian hoàn thành
                </span>
                {formatTime(data?.period)}
              </span>
            </div>
            <div className="flex flex-wrap w-full lg:w-9/12 lg:flex-nowrap gap-4">
              <div className="flex flex-col items-center justify-center gap-y-1 p-4 py-6 h-[max-content] w-full lg:w-4/12 bg-white border-[1px] border-[#efefef] shadow-[0_0_8px_rgba(0,0,0,.05)] rounded-sm">
                <AiOutlineCheckCircle className="text-green-700" />
                <span className="text-green-700 font-medium text-center">
                  Trả lời đúng
                </span>
                <span className="font-bold text-xl">
                  {data?.numberCorrectAnswer}
                </span>
                câu hỏi
              </div>
              <div className="flex flex-col items-center justify-center gap-y-1 p-4 py-6 h-[max-content] w-full lg:w-4/12 bg-white border-[1px] border-[#efefef] shadow-[0_0_8px_rgba(0,0,0,.05)] rounded-sm">
                <AiFillCloseCircle className="text-red-500" />
                <span className="text-red-500 font-medium">Trả lời sai</span>
                <span className="font-bold text-xl">
                  {data?.numberWrongAnswer}
                </span>
                câu hỏi
              </div>
              <div className="flex flex-col items-center justify-center gap-y-1 p-4 py-6 h-[max-content] w-full lg:w-4/12 bg-white border-[1px] border-[#efefef] shadow-[0_0_8px_rgba(0,0,0,.05)] rounded-sm">
                <AiFillMinusCircle className="text-gray-700" />
                <span className="text-gray-700 font-medium">Bỏ trống</span>
                <span className="font-bold text-xl">
                  {data?.numberEmptyAnswer}
                </span>
                câu hỏi
              </div>
            </div>
          </div>
          <div className="mt-6" ref={answerContainerRef}>
            <h3 className="font-bold text-[20px]">
              Đáp án
              <span className="text-[#e43a45] italic text-[16px] pl-6 block">
                Chú ý: Khi làm lại các câu sai, điểm trung bình của bạn sẽ KHÔNG
                BỊ ẢNH HƯỞNG.
              </span>
            </h3>
            <div className="p-4 my-4 mx-[auto] bg-[#d8f0e2] border-[#c8ead6] rounded-lg text-[#1f5e39] w-full align-middle">
              <FcIdea className="inline-block align-[-4px] mr-2" size={20} />
              <span>
                Tips: Khi xem chi tiết đáp án, bạn có thể tạo và lưu highlight
                từ vựng, keywords và tạo note đề học và tra cứu khi có nhu cầu
                ôn lại đề thi này trong tương lai.
              </span>
            </div>
            {data?.partResultResponseDTOS?.map((partResult) => (
              <div className="mt-2" key={partResult?.partId}>
                <h4 className="font-bold text-[20px]">
                  Part {partResult?.serial}
                </h4>
                <div className="mt-4 grid grid-cols-2">
                  {partResult?.resultResponseDTOS?.map((result) => (
                    <span
                      className="leading-7 text-[#35509a] font-bold"
                      key={result?.questionId}
                    >
                      <span className="w-8 h-8 mr-2 inline-flex items-center justify-center font-bold rounded-full bg-[#e8f2ff] text-[#35509a]">
                        {result?.serial}
                      </span>
                      {formatAnswer(result?.answer)}:
                      {result?.choice === 0 ? (
                        <>
                          <span className="mx-2 text-black italic font-medium">
                            Chưa trả lời
                          </span>
                          <AiOutlineMinus
                            className="inline-block align-[-4px] text-gray-700 font-bold"
                            size={22}
                          />
                        </>
                      ) : result?.choice !== 0 &&
                        result?.choice !== result?.answer ? (
                        <>
                          <span className="line-through mx-2 text-black italic font-medium">
                            {formatAnswer(result?.choice)}
                          </span>
                          <AiOutlineClose
                            className="inline-block align-[-4px] text-red font-bold"
                            size={22}
                          />
                        </>
                      ) : result?.correct ? (
                        <>
                          <span className="mx-2 text-black italic font-medium">
                            {formatAnswer(result?.choice)}
                          </span>
                          <AiOutlineCheck
                            className="inline-block align-[-4px] text-green-700 font-bold"
                            size={22}
                          />
                        </>
                      ) : null}
                      <span
                        className="font-normal cursor-pointer ml-2 hover:opacity-90"
                        onClick={() =>
                          setIsShowModal({
                            ...isShowModal,
                            isShowModal: true,
                            data: {
                              examName: data?.examName,
                              type: partResult?.type,
                              result,
                            },
                          })
                        }
                      >
                        {"[chi tiết]"}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isShowModal.isShowModal && (
        <ModalDetailAnswer
          isShowModal={isShowModal.isShowModal}
          setIsShowModal={setIsShowModal}
          data={isShowModal.data}
        />
      )}
    </section>
  );
};

export default StatisticTest;
