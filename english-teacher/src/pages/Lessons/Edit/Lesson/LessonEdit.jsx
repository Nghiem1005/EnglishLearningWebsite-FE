import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../../components";
import {
  thunkCourseTypes,
  thunkLessonTypes,
} from "../../../../constants/thunkTypes";
import { useAuth } from "../../../../contexts/authProvider";
import { useQueryCustom } from "../../../../hooks/useQueryCustom";
import { courseService } from "../../../../services/course";
import { lessonService } from "../../../../services/lesson";
import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";

const LessonEdit = () => {
  const [dataUpdateLesson, setDataUpdateLesson] = useState({
    courseId: null,
    courseName: "",
    document: null,
    description: "",
    id: null,
    name: "",
    teacherId: null,
    teacherName: "",
  });
  const [videoUrl, setVideoUrl] = useState(null);
  const [isValidTypeVideo, setIsValidTypeVideo] = useState(true);
  const ref = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const {
    isLoading: isLoadingLesson,
    data: dataLesson,
    refetch: r1,
  } = useQueryCustom(thunkLessonTypes.GET_LESSON, () =>
    lessonService.getLesson(lessonId)
  );
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch: r2,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({ teacherId: auth.user.id, page: 1, size: 1000 })
  );

  useEffect(() => {
    if (dataLesson) {
      setDataUpdateLesson(dataLesson.data.data);
      setVideoUrl(dataLesson.data.data.document);
    }
  }, [dataLesson]);

  const handleUploadVideo = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "video/mp4" ||
      type === "video/x-matroska" ||
      type === "video/quicktime"
    ) {
      setDataUpdateLesson({ ...dataUpdateLesson, document: e.target.files[0] });
      const url = URL.createObjectURL(e.target.files[0]);
      setVideoUrl(url);
      setIsValidTypeVideo(true);
    } else {
      setIsValidTypeVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", dataUpdateLesson.name);
    formData.append("description", dataUpdateLesson.description);
    if (typeof dataUpdateLesson.document !== "string") {
      formData.append("video", dataUpdateLesson.document);
    }
    const { data } = await lessonService.updateLesson(lessonId, formData);
    if (data.status === "OK") {
      toast.success("Chỉnh sửa lesson thành công!");
      navigate("/lesson", { replace: true });
    } else {
      toast.error("Có lỗi!");
    }
  };

  if (isLoadingCourses || isLoadingLesson) return;

  return (
    <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <Header title="Lesson" category="Thêm buổi học mới" />
      </div>
      <div className="flex justify-center items-center bg-gray-50 ">
        <div className="w-full">
          <div>
            <div className="mt-1 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit}>
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white sm:p-6">
                    <div className="px-6 py-8 rounded-xl border border-gray-200 flex flex-col gap-2 ">
                      <div>
                        <h1 className="font-bold mb-3">Thông tin cơ bản</h1>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên bài học
                          <div className="mt-1">
                            <textarea
                              id="title"
                              name="title"
                              rows={3}
                              className={`mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] sm:text-sm p-2 focus:outline-none`}
                              placeholder="Tên bài giảng"
                              value={dataUpdateLesson.name}
                              onChange={(e) =>
                                setDataUpdateLesson({
                                  ...dataUpdateLesson,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Khóa học
                          <select
                            id="category"
                            className={`mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] focus:outline-none sm:text-sm`}
                            defaultValue={dataUpdateLesson.courseId}
                          >
                            <option value="default">Chọn khóa học</option>
                            {dataCourses?.data?.data.map((item) => (
                              <option
                                key={item.id}
                                value={item.id}
                                selected={item.id === dataUpdateLesson.courseId}
                              >
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full overflow-hidden">
                      {videoUrl ? (
                        <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-[4px]">
                          <video
                            className="VideoInput_video"
                            width="100%"
                            // height={00}
                            controls
                            src={videoUrl}
                          />
                          <div
                            className="absolute top-[10px] right-[20px] cursor-pointer"
                            onClick={() => {
                              setVideoUrl(null);
                              setIsValidTypeVideo(true);
                            }}
                          >
                            <BsFillTrashFill className="w-10 h-10 text text-red-600" />
                          </div>
                        </div>
                      ) : (
                        <label
                          for="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Tải video</span>{" "}
                              hoặc kéo thả tại đây
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              MP4, KMV, MOV (MAX. 800x400px)
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
                            onChange={handleUploadVideo}
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mô tả tiết học
                        <RichTextEditorComponent
                          placeholder="Nhập mô tả"
                          height={200}
                          value={dataUpdateLesson.description}
                          change={(e) => {
                            setDataUpdateLesson({
                              ...dataUpdateLesson,
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
                      to="/lesson"
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

export default LessonEdit;
