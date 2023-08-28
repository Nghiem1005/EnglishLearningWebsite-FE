import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useStateContext } from "../../contexts/ContextProvider";
import { useAuth } from "../../contexts/authProvider";
import { userCommonService } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const { setShowUI } = useStateContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const ref = useRef();
  const messageRef = useRef();
  let timeId;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setShowUI(false);
    return () => {
      if (timeId) {
        clearTimeout(timeId);
      }
      setShowUI(true);
    };
  }, []);

  const onSubmit = async (form) => {
    if (forgotPassword) {
      ref.current.innerText = "";
      const response = await userCommonService.sendResetPassword({
        email: form.email,
      });
      if (response.status === 200) {
        ref.current.innerText = ""
        messageRef.current.innerText =
          "Mật khẩu mới đã được gửi tới email của bạn. Vui lòng kiểm tra!";
      } else {
        messageRef.current.innerText = ""
        ref.current.innerText = "Email không đúng!.";
      }
    } else {
      messageRef.current.innerText = "";
      try {
        const data = await auth.loginUser({ ...form, role: "TEACHER" });
       if (data?.message === "User is disabled") {
          messageRef.current.style.color = "red";
          messageRef.current.innerText =
            "Tài khoản không có quyền truy cập hoặc đã bị khóa. Hoặc tài khoản chưa được kích hoạt. Vui lòng kiểm tra email";
        } else if (data?.message === "Bad credentials") {
          ref.current.innerText = "";
          messageRef.current.style.color = "red";
          messageRef.current.innerText =
          "Tài khoản hoặc mật khẩu không chính xác";
        } else {
        localStorage.setItem("teacher_detail", JSON.stringify(data.data));
        timeId = setTimeout(() => {
          toast.success(`Chào mừng bạn quay trở lại <3`)
          navigate("/", { replace: true });
        }, 1000);
      }
      } catch (error) {
        messageRef.current.innerText = ""
        ref.current.innerText = "Mật khẩu không chính xác.";
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-contain bg-repeat"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/fotos-premium/fundo-de-superficie-aquarela-cinza-claro_145343-581.jpg?w=360)",
      }}
    >
      <div className="w-full sm:max-w-md py-10 px-5 mx-auto container bg-white rounded-[8px]">
        {forgotPassword ? (
          <>
            <h2 className="mb-6 text-center text-3xl font-extrabold">
              Quên mật khẩu
            </h2>
            <span className="text-[12px] text-gray-600">
              Đường dẫn reset mật khẩu sẽ được gửi tới email của bạn. Vui lòng
              kiểm tra email.
            </span>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-center text-3xl font-extrabold">Chào mừng</h2>
            <p className="text-[13px] text-gray-800">Ứng dụng quản lí E-Academy</p>
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1" for="email">
              Email
            </label>
            <input
              type="text"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              {...register("email", { required: true })}
            />
          </div>
          {forgotPassword ? null : (
            <div className="mb-4">
              <label className="block mb-1" for="password">
                Mật khẩu
              </label>
              <input
                type="password"
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                {...register("password", { required: true })}
              />
            </div>
          )}
          <div className="mt-1 text-red-600 text-[12px]">
            {errors.email && <span>Trường email là bắt buộc. </span>}
            {errors.new_password?.type === "minLength" && (
              <span>Mật khẩu ít nhất 6 kí tự. </span>
            )}
            {errors.new_password?.type === "maxLength" && (
              <span>Mật khẩu không quá 12 kí tự. </span>
            )}
            {errors.new_password?.type === "required" && (
              <span>Trường mật khẩu là bắt buộc. </span>
            )}
            {errors.confirmpwd && (
              <span>Trường xác nhận mật khẩu là bắt buộc. </span>
            )}
            {errors.password && <span>Trường mật khẩu là bắt buộc. </span>}
            <span className="text-red-600 text-[12px]" ref={ref}></span>
            <span className="text-cyan-600 text-[12px]" ref={messageRef}></span>
          </div>
          {forgotPassword ? (
            <>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                >
                  Xác nhận
                </button>
              </div>
              <span
                className=" mt-4 flex items-center text-sm underline cursor-pointer"
                onClick={() => {
                  ref.current.innerText = ''
                  messageRef.current.innerText = ''
                  setForgotPassword(false)
                }}
              >
                <IoIosArrowRoundBack />
                Quay lại
              </span>
            </>
          ) : (
            <>
              <div className="mt-6 flex items-center justify-end">
                <span
                  className="text-sm underline cursor-pointer"
                  onClick={() => {
                    ref.current.innerText = ''
                    messageRef.current.innerText = ''
                    setForgotPassword(true)
                  }}
                >
                  Quên mật khẩu ?
                </span>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                >
                  Đăng nhập
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
