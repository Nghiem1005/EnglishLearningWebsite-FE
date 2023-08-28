import React, { useState, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components";
import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import { useForm } from "react-hook-form";
import {
  studentService,
} from "../../../services/user";

const CreateStudent = () => {
  const [dataCreateStudent, setDataCreateStudent] = useState({
    description: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [isValidTypeImage, setIsValidTypeImage] = useState(true);
  const ref = useRef();
  const messageRef = useRef();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUploadImage = (e) => {
    const { type } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      setDataCreateStudent({
        ...dataCreateStudent,
        image: e.target.files[0],
      });
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      setIsValidTypeImage(true);
    } else {
      setIsValidTypeImage(false);
    }
  };

  const onSubmit = async (form) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { name, phone, password, email, confirm_password, enable } = form;
    if (password !== confirm_password) {
      messageRef.current.innerText = "Mật khẩu và xác nhận mật khẩu không khớp";
    } else if (!password.match(format)) {
      messageRef.current.innerText =
        "Mật khẩu phải bao gồm kí chữ thường, chữ hoa, kí tự đặc biệt, số";
    } else {
      messageRef.current.innerText = "";
      const formData = new FormData();
      formData.append("image", dataCreateStudent.image);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("role", 3);
      formData.append("enable", enable === "1" ? true : false);
      formData.append("description", dataCreateStudent.description);
      const {
        data: { status, message },
      } = await studentService.createStudent({ formData });
      if (status === "OK") {
        messageRef.current.innerText = "";
        toast.success("Thêm học viên thành công!");
        navigate('/student')
      } else {
        toast.error("Có lỗi!");
        messageRef.current.innerText = message;
      }
    }
  };

  return (
    <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header title="Học viên" category="Thêm thông tin" />
      </div>
      <div className="flex justify-center items-center bg-gray-50 ">
        <div className="w-full">
          <div>
            <div className="mt-1 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white p-6">
                    <div className="flex items-end flex-col md:flex-row gap-x-4">
                      <div className="px-6 py-2 w-full rounded-xl border border-gray-200 flex flex-col gap-2 flex-1">
                        <div>
                          <h1 className="font-bold mb-3">Thông tin cơ bản</h1>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-1"
                          >
                            Tên học viên
                            <div>
                              <input
                                id="title"
                                name="title"
                                rows={3}
                                className={`w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Tên khóa học"
                                {...register("name", { required: true })}
                              />
                            </div>
                          </label>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Email
                            <div>
                              <input
                                id="title"
                                name="title"
                                rows={3}
                                className={`w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Email"
                                {...register("email", { required: true })}
                              />
                            </div>
                          </label>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Số điện thoại
                            <div>
                              <input
                                id="title"
                                name="title"
                                rows={3}
                                className={`w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Số điện thoại"
                                {...register("phone", { required: true })}
                              />
                            </div>
                          </label>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Mật khẩu
                            <div>
                              <input
                                type={"password"}
                                id="title"
                                name="title"
                                rows={3}
                                className={`w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Mật khẩu"
                                {...register("password", {
                                  required: true,
                                  minLength: 6,
                                  maxLength: 12,
                                })}
                              />
                            </div>
                          </label>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-2"
                          >
                            Xác thực mật khẩu
                            <div>
                              <input
                                type={"password"}
                                id="title"
                                name="title"
                                rows={3}
                                className={`w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Xác thực mật khẩu"
                                {...register("confirm_password", {
                                  required: true,
                                })}
                              />
                            </div>
                          </label>
                          <label className="block text-sm font-medium text-gray-700 mt-2">
                            Trạng thái học viên
                            <select
                              {...register("enable", { required: true })}
                              className={`block w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] focus:outline-none sm:text-sm`}
                            >
                              <option disabled value={"default"}>
                                Chọn trạng thái học viên
                              </option>
                              <option value={"1"}>Hoạt động</option>
                              <option value={"2"}>Ngừng hoạt động</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="md:flex-1 w-full">
                        <label>Ảnh đại diện</label>
                        <div className="flex items-center justify-center w-full overflow-hidden">
                          {imageUrl ? (
                            <div className="relative h-[312px] w-full border-2 border-gray-300 border-dashed rounded-lg p-[4px]">
                              <img
                                className="h-[166px ] object-contain"
                                controls
                                src={imageUrl}
                              />
                              <div
                                className="absolute top-[10px] right-[20px] cursor-pointer"
                                onClick={() => {
                                  setImageUrl(null);
                                  setIsValidTypeImage(true);
                                }}
                              >
                                <BsFillTrashFill className="w-10 h-10 text text-red-800" />
                              </div>
                            </div>
                          ) : (
                            <label
                              for="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-[444px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Tải ảnh</span>{" "}
                                  hoặc kéo thả tại đây
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PNG, JPEG, JPG (MAX. 800x400px)
                                </p>
                                {!isValidTypeImage ? (
                                  <p className="text-xs text-red-600 dark:text-gray-400">
                                    Định dạng ảnh không hợp lệ.
                                  </p>
                                ) : null}
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                ref={ref}
                                onChange={handleUploadImage}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block sm:text-sm font-medium text-gray-700">
                        Chi tiết học viên
                        <RichTextEditorComponent
                          height={200}
                          value={dataCreateStudent.description}
                          change={(e) => {
                            setDataCreateStudent({
                              ...dataCreateStudent,
                              description: e.value,
                            });
                          }}
                        >
                          <Inject
                            services={[
                              HtmlEditor,
                              Toolbar,
                              Image,
                              QuickToolbar,
                            ]}
                          />
                        </RichTextEditorComponent>
                      </label>
                    </div>
                    <div className="mt-1 text-red-600 text-[12px]">
                      {errors.name && <span>Trường họ tên là bắt buộc. </span>}
                      {errors.phone && (
                        <span>Trường số điện thoại là bắt buộc. </span>
                      )}
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
                      <span
                        className="text-red-600 text-[12px]"
                        ref={messageRef}
                      ></span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Link
                      to="/course"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Hủy
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Đồng ý
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
