import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { FaAngleDoubleRight } from "react-icons/fa";
import { practiceService } from "../../../services/practice";
import { useCountDown, useLocationQuery, useQueryCustom } from "../../../hooks";
import { thunkTestTypes } from "../../../constants/thunkTypes";
import {
  formatTime,
  functionPipeData,
  markedAnswerData,
  newMarkedDataFunction,
} from "../../../constants/defaultData";
import { useAuth } from "../../../contexts/authProvider";
import { toast } from "react-toastify";

const WorkTest = () => {
  const [dataPartExam, setDataPartExam] = useState({
    dataPartExam: null,
    indexChangeExam: null,
  });
  const [markedAnswer, setMarkedAnswer] = useState(markedAnswerData);
  const audioRef = useRef();
  const history = createBrowserHistory();
  const { testId } = useParams();
  const query = useLocationQuery();
  const partIds = query.get("part");
  const time = query.get("time");
  const countdownTime = useCountDown(time * 60);
  const auth = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQueryCustom(
    thunkTestTypes.GET_TEST,
    () =>
      practiceService.getPracticesByExam({
        partIds: partIds.split(",").reverse(),
        testId,
      })
  );

  useEffect(() => {
    if (data) {
      setDataPartExam({
        dataPartExam: data[0],
        indexChangeExam: 0,
      });
      setMarkedAnswer({ ...markedAnswer, ...functionPipeData(data) });
    }
  }, [data]);

  const handleSubmit = async () => {
    const formData = {
      ...markedAnswer,
      period: time * 60 - countdownTime,
    };
    const response = await practiceService.postScoreByPractice({
      userId: auth?.user?.id,
      data: formData,
    });
    if (response.data?.status === "OK") {
      toast.success("Nộp bài thành công!");
      navigate("/test/history");
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  if (isLoading || isError) return;

  return (
    <section className="mt-4 mb-10 min-h-[36vh] w-[96%] mx-auto ">
      <span className="flex gap-x-2 items-center justify-center">
        <h1 className="text-xl font-bold">C18 IELTS reading test 1</h1>
        <Link
          to={`/test/1/detail`}
          className="h-[max-content] text-[14px] font-medium text-center p-1 px-2 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-black hover:text-white cursor-pointer"
        >
          Thoát
        </Link>
      </span>
      <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4">
        <div className="p-5 bg-white rounded-xl lg:w-11/12 shadow-[0_10px_0_0_#c4c4c4]">
          <div className="text-[16px] mb-6 flex flex-wrap gap-x-3 mt-3">
            {data?.map((partExam, indexPartExam) => (
              <span
                key={partExam?.id}
                className={`${
                  dataPartExam.indexChangeExam === indexPartExam
                    ? "text-[#35509a] bg-[#e8f2ff]"
                    : "border-black border-[1px] hover:bg-[#e7eaf3] bg-[#eee] text-[#1e2022] hover:border-[#eee]"
                } py-1 px-3 rounded-2xl cursor-pointer font-medium`}
                onClick={() => {
                  setDataPartExam({
                    dataPartExam: data[indexPartExam],
                    indexChangeExam: indexPartExam,
                  });
                  audioRef.current.pause();
                }}
              >
                Part {partExam?.serial}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="max-h-[72vh] w-full overflow-y-scroll scroll-m-1 pb-10 px-6">
              <span className="mt-1 mb-2 italic">
                {dataPartExam.dataPartExam?.description}
              </span>
              {dataPartExam.dataPartExam?.questionPhraseResponseDTOS?.map(
                (partExam) => (
                  <>
                    <div key={partExam?.id} className="mb-4">
                      {partExam?.document?.map((document) =>
                        document?.includes(".mp") ? (
                          <audio
                            key={document}
                            className="h-10 mt-2"
                            ref={audioRef}
                            controls
                          >
                            <source src={document} />
                          </audio>
                        ) : (
                          <img
                            key={document}
                            className=" object-contain"
                            src={document}
                            alt=""
                          />
                        )
                      )}
                    </div>
                    {partExam?.questionResponseDTOS?.map((question) => (
                      <div key={question?.id} className="mb-2">
                        <span className="leading-7">
                          <span className="w-8 h-8 mr-2 inline-flex items-center justify-center font-bold rounded-full bg-[#e8f2ff] text-[#35509a]">
                            {question?.serial}
                          </span>
                          <span
                            className="inline-block"
                            dangerouslySetInnerHTML={{
                              __html: question?.content,
                            }}
                          ></span>
                        </span>
                        {question?.answerResponseDTOS?.map((answer) => (
                          <span
                            key={answer?.id}
                            className="flex gap-x-1 items-center ml-2"
                          >
                            <input
                              className="checked:bg-white w-4 h-4"
                              type="radio"
                              value={answer?.serial}
                              name={question?.id}
                              onChange={(e) => {
                                const newMarkedAnswer = newMarkedDataFunction({
                                  markedAnswer,
                                  partId: dataPartExam.dataPartExam?.id,
                                  questionId: question?.id,
                                  value: e.target.value,
                                });
                                setMarkedAnswer({
                                  ...markedAnswer,
                                  partResultRequestDTOS: newMarkedAnswer,
                                });
                              }}
                            />
                            {answer?.serial}. {answer?.content}
                          </span>
                        ))}
                      </div>
                    ))}
                  </>
                )
              )}
            </div>
          </div>
          {dataPartExam.indexChangeExam < data?.length - 1 && (
            <div
              className="float-right mt-2 text-[#35509a] cursor-pointer hover:text-[#192546] font-medium p-2"
              onClick={() => {
                setDataPartExam({
                  dataPartExam: data[dataPartExam.indexChangeExam + 1],
                  indexChangeExam: dataPartExam.indexChangeExam + 1,
                });
                audioRef.current.pause();
              }}
            >
              Tiếp theo
              <FaAngleDoubleRight className="inline-block align-[-2px] ml-2" />
            </div>
          )}
        </div>
        <div className="p-5 bg-white rounded-sm w-full lg:w-3/12 shadow-[0_10px_0_0_#c4c4c4]">
          <span className="text-[20px] font-normal block">
            Thời gian làm bài còn lại
          </span>
          <span className="font-bold text-[20px] block">
            {formatTime(countdownTime)}
          </span>
          <button
            className="mt-6 w-full h-[max-content] text-[20px] font-medium text-center px-4 py-2 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-[#35509a] hover:text-white cursor-pointer"
            onClick={handleSubmit}
          >
            Nộp bài
          </button>
          <span className="font-bold italic text-[#ffad3b] mt-6 block">
            Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để đánh dấu
            review
          </span>
          <div className="flex flex-col gap-y-1">
            <div className="mt-4">
              <span className="font-bold">
                Part {dataPartExam.dataPartExam?.serial}
              </span>
              <div className="flex gap-2 mt-2">
                {dataPartExam.dataPartExam?.questionPhraseResponseDTOS?.map(
                  (questions) =>
                    questions?.questionResponseDTOS?.map((question) => (
                      <span
                        key={question?.id}
                        className="w-7 h-7 flex items-center justify-center border-black border-[1px] rounded-sm cursor-pointer hover:bg-[#35509a] hover:text-white text-[12px]"
                      >
                        {question?.serial}
                      </span>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkTest;
