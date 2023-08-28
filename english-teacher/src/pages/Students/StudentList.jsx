import React, { useState, useEffect } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import StudentDetailShow from "./StudentDetailShow";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import { studentService } from "../../services/user";

const StudentList = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [dataUserDetail, setDataUserDetail] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [pageSize, setPageSize] = useState({ size: 100, page: 1 });
  const [dataStudents, setDataStudents] = useState([]);
  const auth = useAuth();
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      teacherId: auth.user.id,
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    if (!!dataCourses) {
      setCourseId(dataCourses?.data?.data[0]?.id);
    }
  }, [dataCourses]);

  useEffect(() => {
    const fetch = async () => {
      const controller = new AbortController();
      if (courseId) {
        const { data } = await studentService.getAllUserByCourse({
          courseId: courseId,
          page: 1,
          size: pageSize.size,
          option: { signal: controller.signal },
        });
        setDataStudents(data.data);
        controller.abort();
      }
    };
    fetch();
  }, [courseId]);

  const columns = [
    {
      field: "id",
      headerAlign: "center",
      headerName: "Mã Học viên",
      align: "center",
    },
    {
      field: "teacher",
      headerName: "Tên Học Viên",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center gap-x-[1rem]">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={params?.row?.image}
              alt=""
            />
            {params.row.name.length < 20
              ? params.row.name
              : `${params.row.name.substring(0, 20)}...`}
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "Số Điện Thoại",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
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
            {/* <span className="cursor-pointer" onClick={handleDelete}>
              <BsTrash className="text-red-600 w-8 h-8" />
            </span> */}
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleDelete = async (params) => {
    setIsShowDrawer(false);
    // const { data } = await lessonService.deleteLesson(params.row.id);
    // if (data.status === "OK") {
    //   toast.success("Xóa lesson thành công!");
    // } else {
    //   toast.error("Có lỗi!");
    // }
  };

  const handleRowClick = (params) => {
    setDataUserDetail(params.row);
    setIsShowDrawer(true);
  };

  if (isLoadingCourses) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Học viên " />
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
              {dataCourses?.data?.data?.map((item, index) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          {/* <Link to={"/lesson/create"}>
            <ButtonMainAction content={"Thêm lesson"} />
          </Link> */}
        </div>
        <TableGrid
          data={dataStudents}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
          getRowId={(row) => row.id}
        />
        <StudentDetailShow
          studentData={dataUserDetail}
          isShowDrawer={isShowDrawer}
          setIsShowDrawer={setIsShowDrawer}
        />
      </div>
    </div>
  );
};

export default StudentList;
