import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../write-blog/WriteBlog.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import EditorToolbar, { modules, formats } from "../write-blog/EditorToolbar";
import { blogService } from "../../../services/blog";
import { useAuth } from "../../../contexts/authProvider";
import { toast } from "react-toastify";
import { useQueryCustom } from "../../../hooks";
import { thunkBlogTypes } from "../../../constants/thunkTypes";

const EditBlog = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [value, setValue] = useState("");
  const [dataImage, setDataImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isValidTypeVideo, setIsValidTypeVideo] = useState(true);
  const messageRef = useRef();
  const ref = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const {
    data: dataBlog,
    isLoading,
    isError,
    refetch,
  } = useQueryCustom(thunkBlogTypes.GET_BLOG, () =>
    blogService.getBlog({ blogId })
  );

  useEffect(() => {
    if (dataBlog) {
      setData({
        title: dataBlog?.data?.data?.title,
        description: dataBlog?.data?.data?.description,
      });
      setValue(dataBlog?.data?.data?.content);
      setVideoUrl(dataBlog?.data?.data?.image);
    }
  }, [dataBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataFrom = new FormData();
      dataFrom.append("title", data.title);
      dataFrom.append("description", data.description);
      dataFrom.append("content", value);
      if (dataImage !== null) {
        dataFrom.append("image", dataImage);
      }

      const response = await blogService.updateBlog({
        blogId,
        updateData: dataFrom,
      });
      if (response?.data?.status === "OK") {
        toast.success("Chỉnh sửa blog thành công!");
        navigate(`/user-blog/user/${auth?.user?.id}/blog/list`);
      } else {
        toast.error("Có lỗi");
      }
    } catch (err) {
      toast.error("Có lỗi");
    }
  };

  const handleUploadVideo = (e) => {
    const { type } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      const url = URL.createObjectURL(e.target.files[0]);
      setVideoUrl(url);
      setIsValidTypeVideo(true);
      setDataImage(e.target.files[0]);
    } else {
      setIsValidTypeVideo(false);
    }
  };

  if (isLoading) return;
  if (isError) {
    return (
      <div className="mt-10 px-2 gap-y-4 max-w-[28rem] md:max-w-[42rem] lg:max-w-[62rem] xl:max-w-[80rem] 2xl:max-w-[85rem] text-center mb-10">
        Ops! Không thể tìm thấy bài blog.
        <Link
          className="inline-block text-[#438749] font-normal underline ml-2 hover:text-[#0b8484] hover:animate-wobbleTop"
          to={`/user-blog/user/${auth?.user?.id}/blog/list`}
        >
          Trở về
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-[60px] overflow-hidden">
      <h1 className="text-[40px] text-white font-bold">
        Cùng chia sẻ những nhiều thú vị đến mọi người
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 mt-5 grid-cols-1 xl:grid-cols-2">
          <div className="flex flex-col gap-y-4">
            <input
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
              transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 
              focus:border-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
              focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 min-h-10"
              type="text"
              placeholder="Tiêu đề"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <textarea
              value={data?.description}
              placeholder="Mô tả blog"
              className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base 
                    transition duration-500 ease-in-out transform border-[1px] border-transparent rounded-lg bg-gray-100 
                    focus:border-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline 
                    focus:ring-2 ring-offset-current ring-offset-3 ring-gray-300 min-h-10"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <div>
              {videoUrl ? (
                <div className="relative border-2 border-gray-400 border-dashed rounded-lg p-[4px] overflow-hidden">
                  <img
                    className="object-contain w-full h-auto"
                    src={videoUrl}
                  />
                  <div
                    className="absolute top-[10px] right-[20px] cursor-pointer"
                    onClick={() => {
                      setVideoUrl(null);
                      setIsValidTypeVideo(true);
                    }}
                  >
                    <BsFillTrashFill className="w-10 h-10 text text-red-600" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[#ffffff] mb-1">
                    Ảnh nền hiển thị blog của bạn
                  </div>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Tải ảnh nền</span> hoặc
                        kéo thả tại đây
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        JPG, JPEG, (MAX. 800x400px)
                      </p>
                      {!isValidTypeVideo ? (
                        <p className="text-xs text-red-600 dark:text-gray-400">
                          Định dạng ảnh không hợp lệ.
                        </p>
                      ) : null}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      ref={ref}
                      onChange={handleUploadVideo}
                    />
                  </label>
                </>
              )}
            </div>
            <span
              className="text-red-600 text-[11px] mt-2 block"
              ref={messageRef}
            ></span>
            <button
              type="submit"
              class="text-white text-xl w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mt-auto"
            >
              Cập nhật
            </button>
          </div>
          <div className="editorContainer">
            <EditorToolbar toolbarId={"t2"} />
            <ReactQuill
              className="editor bg-white"
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Chia sẻ suy nghĩ của bạn..."}
              modules={modules("t2")}
              formats={formats}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
