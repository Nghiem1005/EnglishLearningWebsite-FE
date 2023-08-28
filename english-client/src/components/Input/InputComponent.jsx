import React, { useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";

const InputComponent = ({ postComment, setPostComment, handlePost }) => {
  const [isLoadImage, setIsLoadImage] = useState({
    imageUrl: null,
    isShow: false,
  });

  const textareaRef = useRef();
  const buttonRef = useRef();

  const handleUploadImage = (e) => {
    postComment.images = [];
    setPostComment({
      ...postComment,
      images: [e.target.files[0]],
    });
    setIsLoadImage({
      imageUrl: URL.createObjectURL(e.target.files[0]),
      isShow: true,
    });
  };

  return (
    <section className="border-[#a7a5a54d] border-[1px] overflow-hidden rounded-tr-md rounded-br-md">
      <form>
        <div className="pl-4 flex justify-between items-center overflow-hidden rounded-tr-md rounded-br-md">
          <div className="flex place-items-center cursor-pointer mr-3 text-[#0095f6]">
            <label className="cursor-pointer" htmlFor="uploadImage">
              <RiImageAddFill size={32} />
              <input
                className="hidden"
                type="file"
                id="uploadImage"
                onChange={handleUploadImage}
              />
            </label>
          </div>
          <textarea
            className="input-comment outline-none text-[13px] leading-6 border-none resize-none w-full webkit-scrollbar:w-0 transition-[height] duration-300 pt-4 ease-out overflow-hidden max-h-[300px]"
            placeholder="Enter comment..."
            ref={textareaRef}
            value={postComment.value}
            onChange={(e) =>
              setPostComment({ ...postComment, value: e.target.value })
            }
            onKeyDownCapture={() => {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
              buttonRef.current.style.paddingTop =
                textareaRef.current.scrollHeight / 2 - 12 + "px";
              buttonRef.current.style.paddingBottom =
                textareaRef.current.scrollHeight / 2 - 12 + "px";
            }}
          ></textarea>
          <button
            className={`${
              postComment?.value?.trim() === ""
                ? "pointer-events-none opacity-30 bg-[#2c53b7] "
                : "opacity-100 pointer-events-auto bg-[#35509a]"
            } h-full py-5 px-4 font-bold hover:opacity-95 text-white`}
            ref={buttonRef}
            onClick={handlePost}
          >
            Gửi
          </button>
        </div>
        {isLoadImage.isShow && <div className="ml-10 mt-2 flex items-start gap-x-4">
          <img
            className="h-20 inline-block "
            src={isLoadImage.imageUrl}
            alt=""
          />
          <button
            type="button"
            className="rounded-full hover:drop-shadow-lg h-6 w-6 bg-[#a7a5a54d] flex justify-center items-center"
            onClick={() => {
              setPostComment({...postComment, images: []})
              setIsLoadImage({
                imageUrl: null,
                isShow: false
              })
            }}
          >
            <GrClose size="12px" style={{ color: "white" }} color="#666666" />
          </button>
        </div>}
      </form>
    </section>
  );
};

export default InputComponent;
