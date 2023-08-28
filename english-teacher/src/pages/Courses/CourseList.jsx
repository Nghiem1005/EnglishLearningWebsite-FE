import React, { useEffect, useState } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { BsTrash } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authProvider";
import { useLocationQuery } from "../../hooks";
import DeleteCourse from "./Delete/DeleteCourse";
import avatar from "../../data/avatar.jpg";

const CourseList = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const auth = useAuth();
  const query = useLocationQuery();
  const code = query.get("code");
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      teacherId: auth?.user?.id,
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    r1();
  }, []);

  useEffect(() => {
    if (code) {
      localStorage.setItem("code_teacher", JSON.stringify(code));
    }
  }, [code]);

  const columns = [
    {
      field: "id",
      width: 100,
      headerAlign: "center",
      headerName: "Mã khóa học",
      align: "center",
    },
    {
      field: "course",
      headerName: "Tên khóa học",
      width: 200,
      headerAlign: "cestartnter",
      align: "start",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-start gap-x-[1rem]">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={params?.row?.thumbnail}
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
      field: "type",
      headerName: "Loại khóa học",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pointTarget",
      headerName: "Mục tiêu khóa học",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description.oke",
      headerName: "Mô tả",
      width: 150,
      headerAlign: "center",
      align: "start",
      renderCell: (params) => (
        <span
          dangerouslySetInnerHTML={{ __html: params.row.description }}
        ></span>
      ),
    },
    {
      field: "price",
      headerName: "Giá khóa học",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `${params.row.price.toLocaleString()} VND`,
    },
    {
      field: "teacherName",
      headerName: "Giảng viên phụ trách",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.teacher ? (
          <div className="flex items-center justify-center gap-x-[1rem]">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={params?.row?.teacher?.image || avatar}
              alt=""
            />
            {params.row.teacher.name}
          </div>
        ) : (
          "Chưa có giáo viên phụ trách"
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-x-2">
            <Link to={`/course/${params.row.id}/edit`}>
              <TfiWrite className="text-blue-600 w-8 h-8" />
            </Link>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(params)}
            >
              <BsTrash className="text-red-600 w-8 h-8" />
            </span>
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
    },
  ];

  useEffect(() => {
    if (dataCourses) {
      setData(dataCourses.data.data);
    }
  }, [dataCourses]);

  const handleDelete = async (params) => {
    const { data } = await courseService.deleteCourse({
      courseId: params.row.id,
      code,
    });
    if (data.status === "OK") {
      toast.success("Xóa khóa học thành công!");
      r1();
    } else {
      toast.error("Có lỗi!");
    }
  };

  if (isLoadingCourses) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex items-center justify-between w-full mt-1 mb-4">
          <Header title="Khóa học" />
          <Link to={"/course/create"}>
            <ButtonMainAction content={"Thêm khóa học"} />
          </Link>
        </div>
        <div className="h-[68vh]">
          <TableGrid
            data={data}
            columns={columns}
            pageSize={pageSize}
            setPageSize={setPageSize}
            getRowId={(row) => row.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseList;
