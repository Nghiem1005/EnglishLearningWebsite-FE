import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ButtonCancel from "../../../components/Button/ButtonCancel";
import ButtonSuccess from "../../../components/Button/ButtonSuccess";
import { teacherService } from "../../../services/user";
import "./CreateTeacher.css";

const CreateTeacher = ({ isShowModal, setIsShowModal }) => {
  const ref = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (form) => {
    const { email } = form;
    const response = await teacherService.sendMail({ email });
    if (response.status === 200) {
      ref.current.innerText =
        "Link đăng kí đã được gửi tới email. Vui lòng kiểm tra.";
      ref.current.style.color = "rgb(6, 182, 212)";
      setValue("email", "");
      setTimeout(() => {
        setIsShowModal(false);
      }, 3000);
    } else {
      ref.current.innerText = "Email không hợp lệ";
      ref.current.style.color = "red";
      setValue("email", "");
    }
  };

  return (
    <div
      className={`${
        isShowModal ? "flex fadeIn faster" : "hidden fadeOut"
      } main-modal fixed w-full h-100 inset-0 z-[10000] overflow-hidden justify-center items-center animated`}
      style={{ background: "rgba(0,0,0,.6)" }}
    >
      <div className=" shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Thêm giảng viên</p>
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
              <p>Đường dẫn form đăng kí sẽ được gửi đến email này.</p>
              <input
                placeholder="Email"
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                  transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
                  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                  focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-[12px] text-red-500">
                  Trường email không được bỏ trống.
                </span>
              )}
              <p ref={ref} className="text-[10px] font-normal mb-7 mt-2 "></p>
            </div>
            <div className="flex md:flex-row flex-col justify-end pt-2 gap-x-2">
              <span onClick={() => setIsShowModal(false)}>
                <ButtonCancel content={"Hủy"} />
              </span>
              <ButtonSuccess content={"Xác nhận"} bgColor="cyan" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;
