import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaNotesMedical } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { practiceService } from "../../../services/practice";
import { useAuth } from "../../../contexts/authProvider";
import { formatTime } from "../../../constants/defaultData";
import moment from "moment";

const HistoryTest = () => {
  const [pageSize, setPageSize] = useState({
    page: 1,
    size: 12,
    totalPage: null,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataHistoryPractices, setDataHistoryPractices] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    getListHistoryPractices();
  }, [pageSize.page]);

  const getListHistoryPractices = async () => {
    setPageSize({
      size: 12,
      page: Math.ceil(dataHistoryPractices.length / pageSize.size) + 1,
    });
    const response = await practiceService.getAllsHistoryPracticesByUser({
      userId: auth?.user?.id,
      size: pageSize.size,
      page: pageSize.page,
    });
    if (response.data) {
      setPageSize({ ...pageSize, totalPage: response.data?.totalPage });
      setDataHistoryPractices([
        ...dataHistoryPractices,
        ...response.data?.data,
      ]);
    }
  };

  return (
    <>
      <div className="bg-[#ffefd8] border-[#ffe8c8] border-[1px] text-[#855a1f] px-10 py-2 rounded-md mt-2 mx-4">
        Chú ý: Đây là tất cả kết quả của bạn từ trước tới nay.
      </div>
      <section className="mt-4 gap-y-4 min-h-[36vh] max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10 pb-20">
        <div className="my-4 inline-flex h-[max-content] items-center gap-x-4 text-[#35509a] font-bold text-[2rem]">
          Kết quả luyện thi mới nhất
          <Link
            to={"/test/choose"}
            className="text-[16px] font-medium flex gap-x-2 items-center px-4 py-1 border-[#35509a] border-[1px] rounded-xl hover:bg-[#35509a] text-[#35509a] hover:text-white cursor-pointer"
          >
            <FaNotesMedical />
            Làm đề thi mới
          </Link>
        </div>
        <InfiniteScroll
          className="display-block"
          dataLength={dataHistoryPractices.length}
          next={getListHistoryPractices}
          hasMore={pageSize.page < pageSize.totalPage}
          loader={
            pageSize.page == pageSize.totalPage ? null : <span>loading...</span>
          }
        >
          <div className="flex flex-wrap gap-x-4 p-3 justify-center md:justify-start">
            {dataHistoryPractices.length > 0 &&
              dataHistoryPractices?.map((practice) =>
                practice?.examId ? (
                  <div className="mt-10 md:w-60 lg:w-[340px] p-6 rounded-lg bg-[#fff] shadow-[0_6px_0_0_#c4c4c4] border-[#e0e0e0] border-[1px] cursor-pointer hover:shadow-lg" key={JSON.stringify(practice)}>
                    <span className="text-[18px] font-bold block underline">
                      {practice?.examName}
                    </span>
                    <div className="text-[14px] mb-1 font-bold min-h-[50px]">
                      <span>Listening</span>
                      <div className="flex flex-wrap gap-x-1 mt-1">
                        {practice?.partResultResponseDTOS?.map(
                          (partResult, index) =>
                            partResult?.type === "LISTENING" && (
                              <span className="py-[2px] px-1 bg-[#ffad3b] text-white rounded-md" key={index}>
                                Part {partResult?.serial}
                              </span>
                            )
                        )}
                      </div>
                    </div>
                    <div className="text-[14px] mb-1 font-bold min-h-[50px]">
                      <span>Reading</span>
                      <div className="flex flex-wrap gap-x-1 mt-1">
                        {practice?.partResultResponseDTOS?.map(
                          (partResult, index) =>
                            partResult?.type === "READING" && (
                              <span className="py-[2px] px-1 bg-[#ffad3b] text-white rounded-md" key={index}>
                                Part {partResult?.serial}
                              </span>
                            )
                        )}
                      </div>
                    </div>
                    <span className="text-[#35509a] line-clamp-[7] text-lg block">
                      Ngày làm bài: {moment(practice?.createDate).format("L")}
                    </span>
                    <span className="text-[#35509a] line-clamp-[7] text-lg block">
                      Thời gian hoàn thành: {formatTime(practice?.period)}
                    </span>
                    <span className="text-[#35509a] line-clamp-[7] text-lg block">
                      Kết quả: {practice?.result}
                    </span>
                    <Link
                      to={`/test/${practice?.practiceId}/statistic`}
                      className="mt-2 block h-[max-content] text-[20px] font-medium text-center px-4 py-1 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-[#35509a] hover:text-white cursor-pointer"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                ) : null
              )}
          </div>
        </InfiniteScroll>
        {dataHistoryPractices.length > 0 && (
          <div className="float-right mt-8 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
            <span className="text-[16px] ">
              Trang {pageSize.page}/{pageSize.totalPage}
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default HistoryTest;
