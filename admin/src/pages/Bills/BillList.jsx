import React, { useState, useEffect } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import BillDetailShow from "./BillDetailShow";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkCourseTypes } from "../../constants/thunkTypes";
import { courseService } from "../../services/course";
import { billService } from "../../services/bill";
import moment from "moment";

const BillList = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [courseId, setCourseId] = useState(null);
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const [dataBills, setDataBills] = useState([]);
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
        const { data } = await billService.getAllBillByCourse({
          courseId: courseId,
          option: { signal: controller.signal },
        });
        setDataBills(data.data);
        controller.abort();
      }
    };
    fetch();
  }, [courseId]);

  const columns = [
    {
      field: "id",
      headerAlign: "center",
      headerName: "Mã Hóa Đơn",
      align: "center",
    },
    {
      field: "courseId",
      headerName: "Mã khóa học",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "studentName",
      headerName: "Học viên",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "totalPrice",
      headerName: "Thanh toán",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `đ${params.row.price.toLocaleString()}`
    },
    {
      field: "paymentMethod",
      headerName: "Phương thức thanh toán",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createDate",
      headerName: "Ngày mua",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => moment(params.row.payDate).format("DD-MM-YYYY"),
    },
  ];

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
        </div>
        <TableGrid
          data={dataBills}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
          getRowId={(row) => row.id}
          onRowClick={handleRowClick}
        />
          <BillDetailShow
          isShowDrawer={isShowDetail}
            data={dataShowDetail && dataShowDetail}
            setIsShowDrawer={setIsShowDetail}
          />
      </div>
    </div>
  );
};

export default BillList;
