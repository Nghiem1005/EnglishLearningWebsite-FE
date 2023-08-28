import React, { useRef, useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks";
import { userCommonService } from "../../services/user";

const EditImage = () => {
  const [dataImage, setDataImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isValidTypeVideo, setIsValidTypeVideo] = useState(true);
  const messageRef = useRef();
  const ref = useRef();
  const auth = useAuth();
  const {
    isLoading: isLoading,
    data: data,
    refetch: r1,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: auth?.user?.id })
  );

  useEffect(() => {
    if (!!data?.data?.data) {
      setVideoUrl((prev) => {
        prev = data.data.data.image;
        return prev;
      });
    }
  }, [data]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data?.data?.data?.name);
    formData.append("phone", data?.data?.data?.phone);
    formData.append("email", data?.data?.data?.email);
    formData.append("image", dataImage);
    formData.append("role", 1);
    formData.append("enable", true);
    const { data: dataRes } = await userCommonService.updateUser({
      userId: auth.user.id,
      updateData: formData,
    });
    if (dataRes.status === "OK") {
      r1();
      messageRef.current.innerText = "";
      toast.success("Thêm ảnh đại diện thành công!");
    } else {
      messageRef.current.innerText = data.message;
    }
  };

  if (isLoading) return;
  return (
    <>
      <div className="border-b border-gray-400">
        <div
          className="max-w-[16rem] md:max-w-[24rem] lg:max-w-[36rem] xl:max-w-[48rem] 
      2xl:max-w-[60rem] text-center mx-auto my-[16px]"
        >
          <h1 className="text-[24px] font-bold text-black">Ảnh đại diện</h1>
          <span className="text-[16px] text-black">
            Thêm một bức ảnh đẹp của bạn.
          </span>
        </div>
      </div>
      <form
        className="px-2 py-[24px] max-w-[26rem] lg:max-w-[30rem] xl:max-w-[36rem] 
      2xl:max-w-[40rem] mx-auto"
      >
        <div className="flex items-center justify-center w-full overflow-hidden">
          {videoUrl ? (
            <div className="relative border-2 border-gray-400 border-dashed rounded-lg p-[4px]">
              <img
                className="VideoInput_video"
                width="100%"
                // height={00}
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
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Tải video</span> hoặc kéo thả
                  tại đây
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4, KMV, MOV (MAX. 800x400px)
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
          )}
        </div>
        <span
          className="text-red-600 text-[11px] mt-2 block"
          ref={messageRef}
        ></span>
        <span className="w-full border-t block my-10 border-gray-400"></span>
        <button
          className="w-full md:w-[max-content] bg-[#1eb2a6] text-white font-semibold px-10 py-3 rounded-sm hover:opacity-70"
          onClick={handleSubmit}
        >
          Lưu
        </button>
      </form>
    </>
  );
};

export default EditImage;
