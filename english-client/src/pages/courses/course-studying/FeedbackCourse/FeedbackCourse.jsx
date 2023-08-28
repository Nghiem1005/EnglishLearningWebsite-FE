import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import "./FeedbackCourse.css";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import { FiMoreHorizontal } from "react-icons/fi";
// import { feedbackService } from "../../../../services/feedback";
import { toast } from "react-toastify";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";

const FeedbackCourse = ({
  pageSizeFeedback,
  dataFeedbacks,
  getListFeedback,
  courseId,
  studentId,
  lessonId
}) => {
  const [dataFeedback, setDataFeedback] = useState({ vote: null, content: "" });
  const [indexComment, setIndexComment] = useState(null);
  const [hover, setHover] = useState(false);
  const textRef = useRef();
  const messageRef = useRef();
  
  const showOptionComment = (index) => {
    setHover(true);
    setIndexComment(index);
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    // if (dataFeedback.content === "") {
    //   messageRef.current.innerText = "Trường nội dung là bắt buộc";
    // } else {
    //   const { data } = await feedbackService.addFeedback({ studentId, courseId, content: dataFeedback.content });
    //   if (data.status === "OK") {
    //     setDataFeedback({ content: "", vote: 0 });
    //     getListFeedback()
    //     toast.success("Đánh giá khóa học thành công");
    //   } else {
    //     toast.error('Có lỗi');
    //   }
    // }
  };

  return (
    <>
      <div id="scroll-feedback" className="min-h-[300px] max-h-[400px] scroll">
        <CommentSection lessonId={lessonId}/>
        {/* <InfiniteScroll
          dataLength={dataFeedbacks.data.length}
          next={getListFeedback}
          hasMore={pageSizeFeedback.page < dataFeedbacks.totalPage}
          loader={
            pageSizeFeedback.page == dataFeedbacks.totalPage ? null : (
              <span>loading...</span>
            )
          }
          scrollableTarget={"scroll-feedback"}
        >
          {dataFeedbacks.data.length > 0 ? (
            dataFeedbacks.data.map((feedback, index) => (
              <div className="post__comment" key={index}>
                <div className="a">
                  <Avatar
                    className="header-user-img"
                    alt="me"
                    src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                  />
                  <h3 className="comment-username">{feedback.studentName}</h3>
                </div>
                <div style={{ marginLeft: "50px" }}>
                  <span className="comment-caption">{feedback.content}</span>
                </div>
                <div
                  className="a"
                  onMouseMove={() => showOptionComment(index)}
                  onMouseOut={() => setHover(false)}
                >
                  <span className="comment-time">
                    {feedback.createDate
                      ? moment(feedback.createDate).fromNow()
                      : null}
                  </span>
                  <span className="comment-like">3 likes</span>
                  <a className="comment-reply" href="##">
                    Report
                  </a>
                  <FiMoreHorizontal
                    className={
                      index === indexComment && hover ? "block" : "none"
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <span>Chưa có phản hồi nào.</span>
          )}
        </InfiniteScroll> */}
      </div>
      {/* <section className="post__comment-create">
        <div className="comment-create__wrapper">
          <form onSubmit={onSubmit}>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">Đánh giá của bạn về bài học</Typography>
              <Rating
                name="simple-controlled"
                value={dataFeedback.vote}
                onChange={(event, newValue) =>
                  setDataFeedback({ ...dataFeedback, vote: newValue })
                }
              />
            </Box>
            <label className="input-sizer stacked">
              <textarea
              className="rounded-sm"
                placeholder="Enter comment..."
                ref={textRef}
                value={dataFeedback.content}
                onChange={(e) =>
                  setDataFeedback({
                    ...dataFeedback,
                    content: e.target.value,
                  })
                }
                onKeyDownCapture={(e) => {
                  textRef.current.style.height = "auto";
                  textRef.current.style.height =
                    textRef.current.scrollHeight + "px";
                }}
              ></textarea>
            </label>
            <br />
            <div className="text-[12px] text-red" ref={messageRef}></div>
            <button className="px-4 py-2 bg-[#1eb2a6] mt-4 text-white hover:bg-[#1eb2a6]/90" type="submit">
              Đăng
            </button>
          </form>
        </div>
      </section> */}
    </>
  );
};

export default FeedbackCourse;
