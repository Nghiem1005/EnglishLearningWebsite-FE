import React, { useEffect, useState, useRef } from "react";
import { BsTelephoneForwardFill, BsFillShieldLockFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { teacherService } from "../../services/user";

const FormRegister = () => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const { setShowUI } = useStateContext();
  const ref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setShowUI(false);
    return () => {
      setShowUI(true);
    };
  }, []);

  const onSubmit = async (form) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { name, phone, password, email, confirm_password } = form;
    if (password !== confirm_password) {
      ref.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!password.match(format)) {
      ref.current.innerText =
        "Mật khẩu phải bao gồm kí chữ thường, chữ hoa, kí tự đặc biệt, số";
    } else {
      ref.current.innerText = "";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("role", "TEACHER");
      const {
        data: { status, message },
      } = await teacherService.createTeacher(formData);
      if (status === "OK") {
        ref.current.innerText = "";
        setIsRegisterSuccess(true);
      } else {
        ref.current.innerText = message;
      }
    }
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-full md:w-1/2 p-4 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Điều khoản, Quy định
          </h1>
          <p className="text-white mt-1 text-[12px]">
            <span className="text-red-600">*</span> Giảng viên phải thật sự tâm
            huyết với nghề.
          </p>
          <p className="text-white mt-1 text-[12px]">
            <span className="text-red-600">*</span> Không mang tài liệu của công
            ty mang ra ngoài phạm vi công ty với mục đích riêng. Nếu phát hiện
            sẽ xử lí theo quy định pháp luật.
          </p>
          <p className="text-white mt-1 text-[12px]">
            <span className="text-red-600">*</span> Cam kết bảo mật thông tin
            công ty.
          </p>
          <p className="text-white mt-1 text-[12px]">
            <span className="text-red-600">*</span> Không mang tài liệu của công
            ty mang ra ngoài phạm vi công ty với mục đích riêng. Nếu phát hiện
            sẽ xử lí theo quy định pháp luật.
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-1 rounded-xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="flex md:w-1/2 py-10 items-center bg-white">
        {isRegisterSuccess ? (
          <div className="flex flex-col justify-start mx-10">
            <h1 className="text-gray-800 font-bold text-2xl mb-1 underline">
              Gửi thông tin thành công!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-1">
              Send your information successfully!
            </p>
            <p className="text-[10px] font-normal text-red-600 mb-7">
              *Đơn của bạn đang trong quá trình phê duyệt.
            </p>
          </div>
        ) : (
          <form
            className="bg-white w-full px-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Chào mừng bạn đến với gia đình giảng viên E-Academy
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-1">
              Welcome to the E-Academy faculty family
            </p>
            <p className="text-[10px] font-normal text-red-600 mb-7">
              *Hãy tìm hiểu các quy định phía bên trái
            </p>
            <div className="flex items-center border-2 py-4 px-3 rounded-2xl mb-4">
              <FaUserTie className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                placeholder="Họ tên"
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex items-center border-2 py-4 px-3 rounded-2xl mb-4">
              <MdAlternateEmail className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex items-center border-2 py-4 px-3 rounded-2xl mb-4">
              <BsTelephoneForwardFill className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                placeholder="Số điện thoại"
                {...register("phone", { required: true })}
              />
            </div>
            <div className="flex items-center border-2 py-4 px-3 rounded-2xl mb-4">
              <BsFillShieldLockFill className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                placeholder="Mật khẩu"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>
            <div className="flex items-center border-2 py-4 px-3 rounded-2xl">
              <BsFillShieldLockFill className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                placeholder="Xác thực mật khẩu"
                {...register("confirm_password", { required: true })}
              />
            </div>
            <div className="flex items-center gap-x-2 py-5 md:font-sans text-xs text-gray-800">
              <input
                type="checkbox"
                className="inline-block border-0 "
                {...register("checkbox", { required: true })}
              />
              <span display="inline" className="">
                Đồng ý với các điều khoản{" "}
                <a
                  className=""
                  href="/s/terms"
                  target="_blank"
                  data-test="Link"
                >
                  <span className="underline ">Terms and Conditions</span>{" "}
                </a>{" "}
                and{" "}
                <a
                  className=""
                  href="/s/privacy"
                  target="_blank"
                  data-test="Link"
                >
                  <span className="underline">Privacy Policy</span>.{" "}
                </a>
              </span>
            </div>
            <div className="mt-1 text-red-600 text-[12px]">
              {errors.name && <span>Trường họ tên là bắt buộc. </span>}
              {errors.phone && <span>Trường số điện thoại là bắt buộc. </span>}
              {errors.email && <span>Trường email là bắt buộc. </span>}
              {errors.password?.type === "minLength" && (
                <span>Mật khẩu ít nhất 6 kí tự. </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span>Mật khẩu không quá 12 kí tự. </span>
              )}
              {errors.password?.type === "required" && (
                <span>Trường mật khẩu là bắt buộc. </span>
              )}
              {errors.confirmpwd && (
                <span>Trường xác nhận mật khẩu là bắt buộc. </span>
              )}
              {errors.checkbox && (
                <span>
                  Bạn chưa đồng ý với điều khoản và chính sách của chúng tôi!{" "}
                </span>
              )}
              <span className="text-red-600 text-[12px]" ref={ref}></span>{" "}
            </div>
            <button className="bg-indigo-600 cursor-pointer block w-full  mt-4 py-4 rounded-2xl text-white font-semibold mb-2">
              Đăng kí
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormRegister;
