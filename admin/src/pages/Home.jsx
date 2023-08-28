import React, { useEffect } from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import { useQueryCustom } from "../hooks/useQueryCustom";
import { thunkStatisticTypes } from "../constants/thunkTypes";
import { statisticService } from "../services/statistic";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const {
    isLoading: isLoadingStatisticGeneral,
    data: dataStatisticGeneral,
    refetch: r1,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_GENERAL,
    statisticService.getStatisticGeneral
  );

  const {
    isLoading: isLoadingStatisticAllPerDay,
    data: dataStatisticAllPerDay,
    refetch: r2,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_ALL_PER_DAY,
    statisticService.getStatisticAllByDay
  );

  const {
    isLoading: isLoadingStatisticCourseBestSeller,
    data: dataStatisticCourseBestSeller,
    refetch: r3,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_COURSE_SELLER,
    statisticService.getStatisticCourseSeller
  );

  const {
    isLoading: isLoadingStatisticCourseDetailSeller,
    data: dataStatisticCourseDetailSeller,
    refetch: r4,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_COURSE_INFO,
    statisticService.getStatisticSoldByCourse
  );


  const revenueCourse = dataStatisticAllPerDay?.data?.data?.reduce(
    (acc, course) => acc + course.revenueCourseVideo,
    0
  );
  const revenueWithTeacher = dataStatisticAllPerDay?.data?.data?.reduce(
    (acc, course) => acc + course.revenueCourseTeacher,
    0
  );

  const revenue7Day = dataStatisticAllPerDay?.data?.data.reduce(
    (acc, course, index) => [
      ...acc,
      { x: course.time, yval: course.revenueTotal },
    ],
    []
  );
  useEffect(() => {
    r1();
    r2();
    r3();
    r4();
    // const intervalId = setInterval(() => {
    //   r1();
    //   r2();
    //   r3();
    //   r4();
    // }, 1000);
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  if (
    isLoadingStatisticAllPerDay ||
    isLoadingStatisticCourseBestSeller ||
    isLoadingStatisticCourseDetailSeller ||
    isLoadingStatisticGeneral
  )
    return;
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 lg:h-auto rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Tổng doanh thu</p>
              <p className="text-2xl">
                {String(dataStatisticGeneral?.data?.data?.revenue).length < 11
                  ? dataStatisticGeneral.data.data.revenue.toLocaleString()
                  : String(dataStatisticGeneral.data.data.revenue).slice(
                      0,
                      -3
                    )}{" "}
                đ
              </p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Tuyệt vời"
              borderRadius="10px"
            />
          </div>
        </div> */}
        <div className="flex m-3 flex-wrap w-full justify-evenly gap-1 items-center">
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Doanh thu (7 ngày gần nhất)</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>CourseWithTeacher</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>CourseVideo</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-xl font-semibold">
                    {String(revenueCourse).length < 11
                      ? revenueCourse.toLocaleString()
                      : String(revenueCourse).slice(0, -3)}{" "}
                    đ
                  </span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    {((revenueCourse * 100) /
                      (revenueCourse + revenueWithTeacher)).toFixed(2)}
                    %
                  </span>
                </p>
                <p className="text-gray-500 mt-1">CourseVideo</p>
              </div>
              <div className="mt-8">
                <p>
                  <span className="text-xl font-semibold">
                    {String(revenueWithTeacher).length < 11
                      ? revenueWithTeacher.toLocaleString()
                      : String(revenueWithTeacher).slice(0, -3)}
                    đ
                  </span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-blue-400 ml-3 text-xs">
                    {((revenueWithTeacher * 100) /
                      (revenueCourse + revenueWithTeacher)).toFixed(2)}
                    %
                  </span>
                </p>
                <p className="text-gray-500 mt-1">CourseWithTeacher</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={revenue7Day.reverse()}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Doanh thu tổng 7 ngày"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked
                data={dataStatisticAllPerDay?.data?.data}
                currentMode={currentMode}
                width="320px"
                height="360px"
              />
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-400">
          <div
            className=" rounded-2xl p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  $63,448.78
                </p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div> */}
      </div>


      {/* <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Weekly Stats</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="area-sparkLine"
                height="160px"
                type="Area"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">MedicalPro Branding</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-400"
            >
              <IoIosMore />
            </button>
          </div>
          <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
            16 APR, 2021
          </p>

          <div className="flex gap-4 border-b-1 border-color mt-6">
            {medicalproBranding.data.map((item) => (
              <div
                key={item.title}
                className="border-r-1 border-color pr-4 pb-2"
              >
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="border-b-1 border-color pb-4 mt-2">
            <p className="text-md font-semibold mb-2">Teams</p>

            <div className="flex gap-4">
              {medicalproBranding.teams.map((item) => (
                <p
                  key={item.name}
                  style={{ background: item.color }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-md font-semibold mb-2">Leaders</p>
            <div className="flex gap-4">
              {medicalproBranding.leaders.map((item, index) => (
                <img
                  key={index}
                  className="rounded-full w-8 h-8"
                  src={item.image}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Daily Activities</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img className="md:w-96 h-50 " src={product9} alt="" />
            <div className="mt-8">
              <p className="font-semibold text-lg">React 18 coming soon!</p>
              <p className="text-gray-400 ">By Johnathan Doe</p>
              <p className="mt-8 text-sm text-gray-400">
                This will be the small description for the news you have shown
                here. There could be some great info.
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Read More"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Ecommerce;