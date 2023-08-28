import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Modal from "../../../components/Modal/Modal";
import ButtonCancel from "../../../components/Button/ButtonCancel";
import ButtonSuccess from "../../../components/Button/ButtonSuccess";
import { toast } from "react-toastify";
import { flashcardService } from "../../../services/flashcard";

const CreateWord = ({
  isShowModal,
  setIsShowModal,
  titleModal,
  data = {},
  parentData = {},
  dataWords,
  setDataWords,
  isCreateWord = false,
  isUpdateWord = false,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const ref = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("content", data?.content);
      setValue("define", data?.define);
      setValue("spelling", data?.spelling);
      setValue("example", data?.example);
      setValue("type", data?.type);
    }
  }, []);

  const handleUploadImage = (e) => {
    const { type } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      setDataImage(e.target.files[0]);
    } else {
      toast.warning("Ảnh định dạng là png, svg, jpg hoặc jpeg.");
      setDataImage(null);
    }
  };

  const onSubmit = async (form) => {
    const { content, define, type, spelling, example } = form;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("define", define);
    if (type) formData.append("type", type);
    if (spelling) formData.append("spelling", spelling);
    if (example) formData.append("example", example);
    if (dataImage) {
      formData.append("image", dataImage);
    }
    if (isCreateWord) {
      const response = await flashcardService.addWord({
        listWordId: parentData?.id,
        updateData: formData,
      });
      if (response?.data?.status === "OK") {
        setDataWords([...dataWords, { ...response.data?.data }]);
        toast.success("Tạo từ vựng thành công!");
        setValue("content", "");
        setValue("define", "");
        setValue("spelling", "");
        setValue("example", "");
        setValue("type", "");
        setIsShowModal();
      } else {
        toast.error("Ops! Có lỗi.");
      }
    }
    if (isUpdateWord) {
      const response = await flashcardService.updateWord({
        wordId: data?.id,
        updateData: formData,
      });
      if (response?.data?.status === "OK") {
        setDataWords((prevState) =>
          prevState.map((word) =>
            word?.id === data?.id ? { ...response.data?.data } : { ...word }
          )
        );
        setValue("content", "");
        setValue("define", "");
        setValue("spelling", "");
        setValue("example", "");
        setValue("type", "");
        toast.success("Chỉnh sửa từ vựng thành công!");
        setIsShowModal();
      } else {
        toast.error("Ops! Có lỗi.");
      }
    }
  };

  return (
    <Modal isShowModal={isShowModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-10 text-left px-6">
          <div className="flex justify-between items-center pb-3 text-3xl">
            <p className="font-bold">{titleModal}</p>
            <div
              className="modal-close cursor-pointer z-50"
              onClick={setIsShowModal}
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
            <p className="text-[#1f5e39]">List từ: {parentData?.name}</p>
            <input
              placeholder="Từ mới"
              className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                      transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                      focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                      focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 mb-4"
              {...register("content", { required: true })}
              required
            />
            <textarea
              placeholder="Định nghĩa"
              className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                    transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                    focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                    focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 min-h-10"
              {...register("define", { required: true })}
              required
            />
            <div
              className={`p-6 cursor-pointer border-[#999] border-[1px] bg-black/10 rounded-md ${
                isExpand
                  ? "rounded-bl-none rounded-br-none border-b-[black/10]"
                  : ""
              } mt-3 text-[#35509a] hover:underline`}
              onClick={() => setIsExpand((prevState) => !prevState)}
            >
              Thêm phiên âm, ghi chú, ảnh,...
              {isExpand ? (
                <AiFillCaretUp className="inline-block" />
              ) : (
                <AiFillCaretDown className="inline-block" />
              )}
            </div>
            <div
              className={`${
                isExpand ? "block" : "hidden"
              } border-[#999] border-[1px] border-t-0 p-4 flex flex-col gap-y-4`}
            >
              <div className="">
                <span className="block">Ảnh</span>
                <input type="file" onChange={handleUploadImage} />
              </div>
              <div className="flex gap-x-2 flex-wrap lg:flex-nowrap xl:flex-nowrap">
                <input
                  placeholder="Loại từ (N, V, ADJ...)"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                      transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                      focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                      focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 mb-4"
                  {...register("type")}
                />
                <input
                  placeholder="Phiên âm"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                      transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                      focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                      focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 mb-4"
                  {...register("spelling")}
                />
              </div>
              <textarea
                placeholder="Ví dụ"
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                    transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                    focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                    focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 min-h-10"
                {...register("example")}
              />
            </div>
            {errors.content && (
              <span className="text-[12px] text-red-500">
                Trường từ vựng không được bỏ trống.
              </span>
            )}
            <p ref={ref} className="text-[10px] font-normal mb-7 mt-2 "></p>
          </div>
          <div className="flex md:flex-row flex-col-reverse justify-end pt-2 gap-2">
            <span onClick={setIsShowModal}>
              <ButtonCancel content={"Hủy"} />
            </span>
            <ButtonSuccess content={"Xác nhận"} type={"submit"} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWord;
