import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks";
import { userCommonService } from "../../services/user";
import { toast } from "react-toastify";

const EditProfile = () => {
  const ref = useRef();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    isLoading,
    isError,
    data: data,
    refetch: r1,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: auth?.user?.id })
  );

  useEffect(() => {
    if (data) {
      setValue("email", data?.data?.data?.email);
      setValue("name", data?.data?.data?.name);
      setValue("phone", data?.data?.data?.phone);
    }
  }, [data]);

  const onSubmit = async (form) => {
    const { name, phone, email } = form
      ref.current.innerText = "";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("enable", true);
      formData.append("role", 1);
      const {
        data: { status, message },
      } = await userCommonService.updateUser({
        userId: auth.user.id,
        updateData: formData,
      });
      if (status === "OK") {
        toast.success("Chỉnh sửa thông tin thành công!");
        ref.current.innerText = "";
      } else {
        ref.current.innerText = message;
      }
  };

  if (isLoading || isError) return;

  return (
    <>
      <div className="border-b border-gray-400">
        <div
          className="max-w-[16rem] md:max-w-[24rem] lg:max-w-[36rem] xl:max-w-[48rem] 
        2xl:max-w-[60rem] text-center mx-auto my-[16px]"
        >
          <h1 className="text-[24px] font-bold text-black">
            Thông tin công khai
          </h1>
          <span className="text-[16px] text-black">Thêm thông tin về bạn</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-[24px] max-w-[26rem] lg:max-w-[30rem] xl:max-w-[36rem] 
        2xl:max-w-[40rem] mx-auto"
      >
        <label className="font-bold">Thông tin cơ bản:</label>
        <input
          type={"text"}
          placeholder="Họ Tên"
          className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
            transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
            focus:border-blueGray-500 focus:bg-white focus:outline-none
            focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
          {...register("name", { required: true })}
        />
        <input
          type={"text"}
          placeholder="Email"
          className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
            transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
            focus:border-blueGray-500 focus:bg-white focus:outline-none
            focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
          {...register("email", { required: true })}
        />
        <input
          type={"text"}
          placeholder="Số điện thoại"
          className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
            transition duration-500 ease-in-out transform rounded-sm bg-white border border-blue
            focus:border-blueGray-500 focus:bg-white focus:outline-none
            focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
          {...register("phone", { required: true })}
        />
        <div className="mt-2 text-red-600 text-[12px]">
          {errors.email && <span>Trường email là bắt buộc. </span>}
          {errors.ame?.type && <span>Trường họ tên là bắt buộc. </span>}
          {errors.phone?.type && (
            <span>Trường số điện thoại là bắt buộc. </span>
          )}
          <span className="text-red-600 text-[11px]" ref={ref}></span>{" "}
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

export default EditProfile;
