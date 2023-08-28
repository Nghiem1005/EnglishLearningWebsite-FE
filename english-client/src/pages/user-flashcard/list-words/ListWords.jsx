import React, { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { RxSpeakerLoud } from "react-icons/rx";
import ButtonMainAction from "../../../components/Button/ButtonMainAction";
import CreateFlashcard from "../CreateFlashcard";
import DeleteFlashCard from "../DeleteFlashCard";
import { Link, useParams } from "react-router-dom";
import CreateWord from "./CreateWord";
import { useQueryCustom } from "../../../hooks";
import { thunkWordTypes } from "../../../constants/thunkTypes";
import { flashcardService } from "../../../services/flashcard";
import InfiniteScroll from "react-infinite-scroll-component";
import { dictionaryService } from "../../../services/dictionary";
import DeleteWord from "./DeleteWord";

const ListWords = () => {
  const [pageSize, setPageSize] = useState({
    page: 1,
    size: 6,
    totalPage: null,
  });
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [showModalDeleteWord, setShowModalDeleteWord] = useState({
    isShowModalDelete: false,
    data: null,
  });
  const [isShowModalEditWord, setIsShowModalEditWord] = useState({
    isShowModalEditWord: false,
    dataUpdateWord: {},
  });
  const [dataWords, setDataWords] = useState([]);
  const audioRef = useRef();
  const { flashcardId } = useParams();
  const { data, isLoading, isError } = useQueryCustom(
    thunkWordTypes.GETALL_WORD,
    () => flashcardService.getFlashcard({ ...pageSize, flashcardId })
  );

  useEffect(() => {
    getListWords();
  }, [pageSize.page]);

  const getListWords = async () => {
    setPageSize({
      ...pageSize,
      page: Math.ceil(dataWords.length / pageSize.size) + 1,
    });
    const response = await flashcardService.getFlashcard({
      ...pageSize,
      flashcardId,
    });
    if (pageSize.page > 1) {
      setPageSize({ ...pageSize, totalPage: response.data.totalPage });
      setDataWords([...dataWords, ...response.data.data.wordResponseDTOS]);
    } else {
      setPageSize({ ...pageSize, totalPage: response.data.totalPage });
      setDataWords([...response.data.data.wordResponseDTOS]);
    }
  };

  if (isError || isLoading) return;
  return (
    <div className="mt-4 pb-10 gap-y-4 min-h-[76vh] max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10">
      <img
        className="object-fill w-full h-40"
        src="https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/65/34/AU-T2-E-001-English-Display-Banner.jpg"
        alt="banner"
      />
      <div className="flex justify-between items-center flex-wrap mt-4">
        <div className="flex items-center gap-x-4 text-white text-[40px] font-bold">
          <h1>Flashcards: {data?.data?.data?.name}</h1>
          <button
            className="hover:animate-wiggle"
            onClick={() => setIsShowModalEdit(true)}
          >
            <BiEdit className="text-[#5b9e5b]" />
          </button>
          <button
            className="hover:animate-wiggle"
            onClick={() => setIsShowModalDelete(true)}
          >
            <MdOutlineDeleteSweep className="text-red-500 " />
          </button>
        </div>
        <div onClick={() => setIsShowModalCreate(true)}>
          <ButtonMainAction content={"Thêm từ mới"} />
        </div>
      </div>
      <span className="mt-4 block italic text-mainGreen mb-4">
        {data?.data?.data?.description}
      </span>
      <Link to={`/flashcard/list/${flashcardId}/review`}>
        <div className="p-2 border-[#1f5e39] border-[1px] rounded-sm text-center cursor-pointer bg-[#1f5e39]/30 text-white hover:bg-[#1f5e39]">
          Luyện tập Flashcard
        </div>
      </Link>
      <span className="mt-10 block mb-4">Danh sách: {dataWords.length} từ</span>

      <InfiniteScroll
        className="transition-[height] duration-1000 ease-out w-full display-block"
        dataLength={dataWords.length}
        next={getListWords}
        hasMore={pageSize.page < pageSize.totalPage}
        loader={
          pageSize.page == pageSize.totalPage ? null : <span>loading...</span>
        }
      >
        <div className="flex flex-col gap-y-4 mb-20">
          {dataWords.length > 0 &&
            dataWords.map((word, index) => (
              //Word item
              <div
                className="w-full p-6 rounded-lg bg-[#fff] shadow-[0_6px_0_0_#c4c4c4] border-[#e0e0e0] border-[1px]"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-bold block mb-2">
                    {word?.content}({word?.type})
                  </span>
                  <span
                    className="text-[16px] mb-2 h-8 w-8 flex items-center place-content-center bg-[#c6dcf8] rounded-full cursor-pointer"
                    onClick={async () => {
                      const res = await dictionaryService.getDictionaryByWord({
                        word: word?.content,
                        option: {},
                      });
                      if (res) {
                        audioRef.current.src =
                          res[0]?.phonetics[0]?.audio ||
                          res[0]?.phonetics[1]?.audio ||
                          res[0]?.phonetics[2]?.audio;
                        audioRef.current.play();
                      }
                    }}
                  >
                    <audio ref={audioRef}></audio>
                    <RxSpeakerLoud className="text-[#0c6ff9] font-bold" />
                  </span>
                  <span
                    className="cursor-pointer hover:text-mainGreen"
                    onClick={() =>
                      setIsShowModalEditWord({
                        isShowModalEditWord: true,
                        dataUpdateWord: word,
                      })
                    }
                  >
                    <CiEdit className="text-[28px]" />
                  </span>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
                  <div
                    className={
                      word?.images
                        ? "md:flex-1"
                        : "flex items-start md:items-center gap-x-16 flex-col md:flex-row"
                    }
                  >
                    {word?.spelling && (
                      <div className="line-clamp-[7] text-[16px] text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal mt-4">
                        <span className="text-[18px] font-bold">Phát âm:</span>{" "}
                        <br />
                        {word?.spelling}
                      </div>
                    )}
                    {word?.define && (
                      <div className="line-clamp-[7] text-[16px] text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal mt-4">
                        <span className="text-[18px] font-bold">
                          Định nghĩa:
                        </span>{" "}
                        <br />
                        {word?.define}
                      </div>
                    )}
                    {word?.example && (
                      <div className="line-clamp-[7] text-[16px] text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal mt-4 ">
                        <span className="text-[18px] font-bold">Ví dụ:</span>{" "}
                        <br />
                        {word?.example}
                      </div>
                    )}
                  </div>
                  {word?.images && (
                    <div className="md:flex-1">
                      <img
                        className="object-fill w-70% h-[200px]"
                        src={word?.images}
                        alt="banner"
                      />
                    </div>
                  )}
                </div>
                <div
                  className="cursor-pointer float-right"
                  onClick={() =>
                    setShowModalDeleteWord({
                      isShowModalDelete: true,
                      data: word,
                    })
                  }
                >
                  <MdOutlineDeleteSweep className="text-[32px] text-red hover:text-red-500 " />
                </div>
              </div>
            ))}
        </div>
      </InfiniteScroll>
      <CreateFlashcard
        isShowModal={isShowModalEdit}
        setIsShowModal={() => setIsShowModalEdit(false)}
        data={data?.data?.data}
        titleModal="Chỉnh sửa thông tin"
        isUpdateFlashCard={true}
      />
      <DeleteFlashCard
        isShowModal={isShowModalDelete}
        setIsShowModal={setIsShowModalDelete}
        data={data?.data?.data}
      />
      <CreateWord
        isShowModal={isShowModalCreate}
        setIsShowModal={() => setIsShowModalCreate(false)}
        titleModal={"Thêm từ vựng"}
        isCreateWord={true}
        parentData={data?.data?.data}
        dataWords={dataWords}
        setDataWords={setDataWords}
      />
      {isShowModalEditWord.isShowModalEditWord ? (
        <CreateWord
          isShowModal={isShowModalEditWord.isShowModalEditWord}
          setIsShowModal={() =>
            setIsShowModalEditWord({
              ...isShowModalEditWord,
              isShowModalEditWord: false,
            })
          }
          parentData={data?.data?.data}
          titleModal={"Chỉnh sửa từ vựng"}
          data={isShowModalEditWord.dataUpdateWord}
          isUpdateWord={true}
          dataWords={dataWords}
          setDataWords={setDataWords}
        />
      ) : null}
      <DeleteWord
        isShowModal={showModalDeleteWord.isShowModalDelete}
        setIsShowModal={() =>
          setShowModalDeleteWord({
            ...showModalDeleteWord,
            isShowModalDelete: false,
          })
        }
        data={showModalDeleteWord.data}
        dataWords={dataWords}
        setDataWords={setDataWords}
      />
      {dataWords.length > 0 && (
        <div className="inline-block float-right mt-8 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
          <span className="text-[16px] ">
            Trang {pageSize.page}/{pageSize.totalPage}
          </span>
        </div>
      )}
    </div>
  );
};

// https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/65/34/AU-T2-E-001-English-Display-Banner.jpg
export default ListWords;
