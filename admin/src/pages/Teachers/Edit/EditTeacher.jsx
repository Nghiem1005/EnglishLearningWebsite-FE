import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components";
import {
  thunkCourseTypes,
  thunkTeacherTypes,
} from "../../../constants/thunkTypes";
import { useQueryCustom } from "../../../hooks/useQueryCustom";
import { courseService } from "../../../services/course";
import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import { useForm } from "react-hook-form";
import { teacherService, userCommonService } from "../../../services/user";

const EditTeacher = () => {
  const [dataUpdateTeacher, setDataUpdateTeacher] = useState({
    description: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [isValidTypeVideo, setIsValidTypeVideo] = useState(true);
  const ref = useRef();
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const {
    isLoading: isLoadingCourseByTeacher,
    data: dataCourseByTeacher,
    refetch: rCourseByTeacher,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE_BY_TEACHER, () =>
    courseService.getAllCourseByTeacher({ teacherId, size: 1000, page: 1 })
  );

  const {
    isLoading: isLoadingTeacher,
    data: dataTeacher,
    refetch: r1,
  } = useQueryCustom(thunkTeacherTypes.GET_TEACHER, () =>
    userCommonService.getUser({ userId: teacherId })
  );

  useEffect(() => {
    r1();
    rCourseByTeacher();
  }, []);

  useEffect(() => {
    if (
      !!dataTeacher?.data?.data &&
      !!dataCourseByTeacher?.data?.data
    ) {
      setDataUpdateTeacher({...dataUpdateTeacher, image: dataTeacher.data.data.image});
      setImageUrl(dataTeacher.data.data.image);
      setValue("name", dataTeacher.data.data.name);
      setValue("phone", dataTeacher.data.data.phone);
      setValue("email", dataTeacher.data.data.email);
      setValue("enable", dataTeacher.data.data.enable ? "1" : "2");
      setValue(
        "courses",
        dataCourseByTeacher.data.data.reduce(
          (acc, value) => [...acc, String(value.id)],
          []
        )
      );
    }
  }, [dataTeacher, dataCourseByTeacher]);

  const handleUploadImage = (e) => {
    const { type } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      setDataUpdateTeacher({
        ...dataUpdateTeacher,
        image: e.target.files[0],
      });
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      setIsValidTypeVideo(true);
    } else {
      setIsValidTypeVideo(false);
    }
  };

  const onSubmit = async (form) => {
    try {
      const { phone, email, courses, enable, name } = form;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("enable", enable === "1" ? true : false);
      if(typeof dataUpdateTeacher.image !== 'string') {
       formData.append("image", dataUpdateTeacher.image);

      }
      formData.append("description", dataUpdateTeacher.description);
      for (const course of courses) {
        formData.append("course", course);
      }
      const { data } = await teacherService.updateTeacher({
        teacherId,
        updateData: formData,
      });
      if (data.status === "OK") {
        toast.success("Chỉnh sửa thông tin giảng viên thành công!");
        navigate("/teacher", { replace: true });
      } else {
        toast.error("Có lỗi!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi!");
    }
  };

  if (isLoadingTeacher || isLoadingCourseByTeacher) return;

  return (
    <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header title="Giảng viên" category="Chỉnh sửa thông tin" />
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
                            Tên giảng viên
                            <div>
                              <input
                                id="title"
                                name="title"
                                rows={3}
                                required
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
                                disabled
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
                                required
                                className={`w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Số điện thoại"
                                {...register("phone", { required: true })}
                              />
                            </div>
                          </label>
                          <label className="block text-sm font-medium text-gray-700 mt-2">
                            Trạng thái giảng viên
                            <select
                              {...register("enable", { required: true })}
                              className={`block w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] focus:outline-none sm:text-sm`}
                            >
                              <option disabled value={"default"}>
                                Chọn trạng thái giảng viên
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
                            <div className="relative w-full border-2 border-gray-300 border-dashed rounded-lg p-[4px]">
                              <img
                                className="h-[312px] w-full object-contain"
                                controls
                                src={imageUrl}
                              />
                              <div
                                className="absolute top-[10px] right-[20px] cursor-pointer"
                                onClick={() => {
                                  setImageUrl(null);
                                  setIsValidTypeVideo(true);
                                }}
                              >
                                <BsFillTrashFill className="w-10 h-10 text text-red-800" />
                              </div>
                            </div>
                          ) : (
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-[312px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                                {!isValidTypeVideo ? (
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
                      {/* <label className="block text-sm font-medium text-gray-700">
                        Khóa học đang phụ trách
                        <div className="text-[12px] text-[#03c9d7]">
                          *Dùng control click để có thể chọn được nhiều khóa
                          học.
                        </div>
                        <select
                          {...register("courses", { required: true })}
                          id="category"
                          multiple
                          className={`mt-1 block h-[160px] w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] focus:outline-none sm:text-sm`}
                        >
                          <option value="default" disabled>
                            Chọn Khóa học
                          </option>
                          {dataCourses.map((item) => (
                            <option
                              key={item?.id}
                              value={item?.id}
                              selected={dataCourseByTeacher?.data?.data?.some(
                                (course) => course.id === item?.id
                              )}
                            >
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      </label> */}
                      {/* <div className="text-[16px]">
                        Khóa học đang phụ trách:
                        {watch("courses")
                          ? dataCourseByTeacher?.data?.data?.map((course) =>
                              Object.values(watch("courses")).some(
                                (courseId) => courseId === String(course?.id)
                              ) ? (
                                <span className=" inline-block text-[14px] mx-2 my-1 bg-gray-200 py-[4px] px-[6px] rounded-sm">
                                  {course?.name}
                                </span>
                              ) : null
                            )
                          : null}
                      </div> */}
                      <div className="text-[16px]">
                        Khóa học đang phụ trách:
                        {watch("courses")?.length > 0
                          ? dataCourseByTeacher?.data?.data?.map((course) => (
                              <span className=" inline-block text-[14px] mx-2 my-1 bg-gray-200 py-[4px] px-[6px] rounded-sm" key={course.id}>
                                {course?.name}
                              </span>
                            ))
                          : <span className=" inline-block text-[14px] mx-2 my-1 py-[4px] px-[6px] rounded-sm">
                          Chưa phụ trách khóa học nào
                        </span>}
                      </div>
                    </div>
                    <div>
                      <label className="block sm:text-sm font-medium text-gray-700">
                        Chi tiết giảng viên
                        <RichTextEditorComponent
                          height={200}
                          value={dataUpdateTeacher.description}
                          change={(e) => {
                            setDataUpdateTeacher({
                              ...dataUpdateTeacher,
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
                  </div>
                  <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Link
                      to="/teacher"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Hủy
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Lưu
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

export default EditTeacher;
