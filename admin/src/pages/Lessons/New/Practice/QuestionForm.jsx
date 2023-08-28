import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import AnswerVariantForm from "./AnswerNewForm";

const QuestionForm = ({
  closeEventHandle,
  createExam,
  setCreateExam,
  question,
  indexExam,
  indexQuestionPhrase,
  indexQuestion,
}) => {
  const [countAnswer, setCountAnswer] = useState([1]);
  const increaseAnswer = (indexQuestion) => {
    let questionsAnswer =
      createExam.partRequestDTOS[indexExam].questionPhraseRequestDTOS[
        indexQuestionPhrase
      ].questionRequestDTOS[indexQuestion].answerRequestDTOS;
    if (!!questionsAnswer) {
      questionsAnswer.push({ content: "", correct: false });
      setCreateExam({...createExam});
      setCountAnswer(countAnswer + 1);
    } else {
      alert("ada");
    }
  };

  return (
    <div>
      <div className="flex justify-end p-1">
        {indexQuestion > 0 ? (
          <button
            type="button"
            className="rounded-full hover:drop-shadow-lg h-10 w-10 flex justify-center items-center"
            style={{ backgroundColor: "white" }}
            onClick={closeEventHandle}
          >
            <GrClose size="15px" style={{ color: "white" }} color="#666666" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="px-4">
        <h1 className="font-bold mb-1">Câu hỏi</h1>
        <div className="mt-1">
          <RichTextEditorComponent
            height={120}
            value={question?.content}
            change={(e) => {
              createExam.partRequestDTOS[indexExam].questionPhraseRequestDTOS[
                indexQuestionPhrase
              ].questionRequestDTOS[indexQuestion].content = e.value;
              setCreateExam({...createExam});
            }}
          >
            <Inject services={[HtmlEditor, Toolbar, Image, QuickToolbar]} />
          </RichTextEditorComponent>
        </div>
      </div>
      <div className="pl-6 pb-4">
        <div className="flex gap-x-4 items-center font-bold my-1">
          <h2 className="w-7/12">Đáp án</h2>
          <span className="">Đáp án đúng</span>
          <span>Xóa đáp án</span>
        </div>
        {question?.answerRequestDTOS?.map((option, indexAnswer) => (
          <AnswerVariantForm
            key={indexAnswer}
            indexPartExam={indexExam}
            indexQuestionPhrase={indexQuestionPhrase}
            indexQuestion={indexQuestion}
            indexAnswer={indexAnswer}
            option={option}
            createExam={createExam}
            setCreateExam={setCreateExam}
          />
        ))}
        <div className="pt-2">
          <button
            type="button"
            className="block w-100 mr-4 py-2 px-4 rounded border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100"
            onClick={() => increaseAnswer(indexQuestion)}
          >
            Thêm đáp án
          </button>
        </div>
      </div>
      <div className="pl-6 pb-4">
        <div className="my-1 font-bold">Giải thích đáp án</div>
        <div className="pt-2">
          <textarea
            rows={3}
            className={`mt-1 resize-none w-full border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 focus:outline-none`}
            placeholder="Giải thích đáp án"
            required
            value={question?.explainContent}
            onChange={(e) => {
              createExam.partRequestDTOS[indexExam].questionPhraseRequestDTOS[
                indexQuestionPhrase
              ].questionRequestDTOS[indexQuestion].explainContent = e.target.value;
              setCreateExam({...createExam});
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
