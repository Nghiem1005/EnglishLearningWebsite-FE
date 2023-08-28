import React, { useEffect, useState } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import { lessonService } from "../../services/lesson";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { BsTrash } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authProvider";

const CourseList = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [data, setData] = useState([]);
  const auth = useAuth()
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const {
    isLoading: isLoadingCourses,
    data: dataCourses,
    refetch: r1,
  } = useQueryCustom(thunkCourseTypes.GETALL_COURSE, () =>
    courseService.getAllCourse({
      size: 1000,
      page: 1,
      userId: auth?.user?.id
    })
  );

  useEffect(() => {
    r1();
  }, []);

  useEffect(() => {
    if (dataCourses) {
      setData(dataCourses.data.data);
    }
  }, [dataCourses]);

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
      headerAlign: "center",
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
              src={
                params?.row?.teacher?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7f1RdMtPN3AkxLTXMCP-eJ2UEiYzg7hpYacuJaboWpAWKrjN6tAsre1lfLAgQD9U9U&usqp=CAU"
              }
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

export default CourseList;
