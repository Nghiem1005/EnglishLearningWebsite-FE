import React, { useEffect, useState } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkTeacherTypes } from "../../constants/thunkTypes";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { BsTrash } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { toast } from "react-toastify";
import { teacherService, userCommonService } from "../../services/user";
import CreateTeacher from "./New/CreateTeacher";

const TeacherList = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const {
    isLoading: isLoadingTeacher,
    data: dataTeachers,
    refetch: r1,
  } = useQueryCustom(thunkTeacherTypes.GETALL_TEACHER, () =>
    teacherService.getAllTeacher({
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    r1();
  }, []);

  const columns = [
    {
      field: "teacherId",
      width: 100,
      headerAlign: "center",
      headerName: "Mã giảng viên",
      align: "center",
    },
    {
      field: "teacher",
      headerName: "Tên giảng viên",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center gap-x-[1rem]">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={
                params?.row?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7f1RdMtPN3AkxLTXMCP-eJ2UEiYzg7hpYacuJaboWpAWKrjN6tAsre1lfLAgQD9U9U&usqp=CAU"
              }
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
      field: "email",
      headerName: "Email giảng viên",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
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
      field: "coursesOfTeacher",
      headerName: "Khóa học phụ trách",
      width: 300,
      headerAlign: "center",
      renderCell: (params) =>
        params.row.courses.length > 0 ? (
          params.row.courses?.map((course) => (
            <span className="py-[4px] px-[6px] rounded-sm text-black text-center bg-gray-200 mr-[4px]">
              {course.name}
            </span>
          ))
        ) : (
          <span className="py-[4px] px-[6px] rounded-sm text-white text-center bg-red-500 mr-[4px]">
            Chưa phụ trách khóa học
          </span>
        ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-x-2">
            <Link to={`/teacher/${params.row.teacherId}/edit`}>
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
    if (dataTeachers) {
      setData(dataTeachers);
    }
  }, [dataTeachers]);

  const handleDelete = async (params) => {
    const { data } = await userCommonService.deleteUser({
      userId: params.row.teacherId,
    });
    if (data.status === "OK") {
      toast.success("Xóa giảng viên thành công!");
    } else {
      toast.error("Có lỗi!");
    }
  };

  if (isLoadingTeacher) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex items-center justify-between w-full mt-1 mb-4">
          <Header title="Giảng viên" />
          <div onClick={() => setIsShowModal(true)}>
            <ButtonMainAction content={"Thêm giảng viên"} />
          </div>
        </div>
        <div className="h-[68vh]">
          <TableGrid
            data={data}
            columns={columns}
            pageSize={pageSize}
            setPageSize={setPageSize}
            getRowId={(row) => row.teacherId}
          />
        </div>
        {isShowDetail ? (
          <PracticeDetailShow
            data={dataShowDetail}
            setIsShowDetail={setIsShowDetail}
          />
        ) : null}
      </div>
      <CreateTeacher
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </div>
  );
};

export default TeacherList;
