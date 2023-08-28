import React from "react";
import Modal from "../../components/Modal/Modal";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSuccess from "../../components/Button/ButtonSuccess";
import { flashcardService } from "../../services/flashcard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteFlashCard = ({ isShowModal, setIsShowModal, data }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await flashcardService.deleteFlashcard({
      flashcardId: data.id,
    });
    if (response.data?.status === "OK") {
      toast.success("Xóa flashcard thành công !");
      navigate("/flashcard");
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <Modal isShowModal={isShowModal}>
      <div className="modal-content py-10 text-left px-6">
        <div className="flex justify-between items-center pb-3 text-3xl">
          <p className="font-bold">Xác nhận xóa flashcard {data?.name}</p>
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

        <div className="my-5">
          <p className="text-[#1f5e39]">
            Xóa flash đồng nghĩa list từ theo flashcard này cũng bị xóa
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-end pt-2 gap-x-2">
          <span onClick={() => setIsShowModal(false)}>
            <ButtonCancel content={"Hủy"} />
          </span>
          <ButtonSuccess content={"Xác nhận"} handleSubmit={handleDelete}/>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFlashCard;
