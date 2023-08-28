import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components";
import { thunkCourseTypes } from "../../../constants/thunkTypes";
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
import UploadFile from "../New/UploadFile";
import { useAuth } from "../../../contexts/authProvider";
import { pointCourseData } from "../../../constants/defaultData";

const EditCourse = () => {
  const [dataUpdateCourse, setDataUpdateCourse] = useState({
    documents: [],
    description: "",
    thumbnail: null,
    type: "",
    indexType: null,
    pointTarget: null,
  });
  const [documents, setDocuments] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isValidTypeVideo, setIsValidTypeVideo] = useState(true);
  const ref = useRef();
  const navigate = useNavigate();
  const auth = useAuth();
  const { courseId } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const {
    isLoading: isLoadingCourse,
    data: dataCourse,
    refetch: rCourse,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE, () =>
    courseService.getCourse({ courseId, userId: auth?.user?.id })
  );

  const {
    data: dataTypes,
    isLoading,
    isError,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE_TYPE, () =>
    courseService.getAllCourseType()
  );

  useEffect(() => {
    if (courseId) {
      rCourse();
    }
  }, [courseId]);
  useEffect(() => {
    if (!!dataCourse?.data?.data) {
      setDataUpdateCourse((prev) => {
        (prev.description = dataCourse.data.data.description),
        prev.indexType = dataTypes?.data?.indexOf(dataCourse?.data?.data?.type),
        prev.type = dataCourse?.data?.data?.type,
        prev.pointTarget = dataCourse?.data?.data?.pointTarget
          (prev.documents =
            dataCourse.data.data.document?.reduce(
              (acc, document) => [...acc, { name: document, isLoading: true }],
              []
            ) || []);
        prev.thumbnail = dataCourse.data.data?.thumbnail;
        return prev;
      });
      setDocuments((prev) => {
        prev =
          dataCourse.data.data.document?.reduce(
            (acc, document) => [...acc, { name: document, isLoading: true }],
            []
          ) || [];
        return prev;
      });
      setImageUrl(dataCourse.data.data.thumbnail);
      setValue("name", dataCourse.data.data.name);
      setValue("teacherId", dataCourse.data.data.teacher.id);
      setValue("price", dataCourse.data.data.price);
      setValue("type", dataCourse.data.data.type);
    }
  }, [dataCourse]);

  const handleUploadThumbnail = (e) => {
    const { type } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      setDataUpdateCourse({
        ...dataUpdateCourse,
        thumbnail: e.target.files[0],
      });
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      setIsValidTypeVideo(true);
    } else {
      setIsValidTypeVideo(false);
    }
  };

  const handleUploadDocuments = (e) => {
    setDataUpdateCourse((prev) => {
      prev.documents = [];
      prev.documents.push(...e.target.files);
      return prev;
    });
    setDocuments((prev) => {
      prev = [];
      prev.push(...e.target.files);
      return prev;
    });
  };

  const handleDeleteDocuments = (fileName) => {
    setDataUpdateCourse((prev) => {
      prev.documents = prev.documents.filter((file) => file.name !== fileName);
      return prev;
    });
    setDocuments((prev) => prev.filter((file) => file.name !== fileName));
  };

  const onSubmit = async (form) => {
    try {
      const { teacherId, price, name } = form;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("teacherId", teacherId);
      formData.append("description", dataUpdateCourse.description);
      formData.append("type", dataUpdateCourse.type);
      formData.append("pointTarget", dataUpdateCourse.pointTarget);
      if (typeof dataUpdateCourse.thumbnail !== "string") {
        formData.append("thumbnail", dataUpdateCourse.thumbnail);
      }
      for (const document of dataUpdateCourse.documents) {
        if ("size" in document) {
          formData.append("documents", document);
        }
      }
      const { data } = await courseService.updateCourse({
        courseId,
        updateData: formData,
      });
      if (data.status === "OK") {
        toast.success("Chỉnh sửa khóa học thành công!");
        navigate("/course", { replace: true });
      } else {
        toast.error("Có lỗi!");
      }
    } catch (error) {
      toast.error("Có lỗi!");
    }
  };

  if (isLoadingCourse || isLoading || isError) return;

  return (
    <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header title="Course" category="Chỉnh sửa khóa học" />
      </div>
      <div className="flex justify-center items-center bg-gray-50 ">
        <div className="w-full">
          <div>
            <div className="mt-1 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white p-6">
                    <div className="flex items-start flex-col md:flex-row gap-x-4">
                      <div className="px-6 py-2 rounded-xl border border-gray-200 flex flex-col gap-2 flex-1 w-full">
                        <div>
                          <h1 className="font-bold mb-3">Thông tin cơ bản</h1>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên khóa học
                            <div className="mt-1">
                              <textarea
                                id="title"
                                name="title"
                                rows={3}
                                required
                                className={`mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                                placeholder="Tên khóa học"
                                {...register("name", { required: true })}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label>Thumbnail</label>
                        <div className="flex items-center justify-center w-full overflow-hidden">
                          {imageUrl ? (
                            <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-[4px]">
                              <img
                                className="h-[166px ] object-contain"
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
                              className="flex flex-col items-center justify-center w-full h-[166px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                                    Định dạng video không hợp lệ.
                                  </p>
                                ) : null}
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                ref={ref}
                                onChange={handleUploadThumbnail}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Loại khóa học
                        <div className="text-[16px] flex flex-wrap gap-x-3 mt-">
                          {dataTypes?.data?.map((typeItem, index) => (
                            <span
                              key={typeItem}
                              className={`${
                                dataUpdateCourse.indexType === index
                                  ? "text-[#35509a] bg-[#bad3f4]"
                                  : "border-black border-[1px] hover:bg-[#e0e8ff] bg-[#eee] text-[#1e2022] hover:border-[#eee]"
                              } py-1 px-3 rounded-2xl cursor-pointer font-medium`}
                              onClick={() => {
                                setDataUpdateCourse({
                                  ...dataUpdateCourse,
                                  type: typeItem,
                                  indexType: index,
                                });
                              }}
                            >
                              #{typeItem}
                            </span>
                          ))}
                        </div>
                      </label>
                    </div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mục tiêu khóa học
                      <select
                        id="category"
                        className={`mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] focus:outline-none sm:text-sm`}
                        defaultValue={dataUpdateCourse.pointTarget}
                      >
                        <option value="default" disabled>
                          Chọn mục tiêu
                        </option>
                        {pointCourseData
                          .filter((type) => type.name === dataUpdateCourse.type)
                          .map((type) =>
                            type.data.map((typeItem) => (
                              <option
                                key={typeItem.value}
                                value={typeItem.value}
                              >
                                {typeItem.description}
                              </option>
                            ))
                          )}
                      </select>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Giá khóa học
                        <input
                          type={"number"}
                          className={`mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-2 
                            shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] 
                            focus:outline-none sm:text-sm`}
                          {...register("price", { required: true, min: 0 })}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mô tả khóa học
                        <RichTextEditorComponent
                          height={200}
                          value={dataUpdateCourse.description}
                          change={(e) => {
                            setDataUpdateCourse({
                              ...dataUpdateCourse,
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
                    <div>
                      <label>Tài liệu khóa học</label>
                      <UploadFile
                        files={documents}
                        handleUploadDocuments={handleUploadDocuments}
                        setRemoveFile={handleDeleteDocuments}
                      />
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

export default EditCourse;
