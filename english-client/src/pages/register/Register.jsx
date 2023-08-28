import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { authService } from "../../services/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const { setAuthUI } = useStateContext();
  const ref = useRef();
  const confirmRef = useRef();
  const messageRef = useRef();
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

  const onSubmit = async (form) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { first_name, last_name, phone, password, email, confirm_password } =
      form;
    if (password !== confirm_password) {
      ref.current.innerText = "";
      confirmRef.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!password.match(format)) {
      confirmRef.current.innerText = "";
      ref.current.innerText =
        "Mật khẩu phải bao gồm kí chữ thường, chữ hoa, kí tự đặc biệt, số";
    } else {
      confirmRef.current.innerText = "";
      ref.current.innerText = "";
      const formData = new FormData();
      formData.append("name", `${first_name + " " + last_name}`);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("role", "STUDENT");
      const {
        data: { status, message },
      } = await authService.register(formData);
      if (status === "OK") {
        setIsRegisterSuccess(true);
      } else {
        messageRef.current.innerText = message;
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
    <div className=" h-full bottom-0 py-10 bg-gradient-to-br from-sky-50 to-gray-200 z-1000">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
              }}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Đăng kí tài khoản!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0 md:w-6/12">
                    <label
                      className="block mb-0 text-sm font-bold text-gray-700"
                      for="firstName"
                    >
                      Họ
                    </label>
                    <input
                      type={"text"}
                      placeholder="Họ"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                        transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                        focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                        focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      {...register("first_name", { required: true })}
                    />
                    {errors.first_name?.type === "required" && (
                      <p className="text-xs italic text-red mt-1">
                        Trường first name không được bỏ trống.
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2 md:w-6/12">
                    <label
                      className="block text-sm font-bold text-gray-700"
                      for="lastName"
                    >
                      Tên
                    </label>
                    <input
                      type={"text"}
                      placeholder="Tên"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                        transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                        focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                        focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      {...register("last_name", { required: true })}
                    />
                    {errors.last_name?.type === "required" && (
                      <p className="text-xs italic text-red mt-1">
                        Trường last name không được bỏ trống.
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    type={"email"}
                    placeholder="Email"
                    className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                      transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                      focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                      focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-xs italic text-red mt-1">
                      Trường email không được bỏ trống.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    for="email"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type={"text"}
                    placeholder="Số điện thoại"
                    className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                      transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                      focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                      focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone?.type === "required" && (
                    <p className="text-xs italic text-red mt-1">
                      Trường phone không được bỏ trống.
                    </p>
                  )}
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0 md:w-6/12">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      type={"password"}
                      placeholder="***************"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                        transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                        focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                        focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 12,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-xs italic text-red mt-1">
                        Trường mật khẩu không được bỏ trống.
                      </p>
                    )}
                    {errors.password?.type === "maxLength" ||
                      (errors.password?.type === "minLength" && (
                        <p className="text-xs italic text-red mt-1">
                          Mật khẩu từ 6 đến 12 kí tự.
                        </p>
                      ))}
                    <p className="text-xs italic text-red mt-1" ref={ref}></p>
                  </div>
                  <div className="md:ml-2 md:w-6/12">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="c_password"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type={"password"}
                      placeholder="************"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   
                        transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  
                        focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                        focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      {...register("confirm_password", { required: true })}
                    />
                    {errors.confirm_password?.type === "required" && (
                      <p className="text-xs italic text-red mt-1">
                        Trường xác thực không được bỏ trống.
                      </p>
                    )}
                    <p
                      className="text-xs italic text-red mt-1"
                      ref={confirmRef}
                    ></p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 md:font-sans text-xs text-gray-800">
                  <input
                    type="checkbox"
                    className="inline-block border-0 "
                    {...register("checkbox", { required: true })}
                  />
                  <span display="inline" className="">
                    Đồng ý với các điều khoản{" "}
                    <a
                      className="text-cyan-600"
                      href="/s/terms"
                      target="_blank"
                      data-test="Link"
                    >
                      <span className="underline ">Terms and Conditions</span>{" "}
                    </a>{" "}
                    and{" "}
                    <a
                      className="text-cyan-600"
                      href="/s/privacy"
                      target="_blank"
                      data-test="Link"
                    >
                      <span className="underline">Privacy Policy</span>.
                    </a>
                  </span>
                </div>
                {errors.checkbox && (
                  <p className="text-xs italic text-red mt-1">
                    Bạn chưa đồng ý với điều khoản và chính sách của chúng tôi!
                  </p>
                )}
                <div className="mb-6 text-center">
                  <button
                    className="mt-3 text-lg font-semibold 
                  from-gray-500 bg-gray-800
                    bg-gradient-to-r w-full text-white rounded-lg
                    px-6 py-3 block shadow-xl hover:text-white hover:bg-slate-400 duration-300"
                  >
                    Đăng kí
                  </button>
                </div>
                <p
                  className="text-xs italic text-red mt-1"
                  ref={messageRef}
                ></p>
                {isRegisterSuccess ? (
                  <p className="text-xs italic text-cyan-600 mt-1">
                    Đăng kí thành công. Vui lòng <Link className="underline font-bold" to={"/login"}>đăng nhập</Link>{" "}
                    lại.
                  </p>
                ) : null}
                <div className="mt-5 text-gray-400">
                  <p className="text-[12px]">
                    Bạn đã tài khoản ?{" "}
                    <Link to={'/login'} className="underline cursor-pointer">
                      Đăng nhập tại đây
                    </Link>
                    .
                  </p>
                </div>
              </form>
              <div className="mt-1 flex justify-center text-center text-gray-400">
                <p className="text-[12px]">
                  Website thuộc quyền sở hữu bởi E-Academy{" "}
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
    </div>
  );
};

export default Register;
