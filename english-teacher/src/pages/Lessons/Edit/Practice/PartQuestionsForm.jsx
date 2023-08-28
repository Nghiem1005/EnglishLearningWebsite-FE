import React from "react";
import QuestionForm from "./QuestionForm";
import { FaFileAudio } from "react-icons/fa";
import { AiFillFileImage } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  changeColorPartExam,
} from "../../../../constants/defaultData";

const PartQuestionsForm = ({
  indexPartExam,
  partExam,
  createExam,
  setCreateExam,
  document,
  setDocument,
}) => {
  const increaseQuestion = (indexPartExam, indexQuestionPhrase) => {
    let tmpList =
      createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS[
        indexQuestionPhrase
      ].questionRequestDTOS;
    tmpList.push({
      serial: 0,
      content: "",
      explainContent: "",
      answerRequestDTOS: [
        {
          content: "",
          correct: "",
        },
      ],
    });

    setCreateExam({ ...createExam });
  };

  const uploadImage = (file, indexPartExam, indexQuestionPhrase) => {
    const { type } = file;
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        document[indexPartExam].image[indexQuestionPhrase] = reader.result;
        setDocument([...document]);
      };
      createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS[
        indexQuestionPhrase
      ].document.push(file);
      setCreateExam({ ...createExam });
    } else {
      toast.warn("Không đúng định dạng ảnh.");
    }
  };

  const uploadAudio = (file, indexPartExam, indexQuestionPhrase) => {
    if (file.type === "audio/mpeg") {
      document[indexPartExam].audio[indexQuestionPhrase] =
        URL.createObjectURL(file);
      setDocument([...document]);
      createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS[
        indexQuestionPhrase
      ].document.push(file);
      setCreateExam({ ...createExam });
    } else {
      toast.warn("Không đúng định dạng audio.");
    }
  };

  return partExam?.questionPhraseRequestDTOS?.map(
    (questionPhrase, indexQuestionPhrase) => (
      <div
        className={`${changeColorPartExam(indexPartExam)} space-y-6 sm:p-6`}
        key={indexQuestionPhrase}
      >
        <div className="px-6 py-8 rounded-xl border border-gray-200 flex flex-col gap-2 ">
          <div>
            <h1 className="font-bold mb-1">Tải đề </h1>
          </div>
          <div className="w-full flex gap-x-8">
            {!document[indexPartExam]?.audio[indexQuestionPhrase] && (
              <label className="w-10 h-16 flex flex-col items-center content-center cursor-pointer">
                <FaFileAudio className="w-full h-full text-red-300" />
                <p>Audio</p>
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) =>
                    uploadAudio(
                      e.target.files[0],
                      indexPartExam,
                      indexQuestionPhrase
                    )
                  }
                />
              </label>
            )}
            {!document[indexPartExam]?.image[indexQuestionPhrase] && (
              <label className="w-10 h-16 flex flex-col items-center content-center cursor-pointer">
                <AiFillFileImage className="w-full h-full text-blue-300" />
                <p>Ảnh</p>
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) =>
                    uploadImage(
                      e.target.files[0],
                      indexPartExam,
                      indexQuestionPhrase
                    )
                  }
                />
              </label>
            )}
            <button
              type="button"
              className="px-2 py-[2px] inline-block h-[max-content] rounded-sm text-white bg-[#d73030]"
              onClick={() => {
                createExam.partRequestDTOS[
                  indexPartExam
                ].questionPhraseRequestDTOS[indexQuestionPhrase].document = [];
                setCreateExam({ ...createExam });
                setDocument((prevState) => {
                  prevState[indexPartExam].audio[indexQuestionPhrase] = null;
                  prevState[indexPartExam].image[indexQuestionPhrase] = null;
                  return prevState;
                });
              }}
            >
              Hủy bỏ
            </button>
            {indexQuestionPhrase > 0 ? (
              <button
                type="button"
                className="px-1 text-[12px] py-[6px] inline-block h-[max-content] rounded-sm text-white bg-cyan-600"
                onClick={() => {
                  if (
                    createExam.partRequestDTOS[indexPartExam]
                      .questionPhraseRequestDTOS.length > 1
                  ) {
                    createExam.partRequestDTOS[
                      indexPartExam
                    ].questionPhraseRequestDTOS.splice(indexQuestionPhrase, 1);
                    setCreateExam({ ...createExam });
                  }
                }}
              >
                Xóa bộ câu hỏi
              </button>
            ) : null}
          </div>
          <div>
            {document[indexPartExam]?.image[indexQuestionPhrase] && (
              <img
                className="h-[300px] max-w-[500px] object-contain"
                src={document[indexPartExam]?.image[indexQuestionPhrase]}
                alt=""
              />
            )}
            {document[indexPartExam]?.audio[indexQuestionPhrase] && (
              <audio className="h-10 mt-2" controls>
                <source
                  src={document[indexPartExam]?.audio[indexQuestionPhrase]}
                />
              </audio>
            )}
          </div>
        </div>
        <div
          className="shadow px-6 py-2 rounded-xl border border-gray-200 "
          id="style-form"
        >
          <div>
            {questionPhrase.questionRequestDTOS?.map(
              (question, indexQuestion) => (
                <QuestionForm
                  key={`${indexPartExam}${indexQuestionPhrase}${indexQuestion}`}
                  indexExam={indexPartExam}
                  indexQuestionPhrase={indexQuestionPhrase}
                  indexQuestion={indexQuestion}
                  closeEventHandle={() => {
                    if (
                      createExam.partRequestDTOS[indexPartExam]
                        .questionPhraseRequestDTOS[indexQuestionPhrase]
                        .questionRequestDTOS.length > 1
                    ) {
                      createExam.partRequestDTOS[
                        indexPartExam
                      ].questionPhraseRequestDTOS[
                        indexQuestionPhrase
                      ].questionRequestDTOS.splice(indexQuestion, 1);
                      setCreateExam({ ...createExam });
                    }
                  }}
                  question={question}
                  createExam={createExam}
                  setCreateExam={setCreateExam}
                />
              )
            )}
          </div>
          <div className="w-[50%]">
            <button
              type="button"
              className="block w-full mr-4 py-2 px-4 rounded border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100"
              onClick={() =>
                increaseQuestion(indexPartExam, indexQuestionPhrase)
              }
            >
              Thêm câu hỏi
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default PartQuestionsForm;
