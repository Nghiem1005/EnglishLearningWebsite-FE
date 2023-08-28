import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks";
import { thunkTeacherTypes } from "../../constants/thunkTypes";
import { userService } from "../../services/user";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { billService } from "../../services/bill";
import { MdFavoriteBorder } from "react-icons/md";

const TeacherDetail = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const { teacherId } = useParams();
  const auth = useAuth();

  const { isLoading, isError, data } = useQueryCustom(
    thunkTeacherTypes.GET_TEACHER,
    () =>
      userService.getTeacher({
        teacherId,
        userId: auth?.user?.id,
      })
  );

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
      ref.current.href = dataRes.payUrl;
      ref.current.click();
      getListCourse();
    } else {
      toast.error("Có lỗi khi thanh toán!");
    }
  };

  if (isLoading || isError) return;

  return (
    <div className="max-w-[26rem] md:max-w-[40rem] lg:max-w-[56rem] 2xl:max-w-[70rem] mx-auto lg:ml-16 xl:ml-40 my-10 flex flex-col  lg:flex-row-reverse gap-x-20">
      <div className="flex flex-col gap-2 w-full md:w-4/12">
        <img
          className="h-[250px] w-[250px] rounded-full object-cover"
          src={
            data?.teacher?.image ||
            "https://st2.depositphotos.com/1518767/8470/i/950/depositphotos_84700542-stock-photo-teacher-smiling-at-camera-in.jpg"
          }
          alt=""
        />
        <div className="flex flex-row md:flex-col gap-2 w-60 mt-6">
          <a className="flex justify-center items-center px-4 gap-x-2 py-2 border-[2px] border-[#6b6b6b] hover:bg-[#999] text-black cursor-pointer font-bold text-[16px]">
            <BsFacebook />
            Facebook
          </a>
          <a className="flex justify-center items-center px-4 gap-x-2 py-2 border-[2px] border-[#6b6b6b] hover:bg-[#999] text-black cursor-pointer font-bold text-[16px]">
            <BsYoutube />
            Youtube
          </a>
          <a className="flex justify-center items-center px-4 gap-x-2 py-2 border-[2px] border-[#6b6b6b] hover:bg-[#999] text-black cursor-pointer font-bold text-[16px]">
            <BsTwitter />
            Twitter
          </a>
        </div>
      </div>
      <div className="w-full md:w-8/12">
        <span className="text-[20px] text-[#297964] uppercase">Giáo viên</span>
        <h3 className="text-[3rem] font-stackHeading font-bold">
          {data?.teacher?.name}
        </h3>
        <span className="text-[1rem] font-stackHeading font-bold">
          {data?.teacher?.email}
        </span>
        <div className="py-1 px-3 bg-[#988ebb] text-[12px] font-bold text-white w-[max-content]">
          Giáo viên đối tác của E-Academy
        </div>
        <div className="mt-10">
          <h4 className="text-xl font-bold mb-4">Về tôi</h4>
          {data?.teacher?.description && (
            <>
              <div className="mt-4 relative font-normal" id="description">
                <span
                  dangerouslySetInnerHTML={{
                    __html: data?.teacher?.description,
                  }}
                ></span>
                {isShowMore ? null : (
                  <div className="absolute bottom-0 bg-gradient-to-b from-[#d2d1d1]/60 to-[#d2d1d1]  h-20 w-full"></div>
                )}
              </div>
              <button
                className="text-[16px] text-[#5624d0] cursor-pointer font-semibold flex items-center gap-x-1"
                onClick={() => {
                  setIsShowMore(!isShowMore);
                }}
              >
                Show more
                {!isShowMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            </>
          )}
        </div>
        <div>
          <h4 className="text-xl font-bold mb-2">
            Khóa học của tôi({data?.dataCourses?.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.dataCourses?.map((course) => (
              <div
                className="flex flex-col gap-2 bg-white cursor-pointer"
                key={course?.id}
              >
                <img
                  className="h-52 w-full object-cover"
                  src={course?.thumbnail}
                  alt=""
                />
                <div className="p-2">
                  <h5 className="text-[18px] font-bold">{course?.name}</h5>
                  <span className="text-[14px] text-[#1c1d1f] italic font-normal">
                    {data?.teacher?.name}
                  </span>
                  <span className="flex items-center gap-x-2 font-bold mb-2">
                    ₫{"2,000,000"}
                    <span className="line-through text-gray-400 font-normal">
                      ₫{course?.price}
                    </span>
                  </span>
                  <Link to={`/course/${course.id}`}>
                    <button className="outline-btn-custom">CHI TIẾT</button>
                  </Link>
                  <div className="flex gap-x-2 mt-2">
                    {course?.isPayed ? (
                      <span className="px-[12px] w-full py-[10px] bg-[#1eb2a6] text-white">
                        ĐÃ MUA
                      </span>
                    ) : (
                      <button
                        className="outline-btn-custom"
                        onClick={() => handlePayment(course)}
                      >
                        MUA KHÓA
                      </button>
                    )}
                    <button
                      className="px-4 py-3 hover:bg-[#a435f0] hover:text-white hover:border-[#a435f0] bg-white border border-black 
                      text-black rounded-sm font-bold"
                    >
                      <MdFavoriteBorder />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
