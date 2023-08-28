import React from "react";
import DrawerShow from "../../components/Drawer";
import { Box, Paper, Typography } from "@mui/material";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSuccess from "../../components/Button/ButtonSuccess";
import moment from "moment";

const StudentDetailShow = ({ studentData, isShowDrawer, setIsShowDrawer }) => {
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
                src={studentData?.image}
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
                {studentData?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {studentData?.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {studentData?.phone}
              </Typography>
            </div>
          </div>
          <br />
          <div className="">
            <Typography variant="h6">Chi tiết</Typography>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Email</span>
              <span className="text-gray-600">{studentData?.email}</span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Số điện thoại</span>
              <span className="text-gray-600">{studentData?.phone}</span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày tham gia</span>
              <span className="text-gray-600">
                {moment(studentData?.createDate).format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
          <Box sx={{ mt: "60px" }}></Box>
          <Typography variant="h6">Điểm tự ôn</Typography>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Ngày 12/12/2022</span>
            <span className="text-cyan-600">20/ 30 câu đúng</span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Ngày 12/12/2022</span>
            <span className="text-cyan-600">20/ 30 câu đúng</span>
          </div>
          <Box sx={{ mt: "60px" }}></Box>
          <Typography variant="h6">Điểm thi định kì</Typography>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Ngày 12/12/2022</span>
            <span className="text-cyan-600">20/ 30 câu đúng</span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Ngày 12/12/2022</span>
            <span className="text-cyan-600">20/ 30 câu đúng</span>
          </div>
          <div className="flex flex-col md:flex-row gap-x-2 my-5 bottom-0">
            <div onClick={() => setIsShowDrawer(false)}>
              <ButtonCancel content={"Đóng"} />
            </div>
            <ButtonSuccess content={"Nhắn tin"} />
          </div>
        </Paper>
      </Box>
    </DrawerShow>
  );
};

export default StudentDetailShow;
