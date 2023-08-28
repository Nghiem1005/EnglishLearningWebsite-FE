import React from "react";
import DrawerShow from "../../components/Drawer";
import { Box, Paper, Typography } from "@mui/material";
import {
  thunkCourseTypes,
  thunkStudentTypes,
} from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import { useEffect } from "react";
import { userCommonService } from "../../services/user";
import { useQueryCustom } from "../../hooks";
import moment from "moment";

const BillDetailShow = ({ isShowDrawer, setIsShowDrawer, data }) => {
  const {
    isLoading: isLoadingCourse,
    data: dataCourse,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE, () =>
    courseService.getCourse({
      courseId: data?.courseId,
    })
  );

  const {
    isLoading: isLoadingUser,
    data: dataUser,
    refetch: r2,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({
      userId: data?.studentId,
    })
  );

  useEffect(() => {
    if (data) {
      r1();
      r2();
    }
  }, [data]);

  if (isLoadingCourse || isLoadingUser) return;

  return (
    <DrawerShow
      anchor={"right"}
      isShowDrawer={isShowDrawer}
      setIsShowDrawer={setIsShowDrawer}
    >
      <Box className="show" role="presentation">
        <Paper
          elevation={0}
          sx={{ flex: 1, mx: "auto", width: "700px", p: 2, mt: 3 }}
        >
          <Typography variant="h5">Thông tin học viên</Typography>
          <div className="flex flex-col md:flex-row mt-8 gap-x-2">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <img
                src={
                  dataUser?.data?.data?.image ||
                  "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                }
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <Typography
                style={{ width: "max-content" }}
                variant="h5"
                color="textSecondary"
              >
                {dataUser?.data?.data?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {dataUser?.data?.data?.email}
              </Typography>
            </div>
          </div>
          <br />
          <div className="">
            <Typography variant="h6">Chi tiết</Typography>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Email</span>
              <span className="text-gray-600">
                {dataUser?.data?.data?.name}
              </span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Số điện thoại</span>
              <span className="text-gray-600">
                {dataUser?.data?.data?.phone}
              </span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày mua khóa</span>
              <span className="text-gray-600">
                {moment(data?.createDate)?.format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Giá tiền</span>
              <span className="text-gray-600 font-bold">
                đ{data?.price?.toLocaleString()}
              </span>
            </div>
          </div>
          <Box sx={{ mt: "60px" }}></Box>
          <Typography variant="h6">Khóa học</Typography>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Tên khóa học</span>
            <span className="text-cyan-600">
              {dataCourse?.data?.data?.name}
            </span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Giảng viên phụ trách</span>
            <div className="inline-flex gap-x-2 text-cyan-600 items-center">
              <div className="w-12 h-12 overflow-hidden rounded-full">
                <img
                  src={
                    dataCourse?.data?.data?.teacher?.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7f1RdMtPN3AkxLTXMCP-eJ2UEiYzg7hpYacuJaboWpAWKrjN6tAsre1lfLAgQD9U9U&usqp=CAU"
                  }
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p>{dataCourse?.data?.data?.teacher?.name}</p>
            </div>
          </div>
          {/* <div className="mt-1">
            <span className="w-[200px] inline-block">Mục tiêu khóa học</span>
            <span className="text-cyan-600">
              {
                levelCourse.filter(
                  (level) => level.value === dataCourse?.data?.data?.level
                )[0]?.name
              }
            </span>
          </div> */}
          {/* <div className="mt-1">
            <span className="w-[200px] inline-block">Hình thức khóa học</span>
            <span className="text-cyan-600">
              {
                courseType.filter(
                  (level) => level.value === dataCourse?.data?.data?.courseType
                )[0]?.name
              }
            </span>
          </div> */}
        </Paper>
      </Box>
    </DrawerShow>
  );
};

export default BillDetailShow;
