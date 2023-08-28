import React, { useEffect, useState } from "react";
import { blogService } from "../../../services/blog";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { GiNotebook } from "react-icons/gi";
import { FcIdea } from "react-icons/fc";
import { Link } from "react-router-dom";

const ListBlog = () => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 12 });
  const [dataBlogs, setDataBlogs] = useState([]);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    getListBlogs();
  }, [pageSize.page]);

  const getListBlogs = async () => {
    setPageSize({
      size: 12,
      page: Math.ceil(dataBlogs.length / pageSize.size) + 1,
    });
    const response = await blogService.getAllBlog({
      size: pageSize.size,
      page: pageSize.page,
    });
    if (response.data) {
      setTotalPage(response?.data?.totalPage);
      setDataBlogs([...dataBlogs, ...response.data?.data]);
    }
  };

  return (
    <div className="">
      <div className="text-[40px] font-bold bg-[#aee1f9] bg-gradient-to-br from-[#aee1f9] to-[#f6ebe6]">
        <div className="gap-y-6 px-8 h-40 max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[71rem] mx-auto flex gap-4 items-center">
          <GiNotebook />
          <h1> Khám phá blog của mọi người</h1>
        </div>
      </div>
      <div className="p-4 my-4 mx-[auto] bg-[#d8f0e2] border-[#c8ead6] rounded-lg text-[#1f5e39] w-[96%] align-middle">
        <FcIdea className="inline-block align-[-4px] mr-4" size={20} />
        <span>
          Bạn đã có ý tưởng cho blog riêng của mình? Cùng cho mọi người xem nào.
          <Link
            to={"/user-blog/write-blog"}
            className="inline-block text-black font-normal underline ml-2 hover:text-[#0b8484] hover:animate-wobbleTop"
          >
            Tạo blog ngay bây giờ
          </Link>
        </span>
      </div>
      <section className="blog p-[80px_30px] container">
        <InfiniteScroll
          dataLength={dataBlogs.length}
          next={getListBlogs}
          hasMore={pageSize.page < totalPage}
          loader={pageSize.page == totalPage ? null : <span>loading...</span>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {dataBlogs.length > 0 &&
              dataBlogs?.map((blog) => (
                <div key={blog?.id} className="items shadow">
                  <div className="img h-44">
                    <img className="w-full h-full object-cover" src={blog?.image} alt="" />
                  </div>
                  <div className="py-4 px-8">
                    <div className="admin flex-wrap lg:flex-nowrap flexSB gap-1">
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
                    <Link to={`/user-blog/blog/${blog?.id}`}>
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
        {dataBlogs.length == 0 && (
          <span className="text-[18px]">
            Chưa có blog nào từ mọi người.
            <Link
              className="inline-block text-[#438749] font-normal underline ml-2 hover:text-[#0b8484] hover:animate-wobbleTop"
              to={"/user-blog/write-blog"}
            >
              Bạn hãy là người đầu tiên viết blog.
            </Link>
          </span>
        )}
        {dataBlogs.length > 0 ? (
          <div className="inline-block float-right mt-8 py-1 px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,.5)] bg-white">
            <span className="text-[16px] ">
              Trang {pageSize.page}/{totalPage}
            </span>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default ListBlog;
