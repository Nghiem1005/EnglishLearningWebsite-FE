import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../../components";
import ButtonCancel from "../../../../components/Button/ButtonCancel";
import ButtonSuccess from "../../../../components/Button/ButtonSuccess";
import { thunkCourseTypes } from "../../../../constants/thunkTypes";
import { useAuth } from "../../../../contexts/authProvider";
import { useQueryCustom } from "../../../../hooks/useQueryCustom";
import { courseService } from "../../../../services/course";
import { lessonService } from "../../../../services/lesson";

const CreateLesson = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isValidTypeVideo, setIsValidTypeVideo] = useState(true);
  const [dataCreateLesson, setDataCreateLesson] = useState({
    courseId: null,
    name: "",
    document: null,
  });
  const ref = useRef();
  const messageRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
  const { isLoading: isLoadingCourses, data: dataCourses } = useQueryCustom(
    thunkCourseTypes.GETALL_COURSE,
    () =>
      courseService.getAllCourse({
        teacherId: auth.user.id,
        size: 1000,
        page: 1,
      })
  );

  const handleUploadVideo = (e) => {
    const { type } = e.target.files[0];
    if (
      type === "video/mp4" ||
      type === "video/x-matroska" ||
      type === "video/quicktime"
    ) {
      const url = URL.createObjectURL(e.target.files[0]);
      setVideoUrl(url);
      setIsValidTypeVideo(true);
      setDataCreateLesson({ ...dataCreateLesson, document: e.target.files[0] });
    } else {
      setIsValidTypeVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", dataCreateLesson.name);
    formData.append("document", dataCreateLesson.document);
    if (dataCreateLesson.courseId) {
      const { data } = await lessonService.createLesson(
        dataCreateLesson.courseId,
        formData
      );
      if (data.status === "OK") {
        messageRef.current.innerText = "";
        toast.success("Thêm lesson thành công!");
        navigate("/lesson");
      } else {
        toast.warning("Khóa học đã có bài này rồi!");
      }
    } else {
      messageRef.current.innerText = "Vui lòng chọn khóa học!";
    }
  };

  if (isLoadingCourses) return;
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
                              onChange={(e) =>
                                setDataCreateLesson({
                                  ...dataCreateLesson,
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
                            onChange={(e) =>
                              setDataCreateLesson({
                                ...dataCreateLesson,
                                courseId: e.target.value,
                              })
                            }
                            defaultValue={"default"}
                          >
                            <option value="default" disabled>
                              Chọn khóa học
                            </option>
                            {dataCourses.data.data.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
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
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Tải video</span> hoặc
                              kéo thả tại đây
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
                    <span
                      className="text-red-600 text-[12px] mt-2 block"
                      ref={messageRef}
                    ></span>{" "}
                  </div>
                  <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                    <Link to="/management/products">
                      <ButtonCancel content={"Hủy"} />
                    </Link>
                    <ButtonSuccess content={"Lưu"} type={"submit"} />
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

export default CreateLesson;
