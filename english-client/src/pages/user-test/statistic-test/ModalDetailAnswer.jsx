import React, { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { useQueryCustom } from "../../../hooks";
import { thunkPracticeTypes } from "../../../constants/thunkTypes";
import { practiceService } from "../../../services/practice";
import { formatAnswer } from "../../../constants/defaultData";

const ModalDetailAnswer = ({ isShowModal, setIsShowModal, data }) => {
  const {
    data: dataQuestion,
    isLoading,
    isError,
    refetch,
  } = useQueryCustom(thunkPracticeTypes.GET_QUESTION, () =>
    practiceService.getQuestion({ questionId: data?.result?.questionId })
  );

  useEffect(() => {
    if (data?.result?.questionId) {
      refetch();
    }
  }, [data]);

  if (isError || isLoading) return;
  return (
    <Modal isShowModal={isShowModal} width="max-w-xl">
      <div className="modal-content py-10 text-left px-6">
        <div className="flex justify-between items-center pb-3 text-3xl">
          <p className="font-bold text-[22px]">
            Đáp án chi tiết #{data?.result?.serial}
          </p>
          <div
            className="modal-close cursor-pointer z-50"
            onClick={() => setIsShowModal(false)}
          >
            <svg
              className="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>
        <div className="my-1">
          <p className="text-[#1f5e39] font-bold">{data?.examName}</p>
          <div className="text-[14px] flex flex-wrap gap-x-1 my-3">
            <span className="py-[1px] px-2 bg-[#eee] text-[#1e2022] rounded-lg">
              #{data?.type || "Reading"}
            </span>
          </div>
          <div>
            <span className="leading-7 mb-2 block">
              <span className="w-8 h-8 mr-2 inline-flex items-center justify-center font-bold rounded-full bg-[#e8f2ff] text-[#35509a]">
                {dataQuestion?.serial}
              </span>
              <span
                className="inline-block"
                dangerouslySetInnerHTML={{ __html: dataQuestion?.content }}
              ></span>
            </span>
            {dataQuestion?.answerResponseDTOS?.map((answer) => (
              <span
                key={answer?.id}
                className={`${
                  answer?.serial === data?.result?.answer
                    ? "bg-[#ffe8e8]"
                    : null
                } flex gap-x-1 items-center text-[#8c98a4] ml-3`}
              >
                <input
                  className="checked:bg-white w-4 h-4"
                  type="radio"
                  name="1"
                  disabled
                  checked={answer?.serial === data?.result?.choice}
                />
                {formatAnswer(answer?.serial)}.{" "}
                <span
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: answer?.content }}
                ></span>
              </span>
            ))}
          </div>
          <span className="mt-3 block text-[#1f5e39] font-bold">
            Đáp án đúng: {formatAnswer(data?.result?.answer)}
          </span>
          <span className="mt-3 block font-bold">
            Giải thích:{" "}
            <span className="font-normal">{dataQuestion?.explainContent}</span>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailAnswer;
