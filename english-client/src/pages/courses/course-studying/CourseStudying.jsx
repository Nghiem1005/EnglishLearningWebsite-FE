import React, { useEffect, useState } from "react";
import { thunkLessonTypes } from "../../../constants/thunkTypes";
import { lessonService } from "../../../services/lesson";
import { useQueryCustom } from "../../../hooks";
import { NavLink, useLocation, useParams } from "react-router-dom";
import PracticeLesson from "./PracticeOfLesson/PracticeLesson";
import FeedbackCourse from "./FeedbackCourse/FeedbackCourse";
import CourseOverview from "./CourseOverview/CourseOverview";
import { useAuth } from "../../../contexts/authProvider";

const CourseStudying = () => {
  const [lessonId, setLessonId] = useState(null);
  const [hashLocation, setHashLocation] = useState(null);
  const [videoLessonWatchingUrl, setVideoLessonWatchingUrl] = useState(null);
  const { courseId, lectureId } = useParams();
  const location = useLocation();
  const auth = useAuth();
  const {
    isLoading: isLoadingLessons,
    data: dataLessons,
    refetch: r2,
  } = useQueryCustom(thunkLessonTypes.GETALL_LESSON, () =>
    lessonService.getAllLessonByCourse({
      size: 1000,
      page: 1,
      courseId,
    })
  );
  const {
    isLoading: isLoadingLesson,
    data: dataLesson,
    refetch: r1,
  } = useQueryCustom(thunkLessonTypes.GET_LESSON, () =>
    lessonService.getLesson({
      lessonId: lectureId,
    })
  );
  const links = [
    {
      link: `/my-course/course/${courseId}/learn/lecture/${lectureId}#overview`,
      name: "Tổng quan",
      hash: "#overview",
    },
    {
      link: `/my-course/course/${courseId}/learn/lecture/${lectureId}#feedback`,
      name: "Q&A",
      hash: "#feedback",
    },
    {
      link: `/my-course/course/${courseId}/learn/lecture/${lectureId}#practice`,
      name: "Bài tập",
      hash: "#practice",
    },
  ];

  useEffect(() => {
    if (location.hash) {
      setHashLocation(location.hash);
    }
    r2();
    r1();
  }, []);

  useEffect(() => {
    if (lectureId) {
      setLessonId(lectureId);
      r1();
    }
  }, [lectureId]);

  useEffect(() => {
    if (dataLesson?.lesson?.document) {
      setVideoLessonWatchingUrl(dataLesson?.lesson?.document);
    } else {
      setVideoLessonWatchingUrl(null);
    }
  }, [dataLesson]);

  useEffect(() => {
    if (location.hash) {
      setHashLocation(location.hash);
    }
  }, [location.hash]);

  if (isLoadingLessons || isLoadingLesson) return;

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className=" w-full md:w-8/12 lg:w-9/12">
        <div
          className={`${
            videoLessonWatchingUrl ? "h-[300px] lg:h-[500px]" : "h-[100px]"
          } w-full bg-white`}
        >
          {videoLessonWatchingUrl ? (
            <video
              className="w-full h-full"
              // height={00}
              controls
              src={videoLessonWatchingUrl}
            />
          ) : dataLesson?.schedule ? (
            <div className="mt-1 ml-2">
              <p>{dataLesson?.schedule?.title}</p>
            </div>
          ) : (
            <span className="p-4 block">
              Bài học này hiện tại chưa có thông tin.
            </span>
          )}
        </div>
        <div className="bg-white min-h-[200px]">
          <div className="h-[auto] md:h-[60px] w-full pt-[30px] px-[30px] border-b pb-[30px]">
            <ul className="flex gap-x-[20px] transition-none">
              {links.map((link, index) => (
                <li
                  key={index}
                  className="text-black font-[500] cursor-pointer hover:text-[#1eb2a6] transition-none"
                >
                  <a
                    className={`${
                      hashLocation === link.hash
                        ? "border-b-4 border-black"
                        : "border-none"
                    } text-black text-[20px] font-bold`}
                    href={link.link}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="pl-[30px]">
            {hashLocation === "#overview" ? (
              <CourseOverview courseId={courseId} description={dataLesson?.lesson?.description}/>
            ) : hashLocation === "#feedback" ? (
              <FeedbackCourse
                courseId={courseId}
                studentId={auth.user.id}
                lessonId={lectureId}
              />
            ) : hashLocation === "#practice" ? (
              <PracticeLesson practiceData={dataLesson?.practice} lessonId={lectureId}/>
            ) : null}
          </div>
        </div>
      </div>
      <div className="w-full md:w-4/12 lg:w-3/12 bg-white border-l">
        <h4 className="px-4 py-6 font-bold text-[20px] uppercase border-b">
          Nội dung khóa học
        </h4>
        <ul className="flex flex-col">
          {dataLessons?.data?.data &&
            dataLessons?.data?.data?.map((lesson) => (
              <li key={lesson.id}>
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "bg-gray-200 " : "bg-white"} px-6 py-4 block`
                  }
                  to={`/my-course/course/${courseId}/learn/lecture/${lesson.id}${location.hash}`}
                >
                  {lesson.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseStudying;
