import React, { useRef } from "react";
import { toast } from "react-toastify";
import DrawerShow from "../../../components/Drawer";
import ButtonCancel from "../../../components/Button/ButtonCancel";
import ButtonSecondAction from "../../../components/Button/ButtonSecondAction";
import { discountService } from "../../../services/discount";
import { useForm } from "react-hook-form";
import InputComponent from "../../../components/InputComponent";

const CreateDiscount = ({ setIsShowDetail, isShowDetail, refetch }) => {
  const messageRef = useRef();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (form) => {
    const { content, percent, timeStart, timeEnd } = form;
    let message = "";
    if (
      timeEnd === "" ||
      timeStart === "" ||
      content === "" ||
      percent === ""
    ) {
      message +=
        "Các trường nội dung, giá khuyến mãi, thời gian bắt đầu, kết thúc bà bắt buộc. ";
    } else if (new Date(timeEnd) < new Date(timeStart)) {
      message += "Ngày kết thúc phải lớn hơn ngày bắt đầu. ";
    } else {
      const response = await discountService.createDiscount({
        data: {
          content,
          percent,
          endDate: timeEnd,
          startDate: timeStart,
        },
      });
      if (response.status === "OK") {
        refetch();
        toast.success("Thêm phiếu giảm giá thành công!");
        setIsShowDetail(false);
      } else {
        toast.error("Có lỗi!");
      }
    }
    if (message !== "") messageRef.current.innerText = message;
  };

  return (
    <DrawerShow isShowDrawer={isShowDetail} setIsShowDrawer={setIsShowDetail}>
      <div className="mx-auto h-full md:w-[700px] px-6 mt-3 relative">
        <h5 className="text-[28px] font-bold">Tạo phiếu giảm giá</h5>
        <br />
        <form>
          <h6 className="text-[24px] font-bold">Chi tiết</h6>
          <div className="flex flex-col md:flex-row gap-2 mt-1">
            <div className="w-full md:w-6/12">
              <span className="w-[200px] inline-block">Nội dung</span>
              <InputComponent
                props={{ ...register("content") }}
                placeholder={"Nội dung"}
              />
            </div>
            <div className="w-full md:w-6/12">
              <span className="w-[200px] inline-block">Giá khuyến mãi</span>
              <div className="flex items-center text-[20px]">
                <InputComponent
                  props={{ ...register("percent") }}
                  type="number"
                  placeholder={"Nhập giá trị"}
                />{" "}
                %
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-1">
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày bắt đầu</span>
              <InputComponent
                props={{ ...register("timeStart") }}
                type="date"
              />
            </div>
            <div className="mt-1">
              <span className="w-[200px] inline-block">Ngày kết thúc</span>
              <InputComponent props={{ ...register("timeEnd") }} type="date" />
            </div>
          </div>
          <span className="text-sm text-red-700 italic" ref={messageRef}></span>
        </form>
        <div className="absolute bottom-6 flex items-center gap-4 mt-6 bg-white">
          <ButtonSecondAction
            content={"Thêm"}
            onClick={handleSubmit(onSubmit)}
          />
          <ButtonCancel
            content={"Hủy bỏ"}
            onClick={() => setIsShowDetail(false)}
          />
        </div>
      </div>
    </DrawerShow>
  );
};

export default CreateDiscount;
