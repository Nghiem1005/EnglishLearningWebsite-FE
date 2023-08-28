import React, { useState } from "react";
import { thunkBlogTypes } from "../../../constants/thunkTypes";
import { blogService } from "../../../services/blog";
import { useQueryCustom } from "../../../hooks";
import { Link, useParams } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import moment from "moment";
import DeleteBlogScreen from "./DeleteBlogScreen";
import CommentSection from "./CommentSection";

const BlogDetailByUser = () => {
  const [hover, setHover] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [postComment, setPostComment] = useState("");
  const [indexComment, setIndexComment] = useState(null);
  const { blogId, userId } = useParams();
  const { data, isLoading, isError, refetch } = useQueryCustom(
    thunkBlogTypes.GET_BLOG,
    () => blogService.getBlog({ blogId })
  );

  const handlePost = (e) => {
    e.preventDefault();
  };

  const showOptionComment = (index) => {
    setHover(true);
    setIndexComment(index);
  };

  if (isLoading) return;
  if (isError) {
    return (
      <div className="mt-10 px-2 gap-y-4 max-w-[28rem] md:max-w-[42rem] lg:max-w-[62rem] xl:max-w-[80rem] 2xl:max-w-[85rem] text-center mb-10">
        Ops! Không thể tìm thấy bài blog.
        <Link
          className="inline-block text-[#438749] font-normal underline ml-2 hover:text-[#0b8484] hover:animate-wobbleTop"
          to={"/user-blog/list"}
        >
          Trở về
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="w-full h-[30rem] md:h-[22rem] relative">
        <img
          className="w-full h-full object-cover"
          src={
            data?.data?.data?.image ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          }
          alt=""
        />
        <div className="absolute top-[10%] md:top-[30%] left-[16%] font-bold">
          <h3 class="animate-charcter">{data?.data?.data?.title}</h3>
          <div className="flex gap-2 items-center border-color border-b-1 px-4 py-2 ml-4">
            <img
              className="rounded-full h-16 w-16"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt="user-profile"
            />
            <div className="break-words">
              <p className="font-semibold text-xl dark:text-gray-200">
                {data?.data?.data?.userResponseDTO?.name}
              </p>
              <p className="text-gray-500 text-xl font-semibold break-all dark:text-gray-400">
                {data?.data?.data?.userResponseDTO?.email}
              </p>
            </div>
          </div>
          <div className="uppercase font-[500] text-[#1eb2a6] flex items-center ml-32">
            <FaRegCalendarAlt size={32} />
            <label
              className="ml-[10px] text-[#000] font-semibold text-lg"
              htmlFor=""
            >
              {moment(data?.data?.data?.createDate).format("LL")}
            </label>
          </div>
        </div>
        <div className="absolute md:right-[20%] md:top-[50%] lg:right-[42%] lg:top-[56%] p-4 bg-white after:contents[''] after:contents[''] after:border-solid after:border-r-white after:border-r-[30px] after:border-y-transparent after:border-y-[6px] after:border-l-0 after:absolute right-[36%] top-[72%] after:left-[-29px] after:top-[3px] ">
          <p className="mb-4">Bạn muốn cập nhật blog?</p>
          <Link to={`/user-blog/user/1/blog/1/edit`}>
            <button
              type="button"
              className="text-white py-2 px-3 rounded-sm border-[2px] 
                    border-white bg-[#1eb2a6] mr-4 hover:bg-white hover:text-[#1eb2a6] hover:border-[#1eb2a6]"
            >
              Chỉnh sửa
            </button>
          </Link>
          <button
            type="button"
            className="text-[#1eb2a6] py-2 px-4 rounded-sm border-[2px] 
                    border-[#1eb2a6] bg-transparent hover:bg-[#1eb2a6] hover:text-white hover:border-white"
            onClick={() => setIsShowModalDelete(true)}
          >
            Xóa blog
          </button>
        </div>
      </div>
      <div className="mt-6 gap-y-4 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10">
        <div
          className="first-letter:uppercase first-letter:text-[3em] text-[#5B5B5B] first-letter:font-bold leading-6"
          dangerouslySetInnerHTML={{
            __html: data?.data?.data?.content,
          }}
        ></div>
        <CommentSection blogId={blogId}/>
      </div>
      <div className="fixed bottom-[6%] right-[10%] w-60 bg-white transition animate-bounce hover:animate-none rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          class="rounded-t-lg hidden lg:block"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Chia sẻ suy nghĩ
          </h5>
          <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            Hãy chia sẻ những suy nghĩ của bạn ngay lúc này
          </p>
          <Link
            to={"/user-blog/write-blog"}
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Chia sẻ
            <AiOutlineArrowRight className="font-fold" size={16} />
          </Link>
        </div>
      </div>
      {isShowModalDelete && (
        <DeleteBlogScreen
          isShowModal={isShowModalDelete}
          setIsShowModal={setIsShowModalDelete}
          data={data?.data?.data}
          userId={userId}
        />
      )}
    </div>
  );
};

export default BlogDetailByUser;
