import React from "react";
import Modal from "../../../components/Modal/Modal";
import ButtonCancel from "../../../components/Button/ButtonCancel";
import ButtonSuccess from "../../../components/Button/ButtonSuccess";
import { flashcardService } from "../../../services/flashcard";
import { toast } from "react-toastify";

const DeleteWord = ({
  isShowModal,
  setIsShowModal,
  data,
  dataWords,
  setDataWords,
}) => {
  const handleDelete = async () => {
    const response = await flashcardService.deleteWord({
      wordId: data?.id,
    });
    if (response.data?.status === "OK") {
      setDataWords(prevState =>
        prevState.filter((word) => word?.id !== data?.id)
      );
      toast.success("Xóa word thành công !");
      setIsShowModal();
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <Modal isShowModal={isShowModal}>
      <div className="modal-content py-10 text-left px-6">
        <div className="flex justify-between items-center pb-3 text-3xl">
          <p className="font-bold">Xác nhận xóa từ {data?.content}</p>
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

        <div className="my-2">
          <p className="text-[#1f5e39]">Chắc chắn xóa ?</p>
        </div>
        <div className="flex md:flex-row flex-col justify-end pt-2 gap-x-2">
          <span onClick={setIsShowModal}>
            <ButtonCancel content={"Hủy"} />
          </span>
          <ButtonSuccess content={"Xác nhận"} handleSubmit={handleDelete} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWord;
