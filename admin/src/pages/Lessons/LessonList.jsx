import React, { useState, useEffect } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import PracticeDetailShow from "./PracticeDetailShow";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import { lessonService } from "../../services/lesson";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const LessonList = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [courseId, setCourseId] = useState(null);
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const [dataLessons, setDataLessons] = useState([]);
  const auth = useAuth();
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    if (dataCourses) {
      setCourseId(dataCourses.data.data[0].id);
    }
  }, [dataCourses]);

  useEffect(() => {
    const fetch = async () => {
      const controller = new AbortController();
      if (courseId) {
        const { data } = await lessonService.getAllLessonByCourse({
          courseId: courseId,
          size: 1000,
          page: 1,
          option: { signal: controller.signal },
        });
        setDataLessons(data.data);
        controller.abort();
      }
    };
    fetch();
  }, [courseId]);

  const columns = [
    {
      field: "id",
      headerAlign: "center",
      headerName: "Mã Lesson",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên Lesson",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "courseName",
      headerName: "Khóa học",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "teacherName",
      headerName: "Giảng viên phụ trách",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-x-2">
            <span
              className="px-3 py-1 place-content-center
              bg-cyan-700 text-white rounded-[8px] cursor-pointer"
              onClick={() => handleRowClick(params)}
            >
              Chi tiết
            </span>
            <span className="cursor-pointer" onClick={() => handleDelete(params)}>
              <BsTrash className="text-red-600 w-8 h-8" />
            </span>
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleDelete = async (params) => {
    const { data } = await lessonService.deleteLesson(params.row.id);
    if (data.status === "OK") {
      toast.success("Xóa lesson thành công!");
    } else {
      toast.error("Có lỗi!");
    }
  };

  const handleRowClick = (params) => {
    setDataShowDetail(params.row);
    setIsShowDetail(true);
  };

  if (isLoadingCourses) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Lesson" />
        <div className="flex items-center justify-between w-full mt-1 mb-4">
          <label className="w-6/12 md:w-4/12 text-sm font-medium text-gray-700 flex md:flex-row flex-col gap-x-3 items-start md:items-center">
            Khóa học:
            <select
              id="category"
              className={`w-9/12 md:w-9/12 rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-[${"currentColor"}] focus:ring-[${"currentColor"}] focus:outline-none sm:text-sm`}
              onChange={(e) => setCourseId(e.target.value)}
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Chọn khóa học
              </option>
              {dataCourses?.data?.data?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <Link to={"/lesson/create"}>
            <ButtonMainAction content={"Thêm lesson"} />
          </Link>
        </div>
        <TableGrid
          data={dataLessons}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
          getRowId={(row) => row.id}
        />
        {isShowDetail ? (
          <PracticeDetailShow
            data={dataShowDetail}
            setIsShowDetail={setIsShowDetail}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LessonList;

