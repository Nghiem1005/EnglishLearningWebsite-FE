import React from "react";
import { GrClose } from "react-icons/gr";
import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import AnswerVariantForm from "./Answers/AnswerVariantForm";

const VariantFormNew = ({
  closeEventHandle,
  countAnswer,
  setCountAnswer,
  dataUpdatePractice,
  setDataUpdatePractice,
  answer,
  indexExam,
  indexQuestion
}) => {
  const increaseAnswer = (indexQuestion) => {
    let questionsAnswer = dataUpdatePractice.exams[indexExam].questionResponseDTOS[indexQuestion].answerResponseDTOS;
    if (!!questionsAnswer) {
      questionsAnswer.push({ content: "", correct: false });
      setDataUpdatePractice(dataUpdatePractice);
      setCountAnswer(countAnswer + 1);
    } else {
      alert("ada");
    }
  };

  return (
    <div id={`variant-form-` + indexQuestion} className="border-b-1 border-gray-200">
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
            // ref={'descriptionRef'}
            value={answer?.content}
            change={(e) => {
              dataUpdatePractice.exams[indexExam].questionResponseDTOS[indexQuestion].content = e.value
              setDataUpdatePractice(dataUpdatePractice)
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
        {answer?.answerResponseDTOS?.map((option, indexAnswer) => (
          <AnswerVariantForm
            key={indexAnswer}
            indexAnswer={indexAnswer}
            indexQuestion={indexQuestion}
            indexExam={indexExam}
            option={option}
            dataUpdatePractice={dataUpdatePractice}
            setDataUpdatePractice={setDataUpdatePractice}
          />
        ))}
        <div id="style-answer-render"></div>
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
    </div>
  );
};

export default VariantFormNew;
