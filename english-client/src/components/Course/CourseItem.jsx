import React, { useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../hooks";
import { thunkLessonTypes } from "../../constants/thunkTypes";
import { lessonService } from "../../services/lesson";
import { courseService } from "../../services/course";
import { billService } from "../../services/bill";
import { useAuth } from "../../contexts/authProvider";
import { MdFavoriteBorder } from "react-icons/md";

const style = {
  ":hover>.modal": {
    display: "flex",
  },
};

const CourseItem = ({ dataCourse, index, refetch, isOption = false }) => {
  const auth = useAuth();
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const {
    isLoading: isLoadingLessons,
    data: dataLessons,
    refetch: r2,
  } = useQueryCustom(thunkLessonTypes.GETALL_LESSON + index, () =>
    lessonService.getAllLessonByCourse({
      size: 1000,
      page: 1,
      courseId: dataCourse.id,
    })
  );

  const handlePayment = async (course) => {
    try {
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
        ref.current.href = dataRes.data;
        ref.current.click();
      } else {
        toast.error("Có lỗi khi thanh toán!");
      }
    } catch (error) {
      console.log(error);
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
      refetch();
    }
  };

  if (isLoadingLessons) return;

  return (
    <div className="max-w-[16rem] md:max-w-[24rem] lg:max-w-[24rem] bg-white border border-gray-200 rounded-sm dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={`/my-course/course/${dataCourse.id}/learn/lecture/${dataLessons?.data?.data[0]?.id}#overview`}
      >
        <div className="relative h-[170px] w-full overflow-hidden">
          <img
            className="rounded-t-sm w-full h-full object-cover"
            src={dataCourse?.thumbnail}
            alt={dataCourse?.name}
            style={style}
            onMouseEnter={() => setHover(true)}
          />
          <div
            className={`${
              hover ? "flex" : "hidden"
            } modal bg-slate-300/50 absolute left-0 top-0 w-full h-full items-center justify-center duration-1000 cursor-pointer`}
            onMouseLeave={() => setHover(false)}
          >
            <AiFillPlayCircle
              className={`${
                hover ? "scale-110" : "scale-100"
              } transform duration-200`}
              size={60}
            />
          </div>
        </div>
      </Link>
      <div className="p-5 pb-0">
        <Link
          to={`/my-course/course/${dataCourse.id}/learn/lecture/${dataLessons?.data?.data[0]?.id}#overview`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dataCourse?.name}
          </h5>
        </Link>
        <Link to={`/team/teacher/${dataCourse?.teacher?.id}`}>
          <p className="mb-3 font-normal text-gray-700 text-sm dark:text-gray-400 underline">
            Giảng viên: {dataCourse.teacher.name}
          </p>
        </Link>
      </div>
      {isOption ? (
        <>
          <div className="px-2">
            <Link to={`/course/${dataCourse.id}`}>
              <button className="outline-btn-custom">CHI TIẾT</button>
            </Link>
          </div>
          <div className="flex gap-x-2 mt-2 px-2">
            {dataCourse?.isPayed ? (
              <span className="px-[12px] w-full py-[10px] bg-[#1eb2a6] text-white">
                ĐÃ MUA
              </span>
            ) : (
              <button
                className="outline-btn-custom"
                onClick={(e) => handlePayment(dataCourse)}
              >
                MUA KHÓA
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
                className={`${dataCourse?.like ? "text-white" : "text-black"}`}
              />
            </button>
            <a href="" className="hidden" ref={ref}></a>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CourseItem;
