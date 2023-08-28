import React from "react";
import { toast } from "react-toastify";
import DrawerShow from "../../components/Drawer";
import ButtonCancel from "../../components/Button/ButtonCancel";
import ButtonSecondAction from "../../components/Button/ButtonSecondAction";
import { discountService } from "../../services/discount";
import { useNavigate } from "react-router-dom";
import EditDiscount from "./EditDiscount/EditDiscount";
import moment from "moment";

const DiscountDetailShow = ({
  data,
  setIsShowDetail,
  isShowDetail,
  setIsShowModalUpdate,
  refetch,
}) => {
  const navigate = useNavigate();

  const handleDeleteDiscount = async (discountId) => {
    const response = await discountService.deleteDiscount({ discountId });
    if (response.status === "OK") {
      refetch();
      toast.success("Xóa phiếu giảm giá thành công!");
      setIsShowDetail(false);
    } else {
      toast.error("Có lỗi!");
    }
  };

  // if (isLoading) return;

  return (
    <DrawerShow isShowDrawer={isShowDetail} setIsShowDrawer={setIsShowDetail}>
      <div className="mx-auto h-full w-[700px] px-6 mt-3 relative">
        <h5 className="text-[28px] font-bold">Thông tin phiếu giảm giá</h5>
        <br />
        <div className="">
          <h6 className="text-[24px] font-bold">Chi tiết</h6>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Nội dung</span>
            <span className="text-gray-600">{data?.content}</span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Giá khuyến mãi</span>
            <span className="text-gray-600">{data?.percent}%</span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Ngày bắt đầu</span>
            <span className="text-gray-600">
              {moment(data?.startDate)?.format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="mt-1">
            <span className="w-[200px] inline-block">Ngày kết thúc</span>
            <span className="text-gray-600">
              {moment(data?.endDate)?.format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
        <div className="mt-[60px]"></div>
        <h6 className="text-[24px] font-bold">Khóa học đang sử dụng</h6>
        <div className="my-2 flex flex-wrap gap-2">
          {data?.courseResponseDTOS?.map((course) => (
            <span
              className="p-[2px] px-2 bg-[#d8d5d5] rounded-md cursor-pointer hover:opacity-90"
              key={course?.id}
              onClick={() =>
                document
                  .querySelector(`#course-${course?.id}`)
                  .scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {course?.name}
            </span>
          ))}
        </div>
        <div className="max-h-[45vh] overflow-y-auto w-full border-1 border-[#ccc] p-1">
          {data?.courseResponseDTOS?.length > 0 ? (
            data?.courseResponseDTOS?.map((course) => (
              <div
                id={`course-${course?.id}`}
                className="p-1 pl-4 mb-2 bg-[#e8e5e5]"
                key={course?.id}
              >
                <div className="mt-1">
                  <span className="w-[200px] inline-block">Tên khóa học</span>
                  <span className="text-cyan-600">{course?.name}</span>
                </div>
                <div className="mt-1 flex items-center">
                  <span className="w-[200px] inline-block">
                    Giảng viên phụ trách
                  </span>
                  <div className="inline-flex gap-x-2 text-cyan-600 items-center">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        src={
                          course?.teacher?.image ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7f1RdMtPN3AkxLTXMCP-eJ2UEiYzg7hpYacuJaboWpAWKrjN6tAsre1lfLAgQD9U9U&usqp=CAU"
                        }
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p>{course?.teacher?.name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>Chưa có khóa học nào</span>
          )}
        </div>
        <div className="absolute bottom-6 flex items-center gap-4 mt-6 bg-white">
          <ButtonSecondAction
            content={"Chỉnh sửa"}
            onClick={() => {
              setIsShowDetail(false);
              navigate(`/discount/${data?.id}`);
              setIsShowModalUpdate(true);
            }}
          />
          <ButtonCancel
            content={"Xóa discount"}
            onClick={() => handleDeleteDiscount(data?.id)}
          />
        </div>
      </div>
    </DrawerShow>
  );
};

export default DiscountDetailShow;
