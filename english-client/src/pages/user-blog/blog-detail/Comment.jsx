import React, { useState } from "react";
import CommentList from "./CommentList";
import { useCommentContext } from "../../../contexts/postProvider";
import InputComponent from "../../../components/Input/InputComponent";
import { toast } from "react-toastify";
import { blogService } from "../../../services/blog";
import { useAuth } from "../../../contexts/authProvider";
import { useParams } from "react-router-dom";
import moment from "moment";
const CommentComponent = React.lazy(() => import("../../../components/Comment/CommentComponent"));

const Comment = ({
  comment,
}) => {
  const [postChildComment, setPostChildComment] = useState({
    isReplyComment: false,
    indexParenComment: null,
    value: "",
    images: []
  });
  const auth = useAuth();
  const { blogId } = useParams();
  const { getReplies, addComment } = useCommentContext();
  const childComments = getReplies(comment?.id);

  const handlePostChild = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentId", auth?.user?.id);
    formData.append("subjectId", blogId);
    formData.append("content", postChildComment.value);
    formData.append("mainDiscuss", postChildComment.indexParenComment);
    const response = await blogService.addFeedbackBlog({ data: formData });
    if (response.data?.status === "OK") {
      addComment({
        studentId: auth?.user?.id,
        subjectId: blogId,
        content: postChildComment.value,
        userName: auth?.user?.name,
        userRole: auth?.user?.role,
        pending: false,
        images: postChildComment.images,
        createDate: moment(Date.now()).format("YYYY-MM-DD"),
        mainDiscuss: { id: postChildComment.indexParenComment },
      });
      toast.success("Đăng bình luận thành công!");
      setPostChildComment({
        images: [],
        value: "",
        indexParenComment: null,
        isReplyComment: false,
      });
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <>
      <CommentComponent
        dataItem={comment}
        setPostChildComment={setPostChildComment}
        postChildComment={postChildComment}
      />
      {postChildComment.isReplyComment && (
        <div className="ml-6 mb-2">
          <InputComponent
          key={postChildComment.indexParenComment}
          postComment={postChildComment}
          setPostComment={setPostChildComment}
          handlePost={handlePostChild}
        />
        </div>
      )}
      {childComments.length > 0 && (
        <>
          <div>
            <div className="ml-8">
              <CommentList comments={childComments} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
