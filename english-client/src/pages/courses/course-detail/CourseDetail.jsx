import React, { useRef, useEffect, useState } from "react";
import {
  AiFillPlayCircle,
  AiFillStar,
  AiOutlineCheck,
  AiOutlineTrophy,
} from "react-icons/ai";
import { MdAirplay, MdFavoriteBorder } from "react-icons/md";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoMdInfinite } from "react-icons/io";
import { BiMobile, BiUserCheck } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import {
  thunkCourseTypes,
  thunkLessonTypes,
} from "../../../constants/thunkTypes";
import { courseService } from "../../../services/course";
import { useQueryCustom } from "../../../hooks";
import { useParams, Link } from "react-router-dom";
import { billService } from "../../../services/bill";
import { useAuth } from "../../../contexts/authProvider";
import { toast } from "react-toastify";
import { lessonService } from "../../../services/lesson";
import PreviewLesson from "./preview-lesson/PreviewLesson";
import Feedback from "./feedback/Feedback";

const CourseDetail = () => {
  const [dataPreviewLesson, setDataPreviewLesson] = useState(null);
  const [isPreviewLesson, setIsPreviewLesson] = useState(false);
  const { courseId } = useParams();
  const ref = useRef();
  const auth = useAuth();
  const {
    isLoading: isLoadingCourse,
    data: dataCourse,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE, () =>
    courseService.getCourse({
      courseId,
      userId: auth?.user?.id,
    })
  );

  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch: r2,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      size: 1000,
      page: 1,
      userId: auth?.user?.id,
    })
  );

  const {
    isLoading: isLoadingLessons,
    data: dataLessons,
    refetch: r3,
  } = useQueryCustom(thunkLessonTypes.GETALL_LESSON, () =>
    lessonService.getAllLessonByCourse({
      courseId,
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    if (courseId) {
      r1();
      r2();
      r3();
    }
  }, [courseId]);

  const handlePayment = async (course) => {
    const { data: dataRes } = await billService.paymentBillWithMoMo({
      data: {
        courseId: course.id,
        studentId: auth.user.id,
        price: course?.discountResponseDTO
          ? course.price -
            Math.floor(
              (course.price * course?.discountResponseDTO?.percent) / 100
            )
          : course.price,
        description: `Thanh toán mua khóa học ${course.name}.`,
      },
    });
    if (dataRes) {
      ref.current.href = dataRes.paymentUrl;
      ref.current.click();
    }
  };

  const handleLikeCourse = async (course) => {
    const dataForm = {
      userId: auth?.user?.id,
      courseId: course?.id,
    };
    const data = course?.like
      ? await courseService.unlikeCourse({
          ...dataForm,
        })
      : await courseService.likeCourse({
          ...dataForm,
        });
    if (data.status === "OK") {
      r1();
    }
  };

  if (isLoadingCourse || isLoadingCourses || isLoadingLessons) return;

  return (
    <>
      <div className="px-2 pb-1 lg:pb-0 md:px-0 h-auto lg:h-[315px] bg-[#1eb2a6] md:pt-[4.2rem]">
        <div className="max-w-[26rem] md:max-w-[40rem] lg:max-w-[66rem] 2xl:max-w-[80rem] mx-auto lg:ml-16 xl:ml-40 mb-10">
          <div className="relative flex flex-col">
            <div className="w-full lg:max-w-[40rem]">
              <h1 className="text-[2rem] mb-2 text-white font-bold">
                {dataCourse?.name}
              </h1>
              <span className="text-[1rem] mb-2 text-white block">
                Khóa học cải thiện kĩ năng tiếng Anh một cách hiệu quả.
                <br />
                Đảm bảo chất lượng dạy và học.
              </span>
              <div className="flex items-center gap-x-1 mb-2">
                <div className="rate text-decaYellow">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <label htmlFor="">(5.0)</label>
                </div>
                <span className="text-purple">
                  ({dataCourse?.infoCourse?.feedbackAmount.toLocaleString()}{" "}
                  đánh giá)
                </span>
                <span className="text-white">
                  {dataCourse?.infoCourse?.studentAmount.toLocaleString()} học
                  sinh
                </span>
              </div>
              <span className="text-white">
                Được phụ trách bởi{" "}
                <Link to={`/team/teacher/${dataCourse?.teacher?.id}`}>
                  <span className="underline text-decaYellow">
                    {dataCourse?.teacher.name}
                  </span>
                </Link>
              </span>
            </div>
            <div className="lg:absolute lg:right-6 xl:top-0 xl:right-0">
              <div className="max-w-full lg:max-w-[20rem] lg:bg-white lg:border lg:border-gray-200 rounded-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="relative cursor-pointer">
                  <img
                    className="rounded-t-sm"
                    src={
                      dataCourse?.thumbnail ||
                      "https://e7.pngegg.com/pngimages/879/904/png-clipart-subject-international-english-computer-icons-symbol-english-miscellaneous-blue.png"
                    }
                    alt={dataCourse?.name}
                  />
                  <div className="flex modal bg-slate-300/50 absolute left-0 top-0 w-full h-full items-center justify-center duration-1000">
                    <AiFillPlayCircle
                      className="transform duration-200 scale-100"
                      size={60}
                    />
                  </div>
                </div>
                <div className="lg:p-5 py-5">
                  {dataCourse?.discountResponseDTO ? (
                    <>
                      <h5 className="mb-2 inline-block text-3xl line-through font-bold tracking-tight text-[#ccc] lg:text-gray-900 dark:text-white mr-2">
                        ₫{dataCourse?.price.toLocaleString()}
                      </h5>
                      <h5 className="mb-2 inline-block text-3xl font-bold tracking-tight text-white lg:text-gray-900 dark:text-white">
                        ₫
                        {(
                          dataCourse.price -
                          Math.floor(
                            (dataCourse.price *
                              dataCourse?.discountResponseDTO?.percent) /
                              100
                          )
                        ).toLocaleString()}
                      </h5>
                    </>
                  ) : (
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-white lg:text-gray-900 dark:text-white">
                      ₫{dataCourse?.price.toLocaleString()}
                    </h5>
                  )}
                  <div className="flex gap-x-2">
                    {dataCourse?.isPayed ? (
                      <span className="text-center px-2 py-3 bg-[#a435f0] text-white rounded-sm font-bold w-full">
                        Đã mua
                      </span>
                    ) : (
                      <button
                        className="px-2 py-3 bg-[#a435f0] text-white rounded-sm font-bold w-full"
                        onClick={() => handlePayment(dataCourse)}
                      >
                        Thanh toán ngay
                      </button>
                    )}
                    <button
                      className={`px-4 py-3 hover:bg-[#a435f0] hover:text-white hover:border-[#a435f0] border 
                      text-black rounded-sm font-bold ${
                        dataCourse?.like
                          ? "bg-[#a435f0] border-[#a435f0]"
                          : "bg-white border-black"
                      }`}
                      onClick={() => handleLikeCourse(dataCourse)}
                    >
                      <MdFavoriteBorder
                        className={`${
                          dataCourse?.like ? "text-white" : "text-black"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="bg-white lg:bg-transparent block p-5">
                  <h5 className="text-[18px] font-bold mb-4">
                    Khóa học bao gồm:
                  </h5>
                  <ul className="flex flex-col gap-y-2">
                    <li className="flex items-start gap-x-2">
                      <MdAirplay className="align-[-4px]" />
                      {dataCourse?.infoCourse?.lessonAmount} video bài học
                    </li>
                    <li className="flex items-center gap-x-2">
                      <span>
                        <BiUserCheck />
                      </span>
                      {dataCourse?.infoCourse?.studentAmount} người dùng đang
                      học
                    </li>
                    <li className="flex items-center gap-x-2">
                      <span>
                        <BsBookmarkHeart />
                      </span>
                      {dataCourse?.infoCourse?.testAmount} lượt thích khóa học
                    </li>
                    <li className="flex items-center gap-x-2">
                      <span>
                        <HiOutlineFolderDownload />
                      </span>
                      {dataCourse?.infoCourse?.documentAmount} nguồn tài liệu
                      miễn phí
                    </li>
                    <li className="flex items-center gap-x-2">
                      <span>
                        <IoMdInfinite />
                      </span>
                      Truy cập bất cứ khi nào
                    </li>
                    <li className="flex items-center gap-x-2">
                      <span>
                        <BiMobile />
                      </span>
                      Truy cập được mọi thiết bị
                    </li>
                    <li className="flex items-start gap-x-2">
                      <span>
                        <AiOutlineTrophy />
                      </span>
                      Cấp chứng chỉ khi hoàn thành
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-0 max-w-[26rem] md:max-w-[40rem] lg:max-w-[40rem] xl:max-w-[44rem] 2xl:max-w-[54rem] mx-auto lg:ml-16 xl:ml-40 my-10">
        <div className="p-5 rounded-sm bg-white">
          <h3 className="text-[20px] font-bold mb-4">Bạn sẽ học được</h3>
          <div className="flex flex-wrap">
            <ul className="flex flex-wrap gap-x-4">
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Chỉnh những vấn đề phát âm nền tảng
              </li>
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Biết rõ bố cục bài thi IELTS
              </li>
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Nâng cao trình sử dụng ngữ pháp
              </li>
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Cải thiện kỹ thuật học từ vựng
              </li>
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Nắm bắt yêu cầu của từng phần thi
              </li>
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Tự tin thi IELTS thành công
              </li>
              <li className="w-full lg:w-[46%] flex gap-x-4 mb-4">
                <span>
                  <AiOutlineCheck
                    className="inline-block text-green-500"
                    size={20}
                  />
                </span>
                Tài liệu chọn lọc từ các giảng viên
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-bold mb-4">Mô tả khóa học</h3>
            <div className="flex flex-wrap">
              <div
                className="text-[14px]"
                dangerouslySetInnerHTML={{
                  __html: dataCourse?.description,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="p-5 mt-1 rounded-sm bg-white">
          <h3 className="text-[20px] font-bold mb-4">Nội dung khóa học</h3>
          <ul>
            {dataLessons?.data?.data?.length > 0 ? (
              dataLessons?.data?.data?.map((lesson, index) => (
                <li key={index} className="w-full flex mb-4 justify-between">
                  <span className="flex items-center gap-x-[4px]">
                    <span>
                      <AiFillPlayCircle
                        className="inline-block text-black"
                        size={20}
                      />
                    </span>
                    {lesson.name}
                  </span>
                  {index < 2
                    ? lesson.document && (
                        <span
                          className="underline text-blue-500 cursor-pointer"
                          onClick={() => {
                            setIsPreviewLesson(true);
                            setDataPreviewLesson(lesson);
                          }}
                        >
                          xem trước
                        </span>
                      )
                    : null}
                </li>
              ))
            ) : (
              <span>
                Khóa học đang trong thời gian hoàn thiện. Xin lỗi vì sự bất tiện
                này.
              </span>
            )}
          </ul>
          <PreviewLesson
            isShowModal={isPreviewLesson}
            setIsShowModal={setIsPreviewLesson}
            data={dataPreviewLesson}
          />
        </div>
        <div className="p-5 mt-1 rounded-sm bg-white">
          <h3 className="text-[20px] font-bold mb-4">Phản hồi từ học viên</h3>
          <Feedback
            courseId={courseId}
            isShowInputComment={dataCourse?.isPayed}
          />
        </div>
        <div className="py-10">
          <h5 className="text-[20px] font-bold mb-4">
            Người khác cũng đang học
          </h5>
          <div className="flex flex-col">
            {dataCourses?.data?.every((course) => course.isPayed === true) ? (
              <span>Bạn đã mua hết khóa học.</span>
            ) : (
              dataCourses?.data?.map((course) =>
                course.isPayed ? null : (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-2 gap-x-3 bg-white rounded-sm border-b border-gray-300"
                  >
                    <Link to={`/course/${course.id}`}>
                      <div className="flex gap-x-3">
                        <img
                          className="w-20 h-20"
                          src={
                            course?.thumbnail ||
                            "https://e7.pngegg.com/pngimages/879/904/png-clipart-subject-international-english-computer-icons-symbol-english-miscellaneous-blue.png"
                          }
                          alt=""
                        />
                        <div className="flex flex-col justify-evenly">
                          <div className="flex flex-col items-start md:flex-row gap-x-4">
                            <h5 className="font-bold inline-block w-[200px] overflow-hidden">
                              {course.name}
                            </h5>
                            <div className="text-decaYellow flex items-center">
                              4.6
                              <AiFillStar />
                            </div>
                            <span className="flex items-center">
                              <FaUserFriends />
                            </span>
                            {course?.discountResponseDTO ? (
                              <span className="flex flex-col font-bold">
                                ₫
                                {(
                                  course.price -
                                  Math.floor(
                                    (course.price *
                                      course?.discountResponseDTO?.percent) /
                                      100
                                  )
                                ).toLocaleString()}
                                <span className="line-through text-gray-400 font-normal">
                                  ₫{course.price.toLocaleString()}
                                </span>
                              </span>
                            ) : (
                              <span className="flex flex-col font-bold">
                                ₫{course.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="py-1 px-1 text-[14px] font-bold bg-[#eceb98] w-[max-content]">
                              Khóa học
                            </span>
                            <span className="py-1 px-1 text-[14px] font-bold text-[#1e6055] w-[max-content]">
                              {course.document.length} tài liệu chọn lọc miễn
                              phí
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <span
                      className="w-10 h-10 lg:mr-6 cursor-pointer rounded-full border border-black flex items-center justify-evenly"
                      // onClick={handleFavoriteCourse}
                    >
                      <MdFavoriteBorder />
                    </span>
                  </div>
                )
              )
            )}
          </div>
        </div>
        <a href="" className="hidden" ref={ref}></a>
      </div>
    </>
  );
};

export default CourseDetail;
