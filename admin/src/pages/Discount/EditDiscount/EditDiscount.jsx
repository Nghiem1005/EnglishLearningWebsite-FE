import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useQueryCustom } from "../../../hooks/useQueryCustom";
import DrawerShow from "../../../components/Drawer";
import ButtonCancel from "../../../components/Button/ButtonCancel";
import ButtonSecondAction from "../../../components/Button/ButtonSecondAction";
import { courseService } from "../../../services/course";
import { discountService } from "../../../services/discount";
import { useLocation, useNavigate } from "react-router-dom";
import {
  thunkCourseTypes,
  thunkDiscountTypes,
} from "../../../constants/thunkTypes";
import { useForm } from "react-hook-form";
import InputComponent from "../../../components/InputComponent";
import {useAuth} from "../../../contexts/authProvider"
import moment from "moment";

const EditDiscount = ({ setIsShowDetail, isShowDetail, refetch }) => {
  const [changeCourse, setChangeCourse] = useState({
    isChangedCourse: false,
    dataCourseChange: [],
  });
  const messageRef = useRef();
  const hash = useLocation();
  const auth = useAuth()
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, watch } = useForm();

  const { isLoading: isLoadingCourses, data: dataCourses } = useQueryCustom(
    thunkCourseTypes.GETALL_COURSE,
    () =>
      courseService.getAllCourse({
        size: 1000,
        page: 1,
        userId : auth?.user?.id
      })
  );

  const {
    isLoading,
    data: dataDiscountDetail,
    refetch: refetchDiscount,
  } = useQueryCustom(thunkDiscountTypes.GET_DISCOUNT, () =>
    discountService.getDiscount({ discountId: hash.pathname.split("/")[2] })
  );

  useEffect(() => {
    if (hash.pathname.split("/")[2]) {
      refetchDiscount();
    }
  }, [hash.pathname]);

  useEffect(() => {
    if (dataDiscountDetail) {
      setValue("content", dataDiscountDetail?.data?.content);
      setValue("percent", dataDiscountDetail?.data?.percent);
      setValue(
        "timeStart",
        moment(dataDiscountDetail?.data?.startDate).format("YYYY-MM-DD")
      );
      setValue(
        "timeEnd",
        moment(dataDiscountDetail?.data?.endDate).format("YYYY-MM-DD")
      );
      const courses = dataDiscountDetail?.data?.courseResponseDTOS?.reduce(
        (acc, course) =>
          dataCourses?.data?.data?.some((item) => item?.id === course?.id)
            ? [...acc, course?.id]
            : [...acc],
        []
      );
      setValue("courses", courses);
    }
  }, [dataDiscountDetail, dataCourses]);

  useEffect(() => {
    if (dataCourses) {
      setChangeCourse({
        ...changeCourse,
        dataCourseChange: dataDiscountDetail?.data?.courseResponseDTOS?.reduce(
          (acc, course) =>
            dataCourses?.data?.data?.some((item) => item?.id === course?.id)
              ? [...acc, course]
              : [...acc],
          []
        ),
      });
    }
  }, [dataCourses]);

  useEffect(() => {
    if (watch("courses")) {
      const dataCourseChange = dataCourses?.data?.data?.reduce(
        (acc, course) =>
          watch("courses").some((courseId) => parseInt(courseId) === course?.id)
            ? [...acc, course]
            : [...acc],
        []
      );
      setChangeCourse({
        ...changeCourse,
        dataCourseChange,
      });
    }
  }, [watch("courses")]);

  const onSubmit = async (form) => {
    try {
      const { content, percent, timeStart, timeEnd, courses } = form;
      let message = "";
      if (
        timeEnd === "" ||
        timeStart === "" ||
        content === "" ||
        percent === ""
      ) {
        message +=
          "Các trường nội dung, giá khuyến mãi, thời gian bắt đầu, kết thúc bà bắt buộc. ";
      } else if (new Date(timeEnd) < new Date(timeStart)) {
        message += "Ngày kết thúc phải lớn hơn ngày bắt đầu. ";
      } else {
        const response = await discountService.updateDiscount({
          discountId: hash.pathname.split("/")[2],
          data: {
            content,
            percent,
            startDate: timeStart,
            endDate: timeEnd,
            courseId: courses,
          },
        });
        if (response?.status === "OK") {
          refetch();
          navigate("/discount");
          toast.success("Chỉnh sửa giảm giá thành công!");
          setIsShowDetail(false);
        } else {
          toast.error("Có lỗi!");
        }
      }
      if (message !== "") {
        messageRef.current.innerText = message;
        return;
      }
    } catch (error) {
      toast.error("Có lỗi!");
    }
  };

  if (isLoadingCourses || isLoading) return;

  return (
    <DrawerShow isShowDrawer={isShowDetail} setIsShowDrawer={setIsShowDetail}>
      <div className="mx-auto h-full md:w-[700px] px-6 mt-3 relative">
        <h5 className="text-[28px] font-bold">Chỉnh sửa phiếu giảm giá</h5>
        <br />
        <form>
          <h6 className="text-[24px] font-bold">Chi tiết</h6>
          <div className="flex flex-col md:flex-row gap-2 mt-1">
            <div className="w-full md:w-6/12">
              <span className="w-[200px] inline-block">Nội dung</span>
              <InputComponent
                props={{ ...register("content") }}
                placeholder={"Nội dung"}
              />
            </div>
            <div className="w-full md:w-6/12">
              <span className="w-[200px] inline-block">Giá khuyến mãi</span>
              <div className="flex items-center text-[20px]">
                <InputComponent
                  props={{ ...register("percent") }}
                  type="number"
                  placeholder={"Nhập giá trị"}
                />{" "}
                %
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-1">
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày bắt đầu</span>
              <InputComponent
                props={{ ...register("timeStart") }}
                type="date"
              />
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày kết thúc</span>
              <InputComponent props={{ ...register("timeEnd") }} type="date" />
            </div>
          </div>
          <span className="text-sm text-red-700 italic" ref={messageRef}></span>
        </form>
        <div className="mt-4"></div>
        <h6 className="text-[24px] font-bold">
          Khóa học đang sử dụng
          <span
            className="text-sm p-1 bg-[#e95151] ml-2 rounded-md text-white opacity-75 cursor-pointer hover:opacity-100"
            onClick={() => {
              changeCourse.isChangedCourse && setValue("courses", null);
              setChangeCourse({
                ...changeCourse,
                isChangedCourse: !changeCourse.isChangedCourse,
              });
            }}
          >
            {!changeCourse.isChangedCourse ? "Chỉnh sửa" : "Hủy bỏ"}
          </span>
        </h6>
        {changeCourse.isChangedCourse && (
          <label className="text-sm font-medium text-gray-700">
            Chọn khóa học:
            <select
              {...register("courses")}
              multiple
              className="block w-full h-20 rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:outline-none sm:text-sm"
            >
              {dataCourses?.data?.data?.map((item) => (
                <option key={item.id.toString()} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {watch("courses") ? (
          <div className="mt-4 flex flex-wrap gap-2 h-7 overflow-y-auto">
            {changeCourse.dataCourseChange?.map((course) =>
              watch("courses").some(
                (courseId) => parseInt(courseId) === course?.id
              ) ? (
                <span
                  className="p-[2px] px-2 bg-[#d8d5d5] rounded-md"
                  key={course?.id}
                  onClick={() =>
                    document
                      .querySelector(`#course-${course?.id}`)
                      .scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {course.name}
                </span>
              ) : null
            )}
          </div>
        ) : null}
        <div
          className={`${
            changeCourse.isChangedCourse ? "max-h-[30vh]" : "max-h-[42vh]"
          } overflow-y-auto w-full border-1 border-[#ccc] p-1 mt-4`}
        >
          {watch("courses") ? (
            changeCourse.dataCourseChange?.map((course) =>
              watch("courses").some(
                (courseId) => parseInt(courseId) === course?.id
              ) ? (
                <div
                  id={`course-${course?.id}`}
                  className="p-1 pl-4 mb-2 bg-[#e8e5e5]"
                  key={course?.id}
                >
                  <div className="mt-1">
                    <span className="w-[200px] inline-block">Tên khóa học</span>
                    <span className="text-cyan-600">{course?.name}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className="w-[200px] inline-block">
                      Giảng viên phụ trách
                    </span>
                    <div className="inline-flex gap-x-2 text-cyan-600 items-center">
                      <div className="w-8 h-8 overflow-hidden rounded-full">
                        <img
                          src={
                            course?.teacher?.image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7f1RdMtPN3AkxLTXMCP-eJ2UEiYzg7hpYacuJaboWpAWKrjN6tAsre1lfLAgQD9U9U&usqp=CAU"
                          }
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p>{course?.teacher?.name}</p>
                    </div>
                  </div>
                </div>
              ) : null
            )
          ) : (
            <span>Chưa có khóa học nào</span>
          )}
        </div>
        <div className="absolute bottom-6 flex items-center gap-4 mt-6 bg-white">
          <ButtonSecondAction
            content={"Chỉnh sửa"}
            onClick={handleSubmit(onSubmit)}
          />
          <ButtonCancel
            content={"Hủy bỏ"}
            onClick={() => setIsShowDetail(false)}
          />
        </div>
      </div>
    </DrawerShow>
  );
};

export default EditDiscount;
