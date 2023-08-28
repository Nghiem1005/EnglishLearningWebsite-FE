import React, { useEffect, useState } from "react";
import { flashcardService } from "../../services/flashcard";
import { useAuth } from "../../contexts/authProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { SiStackoverflow } from "react-icons/si";
import { ImStack } from "react-icons/im";
import { Link } from "react-router-dom";

const CreateFlashcard = React.lazy(() => import("./CreateFlashcard"));

const FlashcardList = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [pageSize, setPageSize] = useState({ page: 1, size: 11 });
  const [dataFlashcards, setDataFlashcards] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    getListFlashcards();
  }, [pageSize.page]);

  const getListFlashcards = async () => {
    setPageSize({
      size: 12,
      page: Math.ceil(dataFlashcards.length / pageSize.size) + 1,
    });

    const response = await flashcardService.getAllFlashcard({
      ...pageSize,
      userId: auth?.user?.id,
    });
    if (pageSize.page > 1) {
      setTotalPage(response.data.totalPage);
      setDataFlashcards([...dataFlashcards, ...response.data.data]);
    } else {
      setTotalPage(response.data.totalPage);
      setDataFlashcards([...response.data.data]);
    }
  };


  return (
    <>
      <div className="text-[40px] font-bold bg-[#aee1f9] bg-gradient-to-r from-[#aee1f9] to-[#f6ebe6]">
        <div className="gap-y-6 h-40 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto flex gap-4 items-center">
          <ImStack />
          <h1> Flashcards</h1>
        </div>
      </div>
      <div className="p-4 my-4 mx-[auto] bg-[#d8f0e2] border-[#c8ead6] rounded-lg text-[#1f5e39] w-[96%] align-middle">
        <RiErrorWarningLine
          className="inline-block align-[-4px] mr-4"
          size={20}
        />
        Chú ý: Bạn có thể tạo flashcards từ bên ngoài (bao gồm các bài thi bạn đã làm trước đây) trong trang chi tiết kết quả bài thi.
      </div>
      <div className="mt-4 gap-y-4 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] pb-16 mx-auto mb-10">
        <div className="w-full mt-10 mb-4 mx-auto flex justify-center">
          <InfiniteScroll
            className="transition-[height] duration-1000 ease-out"
            dataLength={dataFlashcards.length}
            next={getListFlashcards}
            hasMore={pageSize.page < totalPage}
            loader={pageSize.page == totalPage ? null : <span>loading...</span>}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 p-3">
              <div
                className="w-40 md:w-44 lg:w-52 h-52 rounded-lg bg-white shadow-[0_6px_0_0_#c4c4c4] border-[#e0e0e0] border-[1px] inline-flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                onClick={() => setIsShowModal(true)}
              >
                <AiFillPlusCircle className="text-[#35509a]" size={30} />
                <span className="text-[#35509a] text-lg">Tạo list từ</span>
              </div>
              {dataFlashcards.length > 0 &&
                dataFlashcards?.map((flashcard, index) => (
                  //Flash item
                  <Link to={`/flashcard/list/${flashcard?.id}`} key={index}>
                    <div className="w-40 md:w-44 lg:w-52 h-52 p-6 rounded-lg bg-[#fff] shadow-[0_6px_0_0_#c4c4c4] border-[#e0e0e0] border-[1px] cursor-pointer hover:shadow-lg">
                      <span className="text-[18px] font-bold block mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
                        {flashcard?.name}
                      </span>
                      <span className="text-[14px] block mb-2 ">
                        <SiStackoverflow className="inline-block align-[-2px] mr-2" />
                        <span>{flashcard?.wordResponseDTOS?.length} word</span>
                      </span>
                      <div className="text-[#35509a] line-clamp-[7] text-sm text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal mb-2 md:mb-5 lg:mb-8">
                        {flashcard?.description}
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-6 w-6 rounded-full"
                          src={
                            flashcard?.userResponseDTO?.image ||
                            "https://silvawebdesigns.com/wp-content/uploads/2016/07/how-to-limit-text-length-x-lines-in-css.jpg"
                          }
                          alt=""
                        />
                        <p>{flashcard?.userResponseDTO?.name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </InfiniteScroll>
        </div>
        {dataFlashcards.length > 0 && (
          <div className="inline-block float-right mt-8 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
            <span className="text-[16px] ">
              Trang {pageSize.page}/{totalPage}
            </span>
          </div>
        )}
      </div>
      <CreateFlashcard
        isShowModal={isShowModal}
        setIsShowModal={() => setIsShowModal(false)}
        isCreateFlashcard={true}
        dataFlashcard={dataFlashcards}
        setDataFlashcard={setDataFlashcards}
      />
    </>
  );
};

export default FlashcardList;
