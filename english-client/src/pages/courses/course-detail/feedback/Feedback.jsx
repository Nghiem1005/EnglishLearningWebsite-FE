import React, { useState } from "react";
import "./Feedback.css";
import CommentSection from "./CommentSection";

const Feedback = ({ courseId, isShowInputComment }) => {

  return (
    <CommentSection courseId={courseId} isShowInputComment={isShowInputComment} />
  );
};

export default Feedback;
