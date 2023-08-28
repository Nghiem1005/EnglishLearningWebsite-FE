import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks";
import { userCommonService } from "../../services/user";
import { toast } from "react-toastify";

const AccountSecurity = () => {
  const ref = useRef();
  const auth = useAuth();
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
    const { password, newPassword, email, confirm_password } = form;
    if (newPassword !== confirm_password) {
      ref.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!newPassword.match(format)) {
      ref.current.innerText =
        "Mật khẩu phải bao gồm kí chữ thường, chữ hoa, kí tự đặc biệt, số";
    } else {
      ref.current.innerText = "";
      const formData = new FormData();
      formData.append("oldPassword", password);
      formData.append("newPassword", newPassword);
      formData.append("email", email);
      formData.append("role", auth?.user?.role);
      const { data } = await userCommonService.changePassword({
        userId: auth.user.id,
        updateData: formData,
      });
      if (data?.status === "OK") {
        toast.success("Đổi mật khẩu thành công!");
        ref.current.innerText = "";
      } else {
        ref.current.innerText = data?.message;
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
          <h1 className="text-[24px] font-bold text-black">Tài khoản</h1>
          <span className="text-[16px] text-black">
            Thay đổi cài đặt tài khoản và mật khẩu ở đây.
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-[24px] max-w-[26rem] lg:max-w-[30rem] xl:max-w-[36rem] 
        2xl:max-w-[40rem] mx-auto"
      >
        <div className="pb-6 border-b border-gray-400">
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
        </div>
        <div className="mt-4">
          <label className="font-bold">Mật khẩu:</label>
          <span className="text-[#1eb2a6] text-[12px] block">
            *Mật khẩu ít nhất 6 kí tự, bao gồm chữ thường, chữ hoa, số, kí tự
            đặc biệt.
          </span>
          <input
            type={"password"}
            placeholder="Mật khẩu hiện tại"
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
            transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
            focus:border-blueGray-500 focus:bg-white focus:outline-none
            focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            {...register("password", { required: true })}
          />
          <input
            type={"password"}
            placeholder="Mật khẩu mới"
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
            transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
            focus:border-blueGray-500 focus:bg-white focus:outline-none
            focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            {...register("newPassword", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <input
            type={"password"}
            placeholder="Xác thực mật khẩu"
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
            transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
            focus:border-blueGray-500 focus:bg-white focus:outline-none
            focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            {...register("confirm_password", { required: true })}
          />
        </div>
        <div className="mt-2 text-red-600 text-[12px]">
          {errors.password?.type && <span>Trường mật khẩu là bắt buộc. </span>}
          {errors.newPassword?.type === "minLength" && (
            <span>Mật khẩu mới ít nhất 6 kí tự. </span>
          )}
          {errors.newPassword?.type === "maxLength" && (
            <span>Mật khẩu mới không quá 12 kí tự. </span>
          )}
          {errors.newPassword?.type === "required" && (
            <span>Trường mật mới khẩu là bắt buộc. </span>
          )}
          {errors.confirm_password && (
            <span>Trường xác nhận mật khẩu là bắt buộc. </span>
          )}
          <span className="text-[#ce3434] text-[14px]" ref={ref}></span>{" "}
        </div>
        <span className="w-full border-t block my-10 border-gray-400"></span>
        <button
          type="submit"
          className="w-full md:w-[max-content] bg-[#1eb2a6] text-white font-semibold px-10 py-3 rounded-sm hover:opacity-70"
        >
          Lưu
        </button>
      </form>
    </>
  );
};

export default AccountSecurity;
