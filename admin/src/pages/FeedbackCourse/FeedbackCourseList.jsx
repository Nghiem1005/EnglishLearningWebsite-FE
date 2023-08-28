import React, { useState, useEffect } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import FeedbackDetailShow from "./FeedbackDetailShow";

const FeedbackCourseList = () => {
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [dataFeedback, setDataFeedback] = useState({
    dataFeedback: [],
    courseId: null,
    pending: null,
  });
  const { isLoading, data: dataFeedbacks, refetch } = useQueryCustom(
    thunkCourseTypes.GET_EVALUATES_BY_COURSE,
    () =>
      courseService.getAllEvaluatesCourse({
        size: 1000,
        page: 1,
      })
  );

  const { isLoading: isLoadingCourse, data: dataCourse } = useQueryCustom(
    thunkCourseTypes.GETALL_COURSE,
    () =>
      courseService.getAllCourse({
        size: 1000,
        page: 1,
      })
  );

  useEffect(() => {
    if (dataFeedbacks?.data) {
      setDataFeedback({ ...dataFeedback, dataFeedback: dataFeedbacks.data });
    }
  }, [dataFeedbacks]);

  useEffect(() => {
    const fetch = async () => {
      const controller = new AbortController();
      if (dataFeedback.courseId) {
        if (dataFeedback.pending) {
          const response = await courseService.getAllPendingEvaluatesByCourse({
            courseId: dataFeedback.courseId,
            pending: dataFeedback.pending,
            page: 1,
            size: 1000,
            option: { signal: controller.signal },
          });
          setDataFeedback({ ...dataFeedback, dataFeedback: response?.data });
          controller.abort();
        } else {
          const response = await courseService.getAllEvaluatesByCourse({
            courseId: dataFeedback.courseId,
            page: 1,
            size: 1000,
            option: { signal: controller.signal },
          });
          setDataFeedback({ ...dataFeedback, dataFeedback: response?.data });
          controller.abort();
        }
      }
    };
    fetch();
  }, [dataFeedback.courseId, dataFeedback.pending]);

  const columns = [
    {
      field: "id",
      headerAlign: "center",
      width: 100,
      headerName: "Mã đánh giá",
      align: "center",
    },
    {
      field: "studentName",
      headerName: "Tên học viên ",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "subjectName",
      headerName: "Khóa học",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updateDate",
      headerName: "Chỉnh sửa gần nhất",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className={`px-2 py-[2px] place-content-center
      ${
        params.row?.pending ? "bg-[#d46565]" : "bg-[#e3c844]"
      } text-white rounded-md`}
        >
          {params.row?.pending ? "Chờ duyệt" : "Đã duyệt"}
        </div>
      ),
    },
    {
      field: "  ",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="flex items-center gap-x-2">
          <span
            className="px-3 py-1 place-content-center
        bg-cyan-700 text-white rounded-[8px] cursor-pointer"
            onClick={() => handleRowClick(params)}
          >
            Chi tiết
          </span>
        </div>
      ),
    },
  ];

  const handleRowClick = (params) => {
    setDataShowDetail(params.row);
    setIsShowDetail(true);
  };

  if (isLoading || isLoadingCourse) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Phản hồi khóa học" />
        <div className="w-full flex items-center gap-2 mt-1 mb-4">
          <label className="w-6/12 md:w-4/12 text-sm font-medium text-gray-700 flex lg:flex-row flex-col gap-x-1 items-start md:items-center">
            Khóa học:
            <select
              className="w-9/12 md:w-9/12 rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:outline-none sm:text-sm"
              onChange={(e) =>
                setDataFeedback({ ...dataFeedback, courseId: e.target.value })
              }
              defaultValue={"null"}
            >
              <option disabled value={"null"}>
                Chọn khóa học
              </option>
              {dataCourse?.data?.data?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="w-5/12 text-sm font-medium text-gray-700 flex lg:flex-row flex-col gap-x-1 items-start md:items-center">
            Chọn trạng thái:
            <select
              className="w-6/12 md:w-6/12 rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:outline-none sm:text-sm"
              defaultValue={"null"}
              onChange={(e) =>
                setDataFeedback({ ...dataFeedback, pending: e.target.value })
              }
            >
              <option disabled value={"null"}>
                Trạng thái
              </option>
              <option value={false}>Chờ duyệt</option>
              <option value={true}>Đã duyệt</option>
            </select>
          </label>
        </div>
        <TableGrid
          data={dataFeedback.dataFeedback}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        {isShowDetail ? (
          <FeedbackDetailShow
            data={dataShowDetail}
            isShowDetail={isShowDetail}
            reloadData={refetch}
            setIsShowDetail={setIsShowDetail}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FeedbackCourseList;
