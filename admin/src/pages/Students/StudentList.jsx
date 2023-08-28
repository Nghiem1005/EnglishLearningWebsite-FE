import React, { useState, useEffect } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import StudentDetailShow from "./StudentDetailShow";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { studentService, userCommonService } from "../../services/user";
import { TfiWrite } from "react-icons/tfi";

const StudentList = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [dataUserDetail, setDataUserDetail] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const [dataStudents, setDataStudents] = useState([]);
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    if (!!dataCourses) {
      setCourseId(dataCourses.data.data[0].id);
    }
  }, [dataCourses]);

  useEffect(() => {
    const fetch = async () => {
      const controller = new AbortController();
      if (courseId) {
        const { data } = await studentService.getAllUserByCourse({
          courseId: courseId,
          ...pageSize,
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
      headerName: "Mã Học Viên",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên Học Viên",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-center gap-x-[1rem]">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={params?.row?.image || "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"}
              alt=""
            />
            {params.row.name.length < 20
              ? params.row.name
              : `${params.row.name.substring(0, 20)}...`}
          </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "enable",
      headerName: "Trạng thái",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span
          className={`${
            params.row.enable ? "bg-green-500" : "bg-red-500"
          } py-[4px] px-[6px] rounded-sm text-white text-center`}
        >
          {params.row.enable ? "Đang hoạt động" : "Ngừng hoạt động"}
        </span>
      ),
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
            <Link to={`/student/${params.row.id}/edit`}>
              <TfiWrite className="text-blue-600 w-8 h-8" />
            </Link>
            <span className="cursor-pointer" onClick={handleDelete}>
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
    setIsShowDrawer(false);
    const { data } = await userCommonService.deleteUser(params.row.id);
    if (data.status === "OK") {
      toast.success("Xóa học viên thành công!");
    } else {
      toast.error("Có lỗi!");
    }
  };

  const handleRowClick = (params) => {
    setDataUserDetail(params.row);
    setIsShowDrawer(true);
  };

  if (isLoadingCourses) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Học viên" />
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
          <Link to={"/student/create"}>
            <ButtonMainAction content={"Thêm học viên"} />
          </Link>
        </div>
        <TableGrid
          data={dataStudents}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
          getRowId={(row) => row.id}
        />
        <StudentDetailShow
          data={dataUserDetail}
          isShowDrawer={isShowDrawer}
          setIsShowDrawer={setIsShowDrawer}
        />
      </div>
    </div>
  );
};

export default StudentList;
