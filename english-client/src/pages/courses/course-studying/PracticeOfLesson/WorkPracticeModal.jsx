import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import {
  functionPipeData,
  markedAnswerData,
  newMarkedDataFunction,
} from "../../../../constants/defaultData";
import { practiceService } from "../../../../services/practice";
import { useAuth } from "../../../../contexts/authProvider";
import { FaAngleDoubleRight } from "react-icons/fa";

const WorkPracticeModal = ({
  practiceData,
  isShowModal,
  setIsShowModal,
  refetch,
}) => {
  const [dataPartExam, setDataPartExam] = useState({
    dataPartExam: null,
    indexChangeExam: null,
  });
  const [markedAnswer, setMarkedAnswer] = useState(markedAnswerData);
  const audioRef = useRef();
  const auth = useAuth();

  useEffect(() => {
    if (practiceData) {
      setDataPartExam({
        dataPartExam: practiceData[0],
        indexChangeExam: 0,
      });
      setMarkedAnswer({ ...markedAnswer, ...functionPipeData(practiceData) });
    }
  }, [practiceData]);

  const handleSubmit = async () => {
    const formData = {
      ...markedAnswer,
      period: 0,
    };
    const response = await practiceService.postScoreByPractice({
      userId: auth?.user?.id,
      data: formData,
    });
    if (response.data?.status === "OK") {
      refetch();
      setIsShowModal(false);
      toast.success("Nộp bài thành công!");
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <Modal isShowModal={isShowModal} width="max-w-[90%]" responsive="w-[90%]">
      <section className="mt-4 min-h-[36vh] w-full mx-auto ">
        <span className="flex gap-x-2 items-center justify-center">
          <h1 className="text-xl font-bold">Bài tập</h1>
          <button
            className="h-[max-content] text-[14px] font-medium text-center p-1 px-2 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-black hover:text-white cursor-pointer"
            onClick={setIsShowModal}
          >
            Thoát
          </button>
        </span>
        <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4">
          <div className="p-5 bg-white rounded-xl w-full">
            <div className="text-[16px] flex flex-wrap gap-x-3 mt-3">
              {practiceData?.map((partExam, indexPartExam) => (
                <span
                  key={partExam?.id}
                  className={`${
                    dataPartExam.indexChangeExam === indexPartExam
                      ? "text-[#35509a] bg-[#e8f2ff]"
                      : "border-black border-[1px] hover:bg-[#e7eaf3] bg-[#eee] text-[#1e2022] hover:border-[#eee]"
                  } py-1 px-3 rounded-2xl cursor-pointer font-medium`}
                  onClick={() => {
                    setDataPartExam({
                      dataPartExam: practiceData[indexPartExam],
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
                                  const newMarkedAnswer = newMarkedDataFunction(
                                    {
                                      markedAnswer,
                                      partId: dataPartExam.dataPartExam?.id,
                                      questionId: question?.id,
                                      value: e.target.value,
                                    }
                                  );
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
            {dataPartExam.indexChangeExam < practiceData?.length - 1 ? (
              <div
                className="float-right mt-2 text-[#35509a] cursor-pointer hover:text-[#192546] font-medium p-2"
                onClick={() => {
                  setDataPartExam({
                    dataPartExam:
                      practiceData[dataPartExam.indexChangeExam + 1],
                    indexChangeExam: dataPartExam.indexChangeExam + 1,
                  });
                  audioRef.current.pause();
                }}
              >
                Tiếp theo
                <FaAngleDoubleRight className="inline-block align-[-2px] ml-2" />
              </div>
            ) : (
              <button
                className="mt-6 w-full h-[max-content] text-[20px] font-medium text-center px-4 py-2 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-[#35509a] hover:text-white cursor-pointer"
                onClick={handleSubmit}
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default WorkPracticeModal;
