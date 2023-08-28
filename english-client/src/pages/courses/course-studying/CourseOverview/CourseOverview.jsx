import { Box } from "@mui/material";
import React, { useRef } from "react";
import { AiFillFileWord } from "react-icons/ai";
import { thunkCourseTypes } from "../../../../constants/thunkTypes";
import { useAuth } from "../../../../contexts/authProvider";
import { useQueryCustom } from "../../../../hooks";
import { courseService } from "../../../../services/course";
import "../FeedbackCourse/FeedbackCourse.css";

const CourseOverview = ({ courseId, description }) => {
  const auth = useAuth();
  const ref = useRef();
  const {
    isLoading: isLoadingCourse,
    data: dataCourse,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GET_COURSE, () =>
    courseService.getCourse({
      courseId,
      userId: auth.user.id,
    })
  );

  const handleDownloadDocument = async (document) => {
    const response = await courseService.downloadDocumentOfCourse({ document });
    ref.current.href = response.data;
    ref.current.click();
  };

  if (isLoadingCourse) return;
  return (
    <>
      <div
        className="min-h-[100px] max-h-[600px] overflow-y-auto p-2 pb-4"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className="pb-4">
        <h4>Tài liệu khóa học:</h4>
        <ul>
          {dataCourse?.document?.map((document, index) => (
            <li
              key={index}
              className="p-1 text-blue-600 bg-gray-100 rounded-sm cursor-pointer"
            >
              <a className="flex items-center gap-x-1" href={document} download>
                <AiFillFileWord size={16}/>
                {document.split("/")?.slice(-1).toString().length < 40 ? document.split("/")?.slice(-1) : document.split("/")?.slice(-1).toString().slice(0, 40) + '...'}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CourseOverview;
