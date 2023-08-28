import React, { useState, useEffect, useRef } from "react";
import { courseService } from "../../../services/course";
import { useAuth } from "../../../contexts/authProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { billService } from "../../../services/bill";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import Back from "../../../components/common/back/Back";
import "./courses.css";
import { useQueryCustom } from "../../../hooks";
import { thunkCourseTypes } from "../../../constants/thunkTypes";
import { AiOutlineSearch } from "react-icons/ai";

const CoursesPage = () => {
  const [pageSize, setPageSize] = useState({ size: 12, page: 1 });
  const [dataCourses, setDataCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState({
    type: "",
    index: null,
    point: null,
    search: "",
  });
  const [totalPage, setTotalPage] = useState(null);
  const auth = useAuth();
  const ref = useRef();

  const { data, isLoading, isError } = useQueryCustom(
    thunkCourseTypes.GET_COURSE_TYPE,
    () => courseService.getAllCourseType()
  );

  useEffect(() => {
    getListCourse();
  }, [pageSize.page, pageSize.size, filterCourse.search, filterCourse.type]);

  useEffect(() => {
    setPageSize({
      page: 1,
      size: 12,
    });
  }, [filterCourse.search, filterCourse.type]);

  const getListCourse = async () => {
    setPageSize({
      ...pageSize,
      page: Math.ceil(dataCourses.length / pageSize.size) + 1,
    });
    if (filterCourse.type || filterCourse.search) {
      let type = "";
      filterCourse.type ? (type += `type:${filterCourse.type}`) : null;
      filterCourse.search.trim() !== ""
        ? (type += `;name:${filterCourse.search}`)
        : null;
      const response = await courseService.getAllCourseFilter({
        size: pageSize.size,
        page: pageSize.page,
        userId: auth?.user?.id,
        search: type,
      });
      if (pageSize.page > 1) {
        setTotalPage(response.totalPage);
        setDataCourses([...dataCourses, ...response.data]);
      } else {
        setTotalPage(response.totalPage);
        setDataCourses([...response.data]);
      }
    } else {
      const response = await courseService.getAllCourse({
        size: pageSize.size,
        page: pageSize.page,
        userId: auth?.user?.id,
      });
      if (pageSize.page > 1) {
        setTotalPage(response.totalPage);
        setDataCourses([...dataCourses, ...response.data]);
      } else {
        setTotalPage(response.totalPage);
        setDataCourses([...response.data]);
      }
    }
  };

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
        getListCourse();
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
      setDataCourses((prevState) =>
        prevState.map((courseItem) =>
          course?.id === courseItem?.id
            ? { ...courseItem, like: !courseItem?.like }
            : { ...courseItem }
        )
      );
    }
  };

  if (isLoading || isError) return;
  return (
    <>
      <Back title="Tất cả khóa học" />
      <section className="coursesCard px-[20px] py-20 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[71rem] mx-auto">
        <div>
          <div className="flex items-center gap-x-2">
            <h4 className="text-[20px] font-medium">Tìm kiếm</h4>
            {/* <form className="w-9/12" onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Tìm
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full outline-none p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tìm kiếm tên khóa học..."
                  value={filterCourse.search}
                  onChange={(e) => {
                    setFilterCourse({
                      ...filterCourse,
                      search: e.target.value,
                    });
                  }}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tìm
                </button>
              </div>
            </form> */}
          </div>
          <div className="text-[16px] mb-6 flex flex-wrap gap-x-3 mt-3 lg:ml-24">
            {data.data?.map((typeItem, index) => (
              <span
                key={typeItem}
                className={`${
                  filterCourse.index === index
                    ? "text-[#35509a] bg-[#bad3f4]"
                    : "border-black border-[1px] hover:bg-[#e0e8ff] bg-[#eee] text-[#1e2022] hover:border-[#eee]"
                } py-1 px-3 rounded-2xl cursor-pointer font-medium`}
                onClick={() => {
                  setFilterCourse({
                    ...filterCourse,
                    type: typeItem,
                    index: index,
                  });
                }}
              >
                #{typeItem}
              </span>
            ))}
            <span
              className="text-white hover:bg-[#fd9696] bg-[#e36060] hover:border-[#eee]
              py-1 px-3 rounded-2xl cursor-pointer font-medium"
              onClick={() => {
                setFilterCourse({
                  ...filterCourse,
                  type: "",
                  index: null,
                });
              }}
            >
              Hủy bỏ
            </span>
          </div>
        </div>
        <h5 className="text-[20px] font-medium mb-4">Kết quả tìm kiếm</h5>
        <div className="container grid2 courses-page">
          <InfiniteScroll
            dataLength={dataCourses.length}
            next={getListCourse}
            hasMore={pageSize.page < totalPage}
            loader={pageSize.page == totalPage ? null : <span>loading...</span>}
          >
            {dataCourses.length > 0 &&
              dataCourses.map((course) => (
                <div
                  key={course?.id}
                  className="w-[270px] lg:w-[300px] items p-[12px] md:p-4"
                >
                  <div className="content flex flex-wrap md:flex-nowrap">
                    <div className="left">
                      <div className="img w-[60px] h-[60px] md:w-[80px] md:h-[80px] overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            course?.thumbnail ||
                            "https://e7.pngegg.com/pngimages/879/904/png-clipart-subject-international-english-computer-icons-symbol-english-miscellaneous-blue.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text mb-3 overflow-hidden">
                      <h3 className="inline-block text text-[22px] h-[60px] overflow-hidden line-clamp-2 text-ellipsis">
                        {course?.name}
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
                                course?.teacher?.image ||
                                "https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="para">
                            <h4>{course.teacher.name}</h4>
                          </div>
                        </div>
                        <span>Giảng viên phụ trách</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[12px] italic block text-left p-1 px-2 rounded-md bg-[#ccc] w-[max-content]">#{course?.type}</div>
                  <div className="text-left block h-[56px] overflow-hidden">
                    Mô tả:
                    <span
                      className="inline-block ml-2"
                      dangerouslySetInnerHTML={{
                        __html: course?.description,
                      }}
                    ></span>
                  </div>
                  <div className="price h-[70px]">
                    {course?.discountResponseDTO ? (
                      <>
                        <h3>
                          {(
                            course.price -
                            Math.floor(
                              (course.price *
                                course?.discountResponseDTO?.percent) /
                                100
                            )
                          ).toLocaleString()}
                          đ/khóa
                        </h3>
                        <span className="line-through text-[#999] font-medium">
                          {course.price.toLocaleString()}đ/khóa
                        </span>
                      </>
                    ) : (
                      <h3>{course.price.toLocaleString()}đ/khóa</h3>
                    )}
                  </div>
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
                        onClick={(e) => handlePayment(course)}
                      >
                        MUA KHÓA
                      </button>
                    )}
                    <button
                      className={`px-4 py-3 hover:bg-[#a435f0] hover:text-white hover:border-[#a435f0] border 
                      text-black rounded-sm font-bold ${
                        course?.like
                          ? "bg-[#a435f0] border-[#a435f0]"
                          : "bg-white border-black"
                      }`}
                      onClick={() => handleLikeCourse(course)}
                    >
                      <MdFavoriteBorder
                        className={`${
                          course?.like ? "text-white" : "text-black"
                        }`}
                      />
                    </button>
                  </div>
                  <a href="" className="hidden" ref={ref}></a>
                </div>
              ))}
          </InfiniteScroll>
        </div>
        {dataCourses.length > 0 ? (
          <div className="inline-block float-right mt-4 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
            <span className="text-[16px] ">
              Trang {pageSize.page}/{totalPage}
            </span>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default CoursesPage;
