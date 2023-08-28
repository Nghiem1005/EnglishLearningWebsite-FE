import React, { useEffect, Suspense, useState } from "react";
import CommentList from "./CommentList";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/authProvider";
import { useCommentContext } from "../../../contexts/postProvider";
import { blogService } from "../../../services/blog";
// const InputComponent = React.lazy(() =>
//   import("../../../components/Input/InputComponent")
// );
import InputComponent from "../../../components/Input/InputComponent";
import moment from "moment";

const CommentSection = ({ blogId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postComment, setPostComment] = useState({
    value: "",
    images: [],
  });
  const { rootComment, getDataComment, totalPage, currentTotalComment, addComment } =
    useCommentContext();
  const [pageSize, setPageSize] = useState({
    page: 1,
    size: 20,
  });
  const auth = useAuth();

  useEffect(() => {
    getDataComment({
      ...pageSize,
      API_FN: blogService.getAllFeedbackByBlog({ ...pageSize, blogId }),
    });
  }, [blogId]);

  const paginationData = () => {
    setPageSize({
      ...pageSize,
      page: pageSize.page + 1,
    });
    setIsLoading(true);
    setTimeout(() => {
      getDataComment({
        ...pageSize,
        API_FN: blogService.getAllFeedbackByBlog({ ...pageSize, blogId }),
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentId", auth?.user?.id);
    formData.append("subjectId", blogId);
    formData.append("content", postComment.value);
    formData.append("pending", auth?.user?.role === "STUDENT" ? false : true);
    postComment.images.forEach((image) => formData.append("images", image));

    const response = await blogService.addFeedbackBlog({ data: formData });
    if (response.data?.status === "OK") {
      addComment({
        studentId: auth?.user?.id,
        subjectId: blogId,
        content: postComment.value,
        userName: auth?.user?.name,
        userRole:auth?.user?.role,
        pending: false,
        images: postComment.images,
        createDate: moment(Date.now()).format("YYYY-MM-DD"),
      });
      toast.success("Đăng bình luận thành công!");
      setPostComment({
        value: "",
        images: []
      });
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <div className="bg-white mt-10 pb-6">
      <h3 className="my-2 mx-4 py-4 font-medium text-[20px]">Bình luận</h3>
      <Suspense fallback="">
        <InputComponent
          postComment={postComment}
          setPostComment={setPostComment}
          handlePost={handlePost}
        />
      </Suspense>
      <div className="max-h-[40rem] overflow-y-auto">
        {rootComment != null && rootComment.length > 0 && (
          <CommentList comments={rootComment} />
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
