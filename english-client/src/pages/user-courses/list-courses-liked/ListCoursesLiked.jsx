import React from "react";
import CourseItem from "../../../components/Course/CourseItem";
import { thunkCourseLearningTypes } from "../../../constants/thunkTypes";
import { useAuth } from "../../../contexts/authProvider";
import { useQueryCustom } from "../../../hooks";
import { billService } from "../../../services/bill";
import { courseService } from "../../../services/course";

const ListCoursesLiked = () => {
  const auth = useAuth();
  const {
    isLoading: isLoadingCoursesLearning,
    data: dataCoursesLearning,
    refetch,
  } = useQueryCustom(thunkCourseLearningTypes.GET_COURSE_LIKED, () =>
    courseService.getAllCourseLiked({ page: 1, size: 1000, userId: auth?.user?.id})
  );

  if (isLoadingCoursesLearning) return;

  console.log(dataCoursesLearning);
  return (
    <div className="gap-[16px] flex flex-wrap justify-start"> {/* grid grid-cols-auto-fit-12rem md:grid-cols-auto-fit-16rem */}
      {dataCoursesLearning?.data?.length > 0 ? (
        dataCoursesLearning?.data?.map((course, index) => (
          <CourseItem key={index} dataCourse={course} refetch={refetch} index={index} isOption={true}/>
        ))
      ) : (
        <span>Bạn chưa thích  học nào.</span>
      )}
    </div>
  );
};

export default ListCoursesLiked;
