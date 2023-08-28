import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../components";
import { thunkPracticeTypes } from "../../constants/thunkTypes";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { practiceService } from "../../services/practice";
import { formatAnswer } from "../../constants/defaultData";
import { examService } from "../../services/exam";

const PracticeDetailShow = ({ data, setIsShowDetail }) => {
  const audioRef = useRef();
  const {
    isLoading,
    data: dataPractice,
    refetch,
  } = useQueryCustom(thunkPracticeTypes.GETALL_PRACTICE, () =>
    practiceService.getPractices({ lessonId: data.id })
  );

  useEffect(() => {
    if (data?.id) {
      refetch();
    }
  }, [data?.id]);

  const handleDeletePractice = async ({ practiceId }) => {
    const { data } = await examService.updateExamTest({
      examId: practiceId,
      data: { examRequestDTO: null },
    });
    if (data.status === "OK") {
      setIsShowDetail(false);
      toast.success("Xóa lesson thành công!");
    } else {
      toast.error("Có lỗi!");
    }
  };
  if (isLoading) return;

  return (
    <>
      <div
        style={{}}
        className="absolute bottom-0 left-0 right-0 h-full bg-zinc-900/20"
        onClick={() => setIsShowDetail(false)}
      ></div>
      <div className="top-[20%] overflow-y-auto p-6 md:p-10 z-40 bg-white rounded-tl-3xl rounded-tr-xl absolute bottom-0 left-0 right-0 opacity-100">
        <div className="flex justify-between items-start mb-2">
          <Header title={data?.name} convert={true} />
          <Link
            to={`/lesson/${data?.id}/edit`}
            className="hover:drop-shadow text-cyan font-bold py-2 px-4 rounded-full bg-lime-600 text-white hover:bg-lime-500"
          >
            <span>Chỉnh sửa Lesson</span>
          </Link>
        </div>
        <div>
          <div className="w-8/12 mx-auto overflow-hidden">
            <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-[4px]">
              <video
                className="VideoInput_video"
                width="100%"
                // height={00}
                controls
                src={data.document}
              />
            </div>
          </div>
        </div>
        {dataPractice?.partExam !== null ? (
          <>
            <div className="flex justify-between items-start pt-8 border-t">
              <Header title={`Bài tập: ` + dataPractice?.exam?.name} />
              <div className="flex gap-2 flex-wrap justify-items-end">
                <Link
                  to={`/lesson/${data?.id}/practice/${dataPractice?.exam?.id}/edit`}
                  className="hover:drop-shadow text-cyan font-bold py-1 px-2 rounded-[6px] bg-cyan-700 text-white hover:bg-cyan-600"
                >
                  <span>Chỉnh sửa bài tập</span>
                </Link>
                <button
                  className="hover:drop-shadow ml-1 text-cyan font-bold py-1 px-2 rounded-[6px] bg-red-500 text-white hover:bg-red-400"
                  onClick={() =>
                    handleDeletePractice({
                      practiceId: dataPractice?.exam?.id,
                    })
                  }
                >
                  Xóa bài tập
                </button>
              </div>
            </div>
            {dataPractice?.partExam?.map((partPractice, index) => (
              <>
                <div key={partPractice?.id}>
                  <h2>Phần {partPractice?.serial}:</h2>
                  <h3 className="font-bold">{partPractice?.description}</h3>
                  {partPractice?.questionPhraseResponseDTOS?.map(
                    (partQuestion) => (
                      <>
                        <div
                          className="flex flex-col gap-2"
                          key={partQuestion?.id}
                        >
                          {partQuestion?.document?.map((document) =>
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
                                className="h-[50vh] object-contain"
                                src={document}
                                alt=""
                              />
                            )
                          )}
                        </div>
                        {partQuestion?.questionResponseDTOS?.map((question) => (
                          <div
                            key={question?.id}
                            className=" bg-gray-50 p-4 mb-10 mt-1 mx-3 rounded-sm"
                          >
                            <h4 className="font-bold">
                              {`Câu hỏi ${question?.serial}: `}{" "}
                              <span
                                className="inline-block"
                                dangerouslySetInnerHTML={{
                                  __html: question.content,
                                }}
                              ></span>
                            </h4>
                            {question.answerResponseDTOS.map((answer) => (
                              <div className="pl-6 rounded-md" key={answer?.id}>
                                <span>
                                  {`Đáp án ${formatAnswer(answer?.serial)}: `}{" "}
                                  <span
                                    className="min-w-[100px] inline-block"
                                    dangerouslySetInnerHTML={{
                                      __html: answer.content,
                                    }}
                                  ></span>
                                </span>
                                <span
                                  className={
                                    answer.correct
                                      ? "text-green-500 ml-4"
                                      : "text-red-500 ml-4"
                                  }
                                >
                                  {answer.correct ? "true" : "false"}
                                </span>
                              </div>
                            ))}
                            <span className="mt-2 block font-bold">
                              Giải thích đáp án:{" "}
                              <span className="font-medium">
                                {question?.explainContent}
                              </span>
                            </span>
                          </div>
                        ))}
                      </>
                    )
                  )}
                </div>
              </>
            ))}
          </>
        ) : (
          <div className="flex items-center gap-x-1 m-4">
            <h3 className="block font-bold ">Bài tập: </h3>
            <Link
              to={`/lesson/${data?.id}/practice/create`}
              className="hover:drop-shadow text-cyan font-bold py-2 px-4 rounded-full bg-lime-600 text-white hover:bg-lime-500 block"
              style={{ width: "max-content" }}
            >
              <span>Thêm câu hỏi</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PracticeDetailShow;
