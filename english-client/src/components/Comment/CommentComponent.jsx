import React from "react";

const CommentComponent = ({
  postChildComment,
  setPostChildComment,
  dataItem,
  isEventOption = true,
}) => {
  return (
    <div className="pt-3 transition-all duration-300 ease-out ml-4">
      <div className="last:h-5 flex gap-x-2 items-start">
        <img
          className="rounded-full h-8 w-8"
          alt="me"
          src={dataItem?.mainDiscuss?.image ||
            "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
            
          }
        />
        <div className="flex flex-col p-1 px-2 rounded-lg bg-[#a7a5a54d]">
          <h3 className="block font-medium text-[14px]">
            {dataItem?.userName}
            {(dataItem?.userRole === "ADMIN" ||
              dataItem?.userRole === "TEACHER") && (
              <span className="ml-2 py-[1px] px-1 inline-flex justify-center items-center text-[11px] text-white bg-[#539ff0] font-normal rounded-md lowercase">
                {dataItem?.userRole}
              </span>
            )}
          </h3>
          <div className="comment-caption block text-[14px]">
            {dataItem?.content}
            {dataItem?.images?.length > 0 && (
              <img className="h-40" src={dataItem?.images[0]} alt="" />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-x-2 items-center ml-10">
        <span className="text-sm">{dataItem?.createDate}</span>
        {isEventOption && (
          <>
            {/* <div className="text-sm font-semibold cursor-pointer opacity-80 hover:opacity-100">
              Thích
            </div>
            <span className="text-sm">3 likes</span> */}
            <div
              className="text-sm font-semibold cursor-pointer opacity-80 hover:opacity-100"
              onClick={() => {
                setPostChildComment({
                  ...postChildComment,
                  indexParenComment: dataItem?.id,
                  isReplyComment: true,
                });
              }}
            >
              Trả lời
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
