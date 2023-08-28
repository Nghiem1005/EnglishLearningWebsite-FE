import React, { useState } from "react";
import { BsCheckSquare, BsSquare, BsTrash } from "react-icons/bs";

const AnswerVariantForm = ({
  option,
  indexPartExam,
  indexQuestionPhrase,
  indexQuestion,
  indexAnswer,
  createExam,
  setCreateExam,
}) => {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(option.correct);
  const [value, setValue] = useState(option.content);
  const [item, setItem] = useState(option);

  return item ? (
    <div className="flex items-center gap-x-6">
      <div className="w-7/12">
        <input
          type="text"
          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none sm:text-sm p-2 pl-2"
          placeholder="Đáp án"
          required
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS[
              indexQuestionPhrase
            ].questionRequestDTOS[indexQuestion].answerRequestDTOS[
              indexAnswer
            ].content = e.target.value;
            setCreateExam({...createExam});
          }}
        />
      </div>
      <div
        className="cursor-pointer w-28 content-center items-center flex"
        onClick={() => {
          setIsAnswerCorrect(!isAnswerCorrect);
          createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS[
            indexQuestionPhrase
          ].questionRequestDTOS[indexQuestion].answerRequestDTOS[
            indexAnswer
          ].correct = !isAnswerCorrect;
          setCreateExam({...createExam});
        }}
      >
        {isAnswerCorrect ? (
          <BsCheckSquare className="w-5 h-5 text-blue-700 font-bold" />
        ) : (
          <BsSquare className="w-5 h-5" />
        )}
      </div>
      <div
        className="cursor-pointer w-28 content-center items-center flex"
        onClick={() => {
          createExam.partRequestDTOS[indexPartExam].questionPhraseRequestDTOS[
            indexQuestionPhrase
          ].questionRequestDTOS[indexQuestion].answerRequestDTOS.splice(
            indexAnswer,
            1
          );
          setCreateExam({...createExam});
          setItem(null);
        }}
      >
        <BsTrash className="w-5 h-5 text-red-700 font-bold" />
      </div>
    </div>
  ) : null;
};

export default AnswerVariantForm;
