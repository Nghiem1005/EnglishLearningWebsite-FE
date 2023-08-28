import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { AiOutlineArrowRight } from "react-icons/ai";
import { thunkBlogTypes } from "../../../constants/thunkTypes";
import { blogService } from "../../../services/blog";

import moment from "moment";
import CommentSection from "./CommentSection";

const BlogDetail = () => {
  const { blogId } = useParams();
  const { data, isLoading, isError, refetch } = useQueryCustom(
    thunkBlogTypes.GET_BLOG,
    () => blogService.getBlog({ blogId })
  );

  const {
    data: data1,
    isLoading: iL1,
    isError: iE1,
    refetch: r1,
  } = useQueryCustom(thunkBlogTypes.GETALL_BLOG, () =>
    blogService.getAllBlog({ page: 1, size: 5 })
  );

  useEffect(() => {
    if (blogId) {
      refetch();
    }
  }, [blogId]);

  

  if (isLoading || iL1) return;
  if (isError || iE1) {
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
    <div className="mt-10 px-2 gap-y-4 max-w-[28rem] md:max-w-[42rem] lg:max-w-[62rem] xl:max-w-[80rem] 2xl:max-w-[85rem] mx-auto mb-10 flex-wrap lg:flex-nowrap flex gap-4">
      <div className="w-full lg:w-10/12 mx-auto pb-4 border-b-[1px] border-[#999] lg:border-none bg-white p-4">
        <h3 className="text-[38px] font-normal text-[#894B05] font-alegreya">
          {data?.data?.data?.title}
        </h3>
        <span>
          Posted on {moment(data?.data?.data?.createDate).format("LL")} by{" "}
          {data?.data?.data?.userResponseDTO?.name}
        </span>
        <div
          className="first-letter:uppercase first-letter:text-[3em] text-[#5B5B5B] first-letter:font-bold leading-6 mt-6 font-normal min-h-[20rem]"
          dangerouslySetInnerHTML={{
            __html: data?.data?.data?.content,
          }}
        ></div>
        <CommentSection blogId={blogId}/>
      </div>
      {/* <div className="w-full lg:w-3/12">
        <h3 className="text-[28px] font-bold mb-2">Có thể bạn sẽ thích</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
          {data1?.data?.data.slice(0, 2).map((blog) => (
            <Link to={`/user-blog/blog/${blog?.id}`} key={blog?.id}>
              <div key={blog?.id} className="items shadow">
                <div className="img">
                  <img className="w-full h-40" src={blog?.image} alt="" />
                </div>
                <div className="py-4 px-3">
                  <div className="admin flex flex-col">
                    <span className="uppercase font-[500] text-[#1eb2a6] flex items-center ">
                      <i className="fa fa-user"></i>
                      <label
                        className="ml-[10px] text-[#1eb2a6] text-[12px]"
                        htmlFor=""
                      >
                        {blog?.type}
                      </label>
                    </span>
                    <span className="uppercase font-[500] text-[#1eb2a6] flex items-center">
                      <i className="fa fa-calendar-alt"></i>
                      <label
                        className="ml-[10px] text-[#808080] text-[12px]"
                        htmlFor=""
                      >
                        {moment(blog?.createDate).format("L")}
                      </label>
                    </span>
                    <span className="uppercase font-[500] text-[#1eb2a6] flex items-center">
                      <i className="fa fa-comments"></i>
                      <label
                        className="ml-[10px] text-[#808080] text-[12px]"
                        htmlFor=""
                      >
                        {blog?.com}
                      </label>
                    </span>
                  </div>
                  <h1 className="font-[500] text-[18px] underline leading-6 mt-2 transition-all duration-500 hover:text-[#1eb2a6] cursor-pointer">
                    {blog?.title}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
      <div className="fixed bottom-[6%] right-[10%] w-60 bg-white transition animate-bounce hover:animate-none rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg hidden md:block h-28 w-full"
          src="https://cdn.earlytorise.com/wp-content/uploads/2012/07/iStock_000016885438XSmall.jpg"
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Chia sẻ suy nghĩ
          </h5>
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            Hãy chia sẻ những suy nghĩ của bạn ngay lúc này
          </p>
          <Link
            to={"/user-blog/write-blog"}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Chia sẻ
            <AiOutlineArrowRight className="font-fold" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
