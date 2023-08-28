import React, { useEffect } from "react";
import DrawerShow from "../../components/Drawer";
import { Box, Paper, Typography } from "@mui/material";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSuccess from "../../components/Button/ButtonSuccess";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { studentService, userCommonService } from "../../services/user";
import moment from "moment";
import { toast } from "react-toastify";

const StudentDetailShow = ({ isShowDrawer, setIsShowDrawer, data }) => {
  const {
    data: dataPractice,
    isLoading,
    isError,
    refetch,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    studentService.getPracticesByStudent({ userId: data?.id })
  );
  useEffect(() => {
    refetch();
  }, [data]);

  const handleBlockStudent = async (userId) => {
    const formData = new FormData();
    formData.append("enable", false);
    const response = await userCommonService.updateUser({
      userId,
      updateData: formData,
    });
    if (response.data?.status === "OK") {
      toast.success("Khóa tài khoản học viên thành công.");
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  if (isLoading || isError) return;
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
                  data?.image ||
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
                {data?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {data?.email}
              </Typography>
            </div>
          </div>
          <br />
          <div className="">
            <Typography variant="h6">Chi tiết</Typography>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Email</span>
              <span className="text-gray-600">{data?.email}</span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Số điện thoại</span>
              <span className="text-gray-600">{data?.phone}</span>
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày tham gia</span>
              <span className="text-gray-600">12/12/2022</span>
            </div>
          </div>
          <Box sx={{ mt: "60px" }}></Box>
          <Typography variant="h6">Điểm tự thi</Typography>
          {dataPractice?.map((practice) => (
            <div className="mt-1">
              <span className="w-[200px] inline-block">
                Ngày {moment(practice?.createDate).format("DD-MM-YYYY")}
              </span>
              <span className="text-cyan-600">{practice?.result} câu đúng</span>
              <span className="text-cyan-600 ml-2">
                ({Math.floor(practice?.period / 60)} phút)
              </span>
            </div>
          ))}
          <div className="flex flex-col md:flex-row gap-x-2 my-5 bottom-0">
            <ButtonCancel
              content={"Đóng"}
              onClick={() => setIsShowDrawer(false)}
            />
            <ButtonSuccess
              content={"Khóa tài khoản"}
              onClick={handleBlockStudent}
            />
          </div>
        </Paper>
      </Box>
    </DrawerShow>
  );
};

export default StudentDetailShow;
