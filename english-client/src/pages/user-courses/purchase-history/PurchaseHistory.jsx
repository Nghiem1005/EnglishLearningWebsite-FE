import React from "react";
import { TbNotebook } from "react-icons/tb";
import { thunkBillTypes } from "../../../constants/thunkTypes";
import { useAuth } from "../../../contexts/authProvider";
import { useQueryCustom } from "../../../hooks";
import { billService } from "../../../services/bill";
import moment from "moment";

const PurchaseHistory = () => {
  const auth = useAuth();
  const {
    isLoading: isLoadingBillByUser,
    data: dataBillByUser,
    refetch: r1,
  } = useQueryCustom(thunkBillTypes.GETALL_BILL, () =>
    billService.getAllBillByUser({
      userId: auth?.user?.id,
    })
  );

  if (isLoadingBillByUser) return;
  return (
    <>
      <div className="h-[115px] md:h-[206px] lg:h-[230px] bg-[#1eb2a6] md:pt-[4.2rem]">
        <div className="max-w-[26rem] md:max-w-[40rem] lg:max-w-[60rem] 2xl:max-w-[80rem] mx-auto mb-10">
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem] mb-6 text-white font-bold">
            Lịch sử mua hàng
          </h1>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-center gap-4 my-6 max-w-[26rem] md:max-w-[40rem] lg:max-w-[60rem] 2xl:max-w-[80rem] mx-auto">
        <div className="flex flex-col flex-[4]">
          {dataBillByUser?.length > 0 ? (
            dataBillByUser?.map((bill) => (
              <div
                id={`bill-${bill.billId}`}
                key={bill.billId}
                className="relative flex flex-col md:flex-row md:space-x-5 md:space-y-0 rounded-sm shadow-lg border border-white bg-white mb-1"
              >
                <div className="w-full h-[144px] p-1 overflow-hidden md:w-1/3 bg-white place-items-center">
                  <img
                    src={bill.course.thumbnail}
                    alt="tailwind logo"
                    className="rounded-sm w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between item-center">
                    <p className="text-gray-500 font-medium hidden md:block">
                      Mã hóa đơn: {bill.id}
                    </p>
                    <p className="text-gray-500 font-medium hidden md:block">
                      Ngày mua: {moment(bill.payDate).format("DD-MM-YYYY")}
                    </p>
                    {/* <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-pink-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                          Best Seller
                        </div>
                      </div> */}
                  </div>
                  <h3 className="font-black text-gray-800 md:text-xl text-xl">
                    {bill.course.name}
                  </h3>
                  <p className="md:text-sm text-gray-500 text-base">
                    đ{bill.course.price.toLocaleString()}/khóa
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span className="text-[18px]">Bạn chưa mua khóa học nào.</span>
          )}
        </div>
        <div className="flex-[2]">
          <div className="max-w-full lg:max-w-[20rem] bg-white lg:border lg:border-gray-200 rounded-sm   dark:border-gray-700">
            <div className="p-5">
              <h5 className="text-[18px] font-bold mb-4">Tất cả giao dịch:</h5>
              <ul className="flex flex-col gap-y-2">
                {dataBillByUser?.map((bill) => (
                  <li
                    className="flex items-center gap-x-2 cursor-pointer hover:text-[#637a57]"
                    onClick={() =>
                      document
                        .querySelector(`#bill-${bill.billId}`)
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <span className="block">
                      <TbNotebook />
                    </span>
                    {bill?.course?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
