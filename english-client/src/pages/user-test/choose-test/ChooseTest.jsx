import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { practiceService } from "../../../services/practice";
import InfiniteScroll from "react-infinite-scroll-component";

const ChooseTest = () => {
  const [pageSize, setPageSize] = useState({
    page: 1,
    size: 12,
    totalPage: null,
  });
  const [dataTests, setDataTest] = useState([]);

  useEffect(() => {
    getListTests();
  }, [pageSize.page]);

  const getListTests = async () => {
    setPageSize({
      ...pageSize,
      page: Math.ceil(dataTests.length / pageSize.size) + 1,
    });
    const response = await practiceService.getAllTests({
      size: pageSize.size,
      page: pageSize.page,
    });
    if (response.data) {
      setPageSize({ ...pageSize, totalPage: response?.totalPage });
      setDataTest([...dataTests, ...response?.data]);
    }
  };

  return (
    <section className="mt-4 gap-y-4 min-h-[36vh] max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10 pb-20">
      <div className="mt-4 inline-flex h-[max-content] items-center gap-x-4 text-[#35509a] font-bold text-[2rem]">
        Thư viện đề thi
      </div>
      <InfiniteScroll
        className="display-block"
        dataLength={dataTests.length}
        next={getListTests}
        hasMore={pageSize.page < pageSize.totalPage}
        loader={
          pageSize.page == pageSize.totalPage ? null : <span>loading...</span>
        }
      >
        <div className="flex justify-center md:justify-start flex-wrap gap-3">
          {dataTests?.map((test) => (
            <div
              key={test.id}
              className="mt-10 w-[180px] md:w-52 lg:w-[240px] 2xl:w-[260px] p-6 rounded-lg bg-[#fcfcfc] shadow-[0_6px_0_0_#c4c4c4] border-[#e0e0e0] border-[1px] cursor-pointer hover:shadow-lg"
            >
              <span className="text-[18px] font-bold block underline">
                {test?.name}
              </span>
              <div className="text-[14px] text-[#677788] mb-1">
                <span className="text-[18px] font-bold block">
                  Bộ đề thi: IELTS C18 Full Test 1
                </span>
                <span className="font-medium text-[16px] block mt-1">
                  <BsClock
                    className="inline-block align-[-2px] mr-1"
                    size={16}
                  />
                  {test?.period / 60} phút |
                  <FaUserEdit
                    className="inline-block align-[-2px] mx-1"
                    size={16}
                  />
                  {test?.totalUser} |
                  <AiOutlineComment
                    className="inline-block align-[-2px] mx-1"
                    size={16}
                  />
                  122
                </span>
                <span className="font-medium text-[16px] mt-2 block">
                  {test?.partResponseDTOS?.length} phần thi |{" "}
                  {test?.totalQuestion} câu hỏi
                </span>
              </div>
              <div className="text-[14px] mb-1 flex flex-wrap gap-1 mt-3">
                {test?.partResponseDTOS?.map((partExam, index) => (
                  <span key={index}  className="py-[2px] px-2 bg-[#d4ebff] text-[#35509a] rounded-lg">
                    #{partExam?.type}
                  </span>
                ))}
              </div>
              <Link to={`/test/${test?.id}/detail`} className="">
                <div className="mt-4 h-[max-content] text-[20px] font-medium text-center px-4 py-2 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-[#35509a] hover:text-white cursor-pointer">
                  Chi tiết
                </div>
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {dataTests.length > 0 ? (
          <div className="float-right mt-8 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
          <span className="text-[16px] ">Trang {pageSize.page}/{pageSize.totalPage}</span>
        </div>
        ) : null}
    </section>
  );
};

export default ChooseTest;
