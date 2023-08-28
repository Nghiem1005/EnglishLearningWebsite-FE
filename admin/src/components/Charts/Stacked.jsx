import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../../contexts/ContextProvider";

const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 1000000,
  maximum: 20000000,
  interval: 2000000,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}",
};

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: "Rotate45",
  valueType: "Category",
};

const Stacked = ({ width, height, data }) => {
  const { currentMode } = useStateContext();
  const revenueCourseVideo = data.reduce((acc, course) => [
    ...acc,
    { x: course.time, y: course.revenueCourseVideo },
  ], []);
  const revenueCourseWithTeacher = data.reduce((acc, course) => [
    ...acc,
    { x: course.time, y: course.revenueCourseTeacher },
  ], []);

  const stackedCustomSeries = [
    {
      dataSource: revenueCourseVideo.reverse(),
      xName: "x",
      yName: "y",
      name: "CourseVideo",
      type: "StackingColumn",
      background: "blue",
    },

    {
      dataSource: revenueCourseWithTeacher.reverse(),
      xName: "x",
      yName: "y",
      name: "CourseWithTeacher",
      type: "StackingColumn",
      background: "red",
    },
  ];
  
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
