import React from "react";
import CourseItem from "../../../components/Course/CourseItem";
import { thunkCourseLearningTypes } from "../../../constants/thunkTypes";
import { useAuth } from "../../../contexts/authProvider";
import { useQueryCustom } from "../../../hooks";
import { billService } from "../../../services/bill";

const MyLearning = () => {
  const auth = useAuth();
  const {
    isLoading: isLoadingCoursesLearning,
    data: dataCoursesLearning,
    refetch: r1,
  } = useQueryCustom(thunkCourseLearningTypes.GETALL_COURSE_LEARNING, () =>
    billService.getAllBillByUser({
      userId: auth?.user?.id,
    })
  );

  if (isLoadingCoursesLearning) return;

  return (
    <div className="gap-[16px] flex flex-wrap justify-start"> {/* grid grid-cols-auto-fit-12rem md:grid-cols-auto-fit-16rem */}
      {dataCoursesLearning?.length > 0 ? (
        dataCoursesLearning?.map((course, index) => (
          <CourseItem key={index} dataCourse={course.course} index={index}/>
        ))
      ) : (
        <span>Bạn chưa mua khóa học nào.</span>
      )}
    </div>
  );
};

export default MyLearning;
