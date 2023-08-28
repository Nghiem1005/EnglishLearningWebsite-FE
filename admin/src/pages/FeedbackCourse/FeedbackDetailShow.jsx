import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  thunkCourseTypes,
  thunkStudentTypes,
} from "../../constants/thunkTypes";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import DrawerShow from "../../components/Drawer";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSecondAction from "../../components/Button/ButtonSecondAction";
import { courseService } from "../../services/course";
import { userCommonService } from "../../services/user";
import moment from "moment";
import TextareaComponent from "../../components/TextareaComponent";
import { useAuth } from "../../contexts/authProvider";

const FeedbackDetailShow = ({
  data,
  setIsShowDetail,
  isShowDetail,
  reloadData,
}) => {
  const [postComment, setPostComment] = useState({ value: "" });
  const auth = useAuth();
  const {
    isLoading,
    data: dataStudent,
    refetch: rStudent,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: data?.studentId })
  );
  const {
    isLoading: iCourse,
    data: dataCourse,
    refetch: rCourse,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE, () =>
    courseService.getCourse({ courseId: data?.subjectId })
  );

  useEffect(() => {
    if (data) {
      rStudent();
      rCourse();
    }
  }, [data]);

  const handleApproveFeedback = async (feedbackId) => {
    const formData = new FormData();
    formData.append("pending", false);
    const data = await courseService.updateEvaluateCourse({
      feedbackId,
      data: formData,
    });
    if (data.status === "OK") {
      reloadData();
      toast.success("Chấp nhận đánh giá thành công!");
      setIsShowDetail(false);
    } else {
      toast.error("Có lỗi!");
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    const response = await courseService.deleteEvaluateCourse({ feedbackId });
    if (response.status === "OK") {
      toast.success("Xóa đánh giá thành công!");
      reloadData();
      setIsShowDetail(false);
    } else {
      toast.error("Có lỗi!");
    }
  };

  const handleReplyFeedback = async (feedbackId) => {
    const formData = new FormData();
    formData.append("studentId", auth?.user?.id);
    formData.append("subjectId", data?.subjectId);
    formData.append("content", postComment.value);
    formData.append("mainDiscuss", data?.id);
    formData.append("pending", false);
    const response = await courseService.addEvaluateCourse({
      data: formData,
    });
    if (response.data?.status === "OK") {
      toast.success("Đăng bình luận thành công!");
      setPostComment({...postComment, value: ''});
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  if (isLoading || iCourse) return;

  return (
    <DrawerShow isShowDrawer={isShowDetail} setIsShowDrawer={setIsShowDetail}>
      <div className="mx-auto w-[700px] px-6 mt-3">
        <h5 className="text-[28px] font-bold">
          Thông tin học viên phản hồi khóa học
        </h5>
        <div className="flex flex-col md:flex-row mt-8 gap-x-2">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <img
              src={
                dataStudent?.data?.data?.image ||
                "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
              }
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h5 className="w-[max-content]">{dataStudent?.data?.data?.name}</h5>
            <span>{dataStudent?.data?.data?.email}</span>
          </div>
        </div>
        <br />
        <div className="">
          <h6 className="text-[24px] font-bold">Chi tiết</h6>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Email</span>
            <span className="text-gray-600">
              {dataStudent?.data?.data?.name}
            </span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Số điện thoại</span>
            <span className="text-gray-600">
              {dataStudent?.data?.data?.phone}
            </span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Thời gian bình luận</span>
            <span className="text-gray-600">
              {moment(data?.createDate)?.format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Nội dung bình luận</span>
            <span className="text-gray-600">{data?.content}</span>
          </div>
        </div>
        <div className="mt-[60px]"></div>
        <h6 className="text-[24px] font-bold">Khóa học</h6>
        <div className="mt-1">
          <span className="w-[200px] inline-block">Tên khóa học</span>
          <span className="text-cyan-600">{dataCourse?.data?.data?.name}</span>
        </div>
        <div className="mt-1 flex items-center">
          <span className="w-[200px] inline-block">Giảng viên phụ trách</span>
          <div className="inline-flex gap-x-2 text-cyan-600 items-center">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img
                src={
                  dataCourse?.data?.data?.teacher?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7f1RdMtPN3AkxLTXMCP-eJ2UEiYzg7hpYacuJaboWpAWKrjN6tAsre1lfLAgQD9U9U&usqp=CAU"
                }
                className="w-full h-full object-contain"
              />
            </div>
            <p>{dataCourse?.data?.data?.teacher?.name}</p>
          </div>
        </div>
        {!data?.pending && (
          <div className="mt-6">
            <TextareaComponent
              postComment={postComment}
              setPostComment={setPostComment}
              handlePost={handleReplyFeedback}
            />
          </div>
        )}
        <div className="flex items-center gap-4 mt-6">
          {data?.pending ? (
            <ButtonSecondAction
              content={"Chấp nhận"}
              onClick={() => handleApproveFeedback(data?.id)}
            />
          ) : (
            <ButtonSecondAction
              content={"Trả lời"}
              onClick={() => handleReplyFeedback(data?.id)}
            />
          )}
          <ButtonCancel
            content={"Xóa bình luận"}
            onClick={() => handleDeleteFeedback(data?.id)}
          />
        </div>
      </div>
    </DrawerShow>
  );
};

export default FeedbackDetailShow;
