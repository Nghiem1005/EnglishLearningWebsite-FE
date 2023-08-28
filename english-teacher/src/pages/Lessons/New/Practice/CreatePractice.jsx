import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../../components";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { examService } from "../../../../services/exam";
import PartQuestionsForm from "./PartQuestionsForm";
import {
  changeColorPartExam,
  initialObjectCreateExam,
} from "../../../../constants/defaultData";

const CreatePractice = () => {
  const [createExam, setCreateExam] = useState({ ...initialObjectCreateExam });
  const [document, setDocument] = useState([
    {
      audio: [null],
      image: [null],
    },
  ]);
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const increasePartExam = () => {
    createExam.partRequestDTOS.push({
      description: "",
      type: null,
      questionPhraseRequestDTOS: [
        {
          document: [],
          serial: 0,
          questionRequestDTOS: [
            {
              serial: 0,
              content: "",
              explainContent: "",
              answerRequestDTOS: [
                {
                  content: "",
                  correct: "",
                },
              ],
            },
          ],
        },
      ],
    });
    setCreateExam({ ...createExam });
    setDocument([...document, { image: [null], audio: [null] }]);
  };

  const increaseQuestionPhrase = (indexPartExam) => {
    createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS.push({
      document: [],
      serial: 0,
      questionRequestDTOS: [
        {
          serial: 0,
          content: "",
          explainContent: "",
          answerRequestDTOS: [
            {
              content: "",
              correct: "",
            },
          ],
        },
      ],
    });
    setCreateExam({ ...createExam });
    setDocument((prevState) => {
      prevState[indexPartExam].image.push(null);
      prevState[indexPartExam].audio.push(null);
      return prevState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, partRequestDTOS } = createExam;

    let isFlagSuccess = false;

    const examRes = await examService.createPracticeLesson({
      lessonId,
      data: { name, period: 0 },
    });
    if (examRes.data?.data) {
      let serialQuestion = 0;
      let serialPartExam = 0;
      for (const partExam of partRequestDTOS) {
        serialPartExam += 1;
        const partExamRes = await examService.createPartExamTest({
          examId: examRes.data?.data?.id,
          data: {
            description: partExam.description,
            type: partExam.type,
            serial: serialPartExam,
          },
        });
        let serialPhraseQuestion = 0;
        for (const phraseQuestion of partExam.questionPhraseRequestDTOS) {
          const formData = new FormData();
          const { document } = phraseQuestion;
          if (document) {
            document.map((document) => formData.append("documents", document));
          }
          const arrayQuestion = phraseQuestion.questionRequestDTOS.map(
            (question) => {
              serialQuestion += 1;
              return { ...question, serial: serialQuestion };
            }
          );
          serialPhraseQuestion += 1;
          formData.append(
            "questionPhraseRequestDTO ",
            new Blob(
              [
                JSON.stringify({
                  serial: serialPhraseQuestion,
                  questionRequestDTOS: arrayQuestion,
                }),
              ],
              {
                type: "application/json",
              }
            )
          );
          const response = await examService.createPhraseQuestionTest({
            partId: partExamRes.data?.data?.id,
            data: formData,
          });
          if (response.data?.status === "OK") {
            isFlagSuccess = true;
          } else {
            isFlagSuccess = false;
            return;
          }
        }
      }
      if (isFlagSuccess) {
        toast.success("Tạo bài tập thành công");
        navigate("/lesson");
        setCreateExam({ ...initialObjectCreateExam });
      }
    }
  };

  // PartExam - Exam - Exercise
  return (
    <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-3">
        <Header title="Tạo bài tập" category={`Tiết học ${lessonId}`} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full border-[#999] border-[1px] mb-4 rounded-sm overflow-hidden">
          <div className="px-6 py-4">
            <h1 className="font-bold mb-1">Tên đề thi (hoặc bài tập) </h1>
            <div className="mt-1">
              <textarea
                rows={3}
                className={`mt-1 resize-none w-full border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 focus:outline-none`}
                placeholder="Tên đề (hoặc bài tập)"
                required
                value={createExam.name}
                onChange={(e) =>
                  setCreateExam({ ...createExam, name: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gray-50 ">
          <div className="w-full">
            <div>
              <div className="mt-1 md:col-span-2 md:mt-0">
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div>
                    {createExam?.partRequestDTOS?.map(
                      (partExam, indexPartExam) => (
                        <div
                          className="w-full border-[#999] border-[1px] mb-4 rounded-sm overflow-hidden"
                          key={indexPartExam}
                        >
                          <div
                            className={`${changeColorPartExam(
                              indexPartExam
                            )} px-6 py-4`}
                          >
                            <h1 className="font-bold mb-1">
                              Phần đề thi (hoặc phần bài tập)
                              {createExam.partRequestDTOS.length > 1 && (
                                <button
                                  type="button"
                                  className="px-1 py-[6px] text-[12px] ml-2 inline-block h-[max-content] rounded-sm text-white bg-cyan-600"
                                  onClick={() => {
                                    if (createExam.partRequestDTOS.length > 1) {
                                      createExam.partRequestDTOS.splice(
                                        indexPartExam,
                                        1
                                      );
                                      setCreateExam({ ...createExam });
                                    }
                                  }}
                                >
                                  Xóa phần đề
                                </button>
                              )}
                            </h1>
                            <div className="mt-1">
                              <textarea
                                rows={3}
                                className={`mt-1 resize-none w-full border rounded-md border-gray-300 shadow-sm  focus:ring-indigo-500 sm:text-sm p-2 focus:outline-none`}
                                placeholder="Mô tả"
                                required
                                value={
                                  createExam.partRequestDTOS[indexPartExam]
                                    .description
                                }
                                onChange={(e) => {
                                  createExam.partRequestDTOS[
                                    indexPartExam
                                  ].description = e.target.value;
                                  setCreateExam({ ...createExam });
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Loại hình bài tập
                                <select
                                  id="category"
                                  className={`mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm  focus:outline-none sm:text-sm`}
                                  onChange={(e) => {
                                    createExam.partRequestDTOS[
                                      indexPartExam
                                    ].type = e.target.value;
                                    setCreateExam(createExam);
                                  }}
                                >
                                  <option value="default">
                                    Chọn loại hình
                                  </option>
                                  <option value="LISTENING">LISTENING</option>
                                  <option value="READING">READING</option>
                                </select>
                              </label>
                            </div>
                          </div>
                          <PartQuestionsForm
                            key={indexPartExam + 1}
                            indexPartExam={indexPartExam}
                            partExam={partExam}
                            createExam={createExam}
                            setCreateExam={setCreateExam}
                            document={document}
                            setDocument={setDocument}
                          />
                          <div className="w-full space-y-6 bg-inherit sm:p-6">
                            <button
                              type="button"
                              className="block w-full mr-4 py-2 px-4 rounded border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100"
                              onClick={() =>
                                increaseQuestionPhrase(indexPartExam)
                              }
                            >
                              Thêm bộ câu hỏi
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {createExam.partRequestDTOS.length < 7 && (
                    <div className="w-full">
                      <button
                        type="button"
                        className="block w-full mr-4 py-2 px-4 rounded border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100"
                        onClick={() => increasePartExam()}
                      >
                        Thêm phần mới
                      </button>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Link
                      to="/lesson"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Hủy
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePractice;
