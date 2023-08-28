import React, { useEffect, useState } from "react";
import AboutCard from "../about/AboutCard";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Testimonal from "./testimonal/Testimonal";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import { useQueryCustom } from "../../hooks";
import { useAuth } from "../../contexts/authProvider";

const Home = () => {
  const [data, setData] = useState(null);
  const auth = useAuth()
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      size: 1000,
      page: 1,
      userId: auth?.user?.id
    })
  );

  useEffect(() => {
    if (!!dataCourses?.data?.length > 0) {
      setData(dataCourses.data);
    }
  }, [dataCourses]);

  if (isLoadingCourses) return;

  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout dataCourse={data?.slice(0, 10)} userId={!!auth?.user?.id && auth.user.id}  refetch={refetch}/>
      <Testimonal />
    </>
  );
};

export default Home;
