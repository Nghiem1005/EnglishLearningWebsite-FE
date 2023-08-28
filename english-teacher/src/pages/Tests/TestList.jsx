import React, { useEffect, useState } from "react";
import TableGrid from "../../components/TableGrid";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import { examService } from "../../services/exam";
import { useQueryCustom } from "../../hooks";
import { thunkTestTypes } from "../../constants/thunkTypes";
import { TfiWrite } from "react-icons/tfi";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import PracticeDetailShow from "./PracticeDetailShow";

const TestList = () => {
  const [data, setData] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const {
    isLoading,
    data: dataCourses,
    refetch: r1,
  } = useQueryCustom(thunkTestTypes.GETALL_TEST, () =>
    examService.getAllListExams({
      size: 1000,
      page: 1,
    })
  );

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
      headerName: "Mã bài thi",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên bài thi",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "period",
      headerName: "Tên bài thi",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => <span>{params.row.period / 60} phút</span>,
    },
    {
      field: "partResponseDTOS",
      headerName: "Phần bài tập",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span>{params.row?.partResponseDTOS?.length} phần</span>
      ),
    },
    {
      field: "totalQuestion",
      headerName: "Câu hỏi",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <span>{params.row?.totalQuestion} câu hỏi</span>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
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

  const handleRowClick = (params) => {
    setDataShowDetail(params.row);
    setIsShowDetail(true);
  };

  const handleDelete = async (params) => {
    const { data } = await examService.deleteExam({ testId: params.row.id });
    if (data.status === "OK") {
      toast.success("Xóa bài thi thành công!");
      r1();
    } else {
      toast.error("Có lỗi!");
    }
  };

  if (isLoading) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex items-center justify-between w-full mt-1 mb-4">
          <Header title="Bài thi" />
          <Link to={"/test/create"}>
            <ButtonMainAction content={"Thêm bài thi"} />
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
            refetch={r1}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TestList;
