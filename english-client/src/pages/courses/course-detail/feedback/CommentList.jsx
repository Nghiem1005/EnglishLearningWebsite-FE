import React from "react";
import Comment from "./Comment";

const CommentList = ({
  comments,
}) => {
  return comments.map((comment) => (
    <div
      key={comment.id}
      // className="border-l-[2px] h-full"
    >
      <Comment
        comment={comment}
      />
    </div>
  ));
};

export default CommentList;
