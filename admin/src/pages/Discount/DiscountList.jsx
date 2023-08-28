import React, { useState, useEffect } from "react";
import TableGrid from "../../components/TableGrid";
import { Header } from "../../components";
import DiscountDetailShow from "./DiscountDetailShow";
import { useQueryCustom } from "../../hooks/useQueryCustom";
import { thunkDiscountTypes } from "../../constants/thunkTypes";
import ButtonMainAction from "../../components/Button/ButtonMainAction";
import { discountService } from "../../services/discount";
import moment from "moment";
import { toast } from "react-toastify";
const CreateDiscount = React.lazy(() =>
  import("./CreateDiscount/CreateDiscount")
);
const EditDiscount = React.lazy(() => import("./EditDiscount/EditDiscount"));

const DiscountList = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [dataShowDetail, setDataShowDetail] = useState({});
  const [pageSize, setPageSize] = useState({ size: 10, page: 1 });
  const [dataDiscounts, setDataDiscounts] = useState({
    dataDiscount: [],
    startDate: undefined,
    endDate: undefined,
  });

  const {
    isLoading: isLoadingDiscount,
    data: dataDiscount,
    refetch,
  } = useQueryCustom(thunkDiscountTypes.GETALL_DISCOUNT, () =>
    discountService.getAllDiscount({
      size: 1000,
      page: 1,
    })
  );

  useEffect(() => {
    if (dataDiscount) {
      setDataDiscounts({ ...dataDiscounts, dataDiscount: dataDiscount?.data });
    }
  }, [dataDiscount]);

  useEffect(() => {
    const checkStartDate = Date.parse(dataDiscounts.startDate);
    const checkEndDate = Date.parse(dataDiscounts.endDate);
    const formatStartDate = new Date(dataDiscounts.startDate);
    const formatEndDate = new Date(dataDiscounts.endDate);
    if (isNaN(checkStartDate) || isNaN(checkEndDate)) {
    } else if (formatEndDate < formatStartDate) {
      toast.warn("Ngày bắt đầu không được lớn hơn ngày kết thúc");
    } else {
      const fetch = async () => {
        const controller = new AbortController();
        const response = await discountService.getAllDiscountByDate({
          timeStart: formatStartDate.toLocaleDateString("en-US"),
          timeEnd: formatEndDate.toLocaleDateString("en-US"),
          page: 1,
          size: 1000,
          option: { signal: controller.signal },
        });

        if (response.status === "OK") {
          setDataDiscounts({ ...dataDiscounts, dataDiscount: response.data });
        }
        controller.abort();
      };
      fetch();
    }
  }, [dataDiscounts.startDate, dataDiscounts.endDate]);

  const columns = [
    {
      field: "id",
      headerAlign: "center",
      headerName: "Mã giảm giá",
      align: "center",
    },
    {
      field: "code",
      headerName: "Mã code",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "percent",
      headerName: "Mức giảm giá",
      headerAlign: "center",
      align: "center",
      width: 140,
      renderCell: (params) => params.row?.percent + "%",
    },
    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        moment(params.row?.startDate).format("DD-MM-YYYY"),
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => moment(params.row?.endDate).format("DD-MM-YYYY"),
    },
    {
      field: "using",
      headerName: "Trạng thái",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return new Date(params.row.endDate) < Date.now() ? (
          <span className="py-[2px] px-1 bg-[#f58383] text-sm rounded-md text-white">
            Quá hạn
          </span>
        ) : (
          <span className="py-[2px] px-1 bg-[#538b33] text-white text-sm rounded-md">
            Đang sử dụng
          </span>
        );
      },
    },
    {
      field: "coursesUsing",
      headerName: "Khóa học đang sử dụng",
      width: 300,
      headerAlign: "center",
      align: "start",
      renderCell: (params) => (
        <div className="flex items-center gap-1">
          {params?.row?.courseResponseDTOS?.map((course) => (
            <span
              className="py-[2px] px-1 bg-[#7b8e32] text-white text-sm rounded-md"
              key={course?.id}
            >
              {course?.name?.slice(0, 20)}...
            </span>
          ))}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span
          className="px-3 py-1 place-content-center
      bg-cyan-700 text-white rounded-[8px] cursor-pointer"
          onClick={() => handleRowClick(params)}
        >
          Chi tiết
        </span>
      ),
    },
  ];

  const handleRowClick = (params) => {
    setDataShowDetail(params.row);
    setIsShowDetail(true);
  };

  if (isLoadingDiscount) return;
  return (
    <div className="relative h-full">
      <div className="m-6 md:m-4 h-full mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Phiếu giảm giá" />
        <div className="flex items-center justify-between w-full mt-1 mb-4">
          <div className="w-9/12 flex items-center gap-2">
            <label className="w-6/12 lg:w-4/12 text-sm font-medium text-gray-700 flex lg:flex-row flex-col gap-x-1 items-start md:items-center">
              Ngày bắt đầu:
              <input
                className="rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:outline-none sm:text-sm"
                type="date"
                onChange={(e) =>
                  setDataDiscounts({
                    ...dataDiscounts,
                    startDate: e.target.value,
                  })
                }
              />
            </label>
            <label className="w-6/12 lg:w-4/12 text-sm font-medium text-gray-700 flex lg:flex-row flex-col gap-x-1 items-start md:items-center">
              Ngày kết thúc:
              <input
                className="rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:outline-none sm:text-sm"
                type="date"
                onChange={(e) =>
                  setDataDiscounts({
                    ...dataDiscounts,
                    endDate: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <ButtonMainAction
            content={"Thêm phiếu giảm giá"}
            onClick={() => setIsShowCreate(true)}
          />
        </div>
        <TableGrid
          data={dataDiscounts.dataDiscount}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
          getRowId={(row) => row.id}
        />
        {isShowDetail && (
          <DiscountDetailShow
            data={dataShowDetail}
            isShowDetail={isShowDetail}
            setIsShowModalUpdate={setIsShowModalUpdate}
            setIsShowDetail={setIsShowDetail}
            refetch={refetch}
          />
        )}
        {isShowModalUpdate && (
          <EditDiscount
            isShowDetail={isShowModalUpdate}
            setIsShowDetail={setIsShowModalUpdate}
            refetch={refetch}
          />
        )}
        {isShowCreate && (
          <CreateDiscount
            isShowDetail={isShowCreate}
            setIsShowDetail={setIsShowCreate}
            data={dataShowDetail}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default DiscountList;
