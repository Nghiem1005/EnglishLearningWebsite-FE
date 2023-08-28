import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaErlang } from "react-icons/fa";
import { useAuth } from "../../contexts/authProvider";
import { apiLoginUrl } from "../../constants/apiTypes";
import { useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import { userService } from "../../services/user";
import { useLocationQuery } from "../../hooks";

const Login = () => {
  const { setAuthUI } = useStateContext();
  const [forgotPassword, setForgotPassword] = useState(false);
  const auth = useAuth();
  const ref = useRef();
  const messageRef = useRef();
  const navigate = useNavigate();
  const query = useLocationQuery();
  const token = query.get("token");
  const refreshToken = query.get("refreshToken");
  const userId = query.get("userId");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setAuthUI(true);
    return () => {
      setAuthUI(false);
    };
  }, []);

  useEffect(() => {
    if (refreshToken && token && userId) {
      const dataAuthenUser = { refreshToken, accessToken: token, id: userId };
      localStorage.setItem("user", JSON.stringify(dataAuthenUser));
      auth.loginWithThirdParty({ dataAuthenUser });
      navigate("/");
    }
  }, [refreshToken, token, userId]);

  const onSubmit = async (formData) => {
    if (forgotPassword) {
      messageRef.current.innerText = "";
      const response = await userService.sendResetPassword({
        email: formData.email,
      });
      if (response.status === 200) {
        ref.current.innerText = "";
        messageRef.current.innerText =
          "Mật khẩu mới đã được gửi tới email của bạn. Vui lòng kiểm tra!";
      } else {
        ref.current.innerText = "Email không đúng!.";
      }
    } else {
      messageRef.current.innerText = "";
      const data = await auth.loginUser({ ...formData, role: "STUDENT" });
      console.log(data?.message);
      if (!!data) {
        if (data?.message === "User is disabled") {
          messageRef.current.style.color = "red";
          messageRef.current.innerText =
            "Tài khoản không có quyền truy cập hoặc đã bị khóa. Hoặc tài khoản chưa được kích hoạt. Vui lòng kiểm tra email";
        } else if (data?.message === "Bad credentials") {
          ref.current.innerText = "";
          messageRef.current.style.color = "red";
          messageRef.current.innerText =
          "Tài khoản hoặc mật khẩu không chính xác";
        } else if (data?.status === "OK") {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        }
      } 
    }
  };

  const loginWithGoogle = async () => {
    ref.current.href = apiLoginUrl.LOGIN_GOOGLE_URL;
    ref.current.click();
  };

  const loginWithFacebook = async () => {
    ref.current.href = apiLoginUrl.LOGIN_FACEBOOK_URL;
    ref.current.click();
  };

  return (
    <div
      className={`${
        forgotPassword ? "py-40" : "py-10"
      } h-full bottom-0 bg-gradient-to-br from-sky-50 to-gray-200 z-1000`}
    >
      <div className="relative container m-auto px-1 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <div className="flex items-center gap-x-1">
                  <FaErlang className="text-black block" size={50} />
                  <span className="font-bold text-black text-[30px]">
                    E-Academy
                  </span>
                </div>
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Đăng nhập để trải nghiêm <br /> những thứ tốt nhất của
                  E-Academy.
                </h2>
              </div>
              <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="font-bold text-lg">
                  {forgotPassword ? "Đặt lại mật khẩu" : "Đăng nhập"}
                </div>
                {forgotPassword ? (
                  <span className="text-[12px] text-gray-600">
                    Đường dẫn reset mật khẩu sẽ được gửi tới email của bạn. Vui
                    lòng kiểm tra email.
                  </span>
                ) : null}
                <input
                  placeholder="Email"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                  transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 
                  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                  focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-[10px] text-red mt-1 block">
                    Trường email là bắt buộc.
                  </span>
                )}
                {forgotPassword ? null : (
                  <>
                    <input
                      type={"password"}
                      placeholder="Password"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                      transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                      focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                      focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-[10px] text-red mt-1 block">
                        Trường password là bắt buộc.
                      </span>
                    )}
                  </>
                )}
                <span
                  className="text-[10px] text-red mt-1 block"
                  ref={ref}
                ></span>
                <button
                  type="submit"
                  className="mt-3 text-lg font-semibold 
                  from-gray-800 bg-gray-500
                    bg-gradient-to-r w-full text-white rounded-lg
                    px-6 py-3 block shadow-xl hover:text-white hover:bg-slate-400 duration-300"
                >
                  {forgotPassword ? "Xác nhận" : "Đăng nhập"}
                </button>
              </form>
              <span
                className="text-[12px] text-green-600 mt-4 block"
                ref={messageRef}
              ></span>
              {forgotPassword ? (
                <span
                  className=" mt-4 flex items-center text-sm underline cursor-pointer"
                  onClick={() => {
                    setForgotPassword(false);
                    ref.current.innerText = "";
                  }}
                >
                  <IoIosArrowRoundBack />
                  Quay lại
                </span>
              ) : (
                <>
                  <div className="mt-6 flex items-center justify-end">
                    <span
                      className="text-sm underline cursor-pointer"
                      onClick={() => {
                        setForgotPassword(true);
                        ref.current.innerText = "";
                      }}
                    >
                      Quên mật khẩu ?
                    </span>
                  </div>
                  <div className="mt-5 text-gray-400">
                    <p className="text-[12px]">
                      Bạn chưa có tài khoản ?{" "}
                      <Link to={"/register"}>
                        <span className="underline cursor-pointer">
                          Đăng kí tại đây
                        </span>
                      </Link>
                      .
                    </p>
                  </div>
                  <div className=" mt-2 w-full flex items-center justify-between">
                    <span className="border-t w-6/12"></span>
                    <span className="px-4">Or</span>
                    <span className="border-t w-6/12"></span>
                  </div>
                  {/* <div className="mt-4 flex flex-col space-y-4">
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                      hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                      onClick={() => loginWithGoogle()}
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <img
                          src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                          className="absolute left-0 w-5"
                          alt="google logo"
                        />
                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                          Đăng nhập với Google
                        </span>
                      </div>
                    </button>
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                        hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                      onClick={() => loginWithFacebook()}
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                          className="absolute left-0 w-5"
                          alt="Facebook logo"
                        />
                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                          Đăng nhập với Facebook
                        </span>
                      </div>
                    </button>
                  </div> */}
                </>
              )}
            </div>
            <div className="mt-1 flex justify-center text-center mx-4 text-gray-400">
              <p className="text-[12px]">
                Đồng ý với các điều khoản{" "}
                <a className="underline" href="">
                  Privacy Policy
                </a>{" "}
                và{" "}
                <a className="underline" href="">
                  Terms of Service
                </a>{" "}
                cung cấp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
