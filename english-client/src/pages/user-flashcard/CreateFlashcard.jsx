import React, { useEffect, useRef } from "react";
import Modal from "../../components/Modal/Modal";
import { set, useForm } from "react-hook-form";
import ButtonSuccess from "../../components/Button/ButtonSuccess";
import ButtonCancel from "../../components/Button/ButtonCancel";
import { useAuth } from "../../contexts/authProvider";
import { flashcardService } from "../../services/flashcard";
import { toast } from "react-toastify";

const CreateFlashcard = ({
  isShowModal,
  setIsShowModal,
  titleModal = "Tạo list từ",
  data = {},
  dataFlashcard,
  setDataFlashcard,
  isCreateFlashcard = false,
  isUpdateFlashCard = false,
}) => {
  const ref = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const auth = useAuth();

  useEffect(() => {
    if (data) {
      setValue("id", data?.id);
      setValue("name", data?.name);
      setValue("description", data?.description);
    }
  }, [data]);

  const onSubmit = async (form) => {
    const { id, name, description } = form;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (isCreateFlashcard) {
      const response = await flashcardService.addFlashcard({
        userId: auth?.user?.id,
        dataFlashcard: formData,
      });
      if (response?.data?.status === "OK") {
        setDataFlashcard([...dataFlashcard, { ...response.data.data }]);
        toast.success("Tạo flashcard thành công!");
        setIsShowModal();
      } else {
        toast.error("Ops! Có lỗi.");
      }
    }
    if (isUpdateFlashCard) {
      const response = await flashcardService.updateFlashcard({
        flashcardId: parseInt(id),
        updateData: { name, description },
      });
      if (response?.data?.status === "OK") {
        toast.success("Chỉnh sửa flashcard thành công!");
        setIsShowModal();
      } else {
        toast.error("Ops! Có lỗi.");
      }
    }
  };

  return (
    <div className={isShowModal ? "block" : "none"}>
      <Modal isShowModal={isShowModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-content py-10 text-left px-6">
            <div className="flex justify-between items-center pb-3 text-3xl">
              <p className="font-bold">{titleModal}</p>
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
                Tạo flash của list từ theo lĩnh vực liên quan
              </p>
              <input
                placeholder="Tên flashcard"
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                    transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                    focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                    focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 mb-4"
                {...register("name", { required: true })}
              />
              <textarea
                placeholder="Mô tả"
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                    transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                    focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                    focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 min-h-10"
                {...register("description", { required: true })}
              />
              {errors.name && (
                <span className="text-[12px] text-red-500">
                  Trường tên flashcard không được bỏ trống.
                </span>
              )}
              {errors.description && (
                <span className="text-[12px] text-red-500">
                  Trường description không được bỏ trống.
                </span>
              )}
              <p ref={ref} className="text-[10px] font-normal mb-7 mt-2 "></p>
            </div>
            <div className="flex md:flex-row flex-col justify-end pt-2 gap-x-2">
              <span onClick={() => setIsShowModal(false)}>
                <ButtonCancel content={"Hủy"} />
              </span>
              <ButtonSuccess content={"Xác nhận"} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateFlashcard;
