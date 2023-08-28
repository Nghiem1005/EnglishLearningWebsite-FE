import React, { useEffect, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { blogService } from "../../../services/blog";
import { useAuth } from "../../../contexts/authProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../../hooks";
import { thunkBlogTypes } from "../../../constants/thunkTypes";

const ListBlogByUser = () => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 12, totalPage: null });
  const [dataBlogs, setDataBlogs] = useState([]);
  const auth = useAuth();

  const { data, isLoading, isError, refetch } = useQueryCustom(
    thunkBlogTypes.GETALL_BLOG_BY_USER,
    () =>
      blogService.getAllBlogByUser({ ...pageSize, userId: auth?.user?.id }),
  );

  useEffect(() => {
    if (data) {
      setDataBlogs([...dataBlogs, ...data?.data?.data]);
      setPageSize({...pageSize, totalPage: data?.data?.totalPage});
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pageSize.page]);

  const getListBlogs = () => {
    setPageSize({
      ...pageSize,
      size: 12,
      page: Math.ceil(dataBlogs.length / pageSize.size) + 1,
    });
  };

  if (isError) return;

  return (
    <div className="">
      <div className="relative text-[40px] font-bold bg-[#aee1f9] bg-gradient-to-br from-[#aee1f9] to-[#f6ebe6] animate-colorMove">
        <div className="gap-y-6 px-8 h-40 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[71rem] mx-auto flex gap-4 items-center z-1000">
          <GiNotebook />
          <h1> Blog của tôi</h1>
        </div>
      </div>
      <section className="blog p-[80px_30px] container">
        <InfiniteScroll
          dataLength={dataBlogs.length}
          next={getListBlogs}
          hasMore={pageSize.page < pageSize.totalPage}
          loader={pageSize.page == pageSize.totalPage ? null : <span>loading...</span>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {dataBlogs.length > 0 &&
              dataBlogs?.map((blog) => (
                <div key={blog?.id} className="items shadow">
                  <div className="img h-44">
                    <img className="w-full h-full object-cover" src={blog?.image} alt="" />
                  </div>
                  <div className="py-4 px-8">
                    <div className="admin flexSB flex-wrap lg:flex-nowrap gap-x-1">
                      <span className="uppercase font-[500] text-[#1eb2a6] flex items-center ">
                        <i className="fa fa-user"></i>
                        <label
                          className="ml-[10px] text-[#1eb2a6] text-[12px]"
                          htmlFor=""
                        >
                          {blog?.userResponseDTO?.name}
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
                          {blog?.totalComment} cmt
                        </label>
                      </span>
                    </div>
                    <Link
                      to={`/user-blog/user/${auth?.user?.id}/blog/${blog?.id}`}
                    >
                      <h1 className="font-[500] text-[22px] leading-8 mt-1 lg:mt-5 transition-all duration-500 hover:text-[#1eb2a6] cursor-pointer">
                        {blog?.title?.substring(0,30)}...
                      </h1>
                    </Link>
                    <p className="text-[#808080] text-[14px] italic">{blog?.description?.substring(0,50)}...</p>
                  </div>
                </div>
              ))}
          </div>
        </InfiniteScroll>
        {dataBlogs.length > 0 ? (
          <div className="inline-block float-right mt-8 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
            <span className="text-[16px] ">
              Trang {pageSize.page}/{pageSize.totalPage}
            </span>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default ListBlogByUser;
