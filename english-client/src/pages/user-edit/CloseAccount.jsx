import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks";
import { userCommonService } from "../../services/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CloseAccount = () => {
  const [isCloseAccount, setIsCloseAccount] = useState(false);
  const auth = useAuth();
  const ref = useRef();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    isLoading: isLoading,
    data: data,
    refetch: r1,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: auth?.user?.id })
  );

  useEffect(() => {
    if (data) {
      setValue("email", data?.data?.data?.email);
    }
  }, [data]);

  const onSubmit = async (form) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { name, phone, password, newPassword, email, confirm_password } =
      form;
    if (password !== confirm_password) {
      ref.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!password.match(format)) {
      ref.current.innerText =
        "Mật khẩu phải bao gồm kí chữ thường, chữ hoa, kí tự đặc biệt, số";
    } else {
      ref.current.innerText = "";
      const formData = new FormData();
      formData.append("name", data?.data?.data?.name);
      formData.append("phone", data?.data?.data?.phone);
      formData.append("enable", false);
      formData.append("email", email);
      formData.append("role", 1);
      const {
        data: { status, message },
      } = await userCommonService.updateUser({
        userId: auth.user.id,
        updateData: formData,
      });
      if (status === "OK") {
        toast.success("Khóa tài khoản thành công!");
        auth.logoutUser();
        navigate("/login");
        ref.current.innerText = "";
      } else {
        ref.current.innerText = message;
      }
    }
  };
  if (isLoading) return;

  return (
    <>
      <div className="border-b border-gray-400">
        <div
          className="max-w-[16rem] md:max-w-[24rem] lg:max-w-[36rem] xl:max-w-[48rem] 
        2xl:max-w-[60rem] text-center mx-auto my-[16px]"
        >
          <h1 className="text-[24px] font-bold text-black">Khóa tài khoản</h1>
          <span className="text-[16px] text-black">
            Khóa tài khoản của bạn vĩnh viễn.
          </span>
        </div>
      </div>
      <form
        className="px-2 py-[24px] max-w-[26rem] lg:max-w-[30rem] xl:max-w-[36rem] 
        2xl:max-w-[40rem] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="pb-6 border-b border-gray-400">
          <span className="text-[#b32d0f] text-[18px] font-bold">
            Warning:{" "}
          </span>
          <span>
            Nếu bạn đóng tài khoản của mình, bạn sẽ bị hủy đăng ký tất cả dữ
            liệu quản lí của mình và sẽ mất quyền truy cập mãi mãi.
          </span>
        </div>
        {isCloseAccount ? (
          <>
            <div className="mt-4">
              <label className="font-bold">Email:</label>
              <input
                type={"text"}
                placeholder="Email"
                disabled
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                  transition duration-500 ease-in-out transform rounded-sm bg-gray-200 border border-blue
                  focus:border-blueGray-500 focus:bg-white focus:outline-none
                  focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                {...register("email", { required: true })}
              />
              <label className="font-bold mt-2 block">Mật khẩu:</label>
              <input
                type={"text"}
                placeholder="Mật khẩu hiện tại"
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                  transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
                  focus:border-blueGray-500 focus:bg-white focus:outline-none
                  focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                {...register("password", { required: true })}
              />
            </div>
            <div className="flex items-center gap-x-2 pt-5 md:font-sans text-xs text-gray-800">
              <input
                type="checkbox"
                className="inline-block border-0 "
                {...register("checkbox", { required: true })}
              />
              <span display="inline" className="text-[#1eb2a6]">
                Tôi xác nhận khóa tài khoản vĩnh viễn!.
              </span>
            </div>
            <div className="mt-2 text-red-600 text-[12px]">
              {errors.password?.type === "required" && (
                <span>Trường mật khẩu là bắt buộc. </span>
              )}
              {errors.checkbox && (
                <span>Bạn chưa đồng ý đồng ý tự nguyện!</span>
              )}
              <span className="text-red-600 text-[11px]" ref={ref}></span>{" "}
            </div>
            <span className="w-full border-t block my-10 border-gray-400"></span>
          </>
        ) : null}
        {!isCloseAccount ? (
          <button
            type="button"
            className="w-full mt-3 md:w-[max-content] bg-[#1eb2a6] text-white font-semibold px-10 py-3 rounded-sm hover:opacity-70"
            onClick={() => setIsCloseAccount(true)}
          >
            Khóa tài khoản
          </button>
        ) : (
          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              className="w-full md:w-[max-content] bg-[#b32d0f] text-white font-semibold px-10 py-3 rounded-sm hover:opacity-70"
              onClick={() => setIsCloseAccount(false)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-full md:w-[max-content] bg-[#1eb2a6] text-white font-semibold px-10 py-3 rounded-sm hover:opacity-70"
            >
              Chấp nhận
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default CloseAccount;
