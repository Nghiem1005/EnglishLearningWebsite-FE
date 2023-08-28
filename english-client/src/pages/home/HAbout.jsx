import React, { useRef } from "react";
import Heading from "../../components/common/heading/Heading";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { billService } from "../../services/bill";
import "../courses/courses-list/courses.css";
import { courseService } from "../../services/course";

const HAbout = ({ dataCourse, userId, refetch }) => {
  const ref = useRef();

  const handlePayment = async (course) => {
    const { data: dataRes } = await billService.paymentBillWithMoMo({
      data: {
        courseId: course.id,
        studentId: userId,
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
      console.log(dataRes);
      ref.current.href = dataRes.data;
      ref.current.click();
    }
  };

  const handleLikeCourse = async (course) => {
    const data = course?.like
      ? await courseService.unlikeCourse({
          userId,
          courseId: course?.id,
        })
      : await courseService.likeCourse({
          userId,
          courseId: course?.id,
        });
    if (data.status === "OK") {
      refetch();
    }
  };

  return (
    <>
      <section className="homeAbout">
        <div className="container">
          <Heading
            subtitle="Khóa học của chúng tôi"
            title="Khám phá những khóa học mới nhất"
          />

          <div className="coursesCard">
            <div className="flex flex-wrap gap-6 mx-auto justify-center lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] lg:mx-auto">
              {dataCourse?.map((val) => (
                <div key={val?.id} className="w-[300px] items p-[12px] md:p-4">
                  <div className="content flex flex-wrap md:flex-nowrap">
                    <div className="left">
                      <div className="img w-[60px] h-[60px] md:w-[80px] md:h-[80px] overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            val?.thumbnail ||
                            "https://e7.pngegg.com/pngimages/879/904/png-clipart-subject-international-english-computer-icons-symbol-english-miscellaneous-blue.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text mb-3 overflow-hidden">
                      <h3 className="inline-block text text-[22px] h-[60px] overflow-hidden line-clamp-2 text-ellipsis">
                        {val?.name}
                      </h3>
                      <div className="rate">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <label htmlFor="">(5.0)</label>
                      </div>
                      <div className="details">
                        <div className="box">
                          <div className="dimg">
                            <img
                              src={
                                val?.teacher?.image ||
                                "https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="para">
                            <h4>{val.teacher.name}</h4>
                          </div>
                        </div>
                        <span>Giảng viên phụ trách</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left block h-[56px] overflow-hidden">
                    Mô tả:
                    <span
                      className="block ml-2"
                      dangerouslySetInnerHTML={{
                        __html: val?.description,
                      }}
                    ></span>
                  </div>
                  <div className="price h-[70px]">
                    {val?.discountResponseDTO ? (
                      <>
                        <h3>
                          {(
                            val.price -
                            Math.floor(
                              (val.price * val?.discountResponseDTO?.percent) /
                                100
                            )
                          ).toLocaleString()}
                          đ/khóa
                        </h3>
                        <span className="line-through text-[#999] font-medium">
                          {val.price.toLocaleString()}đ/khóa
                        </span>
                      </>
                    ) : (
                      <h3>{val.price.toLocaleString()}đ/khóa</h3>
                    )}
                  </div>
                  <Link to={`course/${val.id}`}>
                    <button className="outline-btn-custom">CHI TIẾT</button>
                  </Link>
                  <div className="flex gap-x-2 mt-2">
                    {val?.isPayed ? (
                      <span className="px-[12px] w-full py-[10px] bg-[#1eb2a6] text-white">
                        ĐÃ MUA
                      </span>
                    ) : (
                      <button
                        className="outline-btn-custom"
                        onClick={() => handlePayment(val)}
                      >
                        MUA KHÓA
                      </button>
                    )}
                    <button
                      className={`px-4 py-3 hover:bg-[#a435f0] hover:text-white hover:border-[#a435f0] border 
                      text-black rounded-sm font-bold ${
                        val?.like
                          ? "bg-[#a435f0] border-[#a435f0]"
                          : "bg-white border-black"
                      }`}
                      onClick={() => handleLikeCourse(val)}
                    >
                      <MdFavoriteBorder
                        className={`${val?.like ? "text-white" : "text-black"}`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <OnlineCourses /> */}
        <a href="" className="hidden" ref={ref}></a>
      </section>
    </>
  );
};

export default HAbout;
