import React, { useEffect, Suspense, useState, useRef } from "react";
import CommentList from "./CommentList";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/authProvider";
import { useCommentContext } from "../../../../contexts/postProvider";
import { courseService } from "../../../../services/course";
import moment from "moment";
const InputComponent = React.lazy(() =>
  import("../../../../components/Input/InputComponent")
);

const CommentSection = ({ courseId, isShowInputComment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postComment, setPostComment] = useState({
    value: "",
    images: [],
  });
  const auth = useAuth();
  const {
    rootComment,
    getDataComment,
    totalPage,
    currentTotalComment,
    addComment,
  } = useCommentContext();
  const [pageSize, setPageSize] = useState({
    page: 1,
    size: 20,
  });
  const messageRef = useRef();

  useEffect(() => {
    getDataComment({
      ...pageSize,
      API_FN: courseService.getAllEvaluateByCourse({ ...pageSize, courseId }),
    });
  }, [courseId]);

  const paginationData = () => {
    setPageSize({
      ...pageSize,
      page: pageSize.page + 1,
    });
    setIsLoading(true);
    setTimeout(() => {
      getDataComment({
        ...pageSize,
        API_FN: courseService.getAllEvaluateByCourse({ ...pageSize, courseId }),
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentId", auth?.user?.id);
    formData.append("subjectId", courseId);
    formData.append("content", postComment.value);
    formData.append("pending", auth?.user?.role === "STUDENT" ? true : false);
    if (postComment.images.length > 0) {
      postComment.images.forEach((image) => formData.append("images", image));
    }
    const response = await courseService.addEvaluateCourse({ data: formData });
    if (response.data?.status === "OK") {
      setPostComment({ value: "", images: [] });
      if (auth?.user?.role === "STUDENT") {
        messageRef.current.innerText =
          "Phản hồi của bạn đang được phê duyệt. Cảm ơn.";
        setTimeout(() => {
          messageRef.current.innerText = "";
        }, 5000);
      } else {
        addComment({
          studentId: auth?.user?.id,
          subjectId: courseId,
          content: postComment.value,
          userName: auth?.user?.name,
          userRole:auth?.user?.role,
          pending: false,
          images: postComment.images,
          createDate: moment(Date.now()).format("YYYY-MM-DD"),
        });
        toast.success("Đăng bình luận thành công!");
      }
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <div className="bg-white pb-6">
      {(isShowInputComment ||
        auth?.user?.role === "ADMIN" ||
        auth?.user?.role === "TEACHER") && (
        <Suspense fallback="">
          <span
            className="text-[14px] text-[#276c9a] font-medium"
            ref={messageRef}
          ></span>
          <InputComponent
            postComment={postComment}
            setPostComment={setPostComment}
            handlePost={handlePost}
          />
        </Suspense>
      )}
      <div className="max-h-[40rem] overflow-y-auto">
        {rootComment != null && rootComment.length > 0 ? (
          <CommentList comments={rootComment} />
        ) : (
          <span className="mt-10 block">Chưa có đánh giá nào từ học viên</span>
        )}
        {isLoading && <p className="text-sm block ml-10 my-4">loading...</p>}
        <div className="mx-6 mt-4 font-medium text-[#999]">
          {currentTotalComment < totalPage && (
            <button
              className="underline hover:text-[#666] p-2"
              onClick={paginationData}
            >
              Xem thêm bình luận...
            </button>
          )}
          <span className="float-right my-auto ">
            {currentTotalComment}/{totalPage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
