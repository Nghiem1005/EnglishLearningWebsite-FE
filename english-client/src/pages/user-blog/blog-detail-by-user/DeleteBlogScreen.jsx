import React from 'react'
import { blogService } from "../../../services/blog";
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal/Modal';
import ButtonSuccess from '../../../components/Button/ButtonSuccess';
import ButtonCancel from '../../../components/Button/ButtonCancel';
import { toast } from 'react-toastify';

const DeleteBlogScreen = ({ data, userId, isShowModal, setIsShowModal }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await blogService.deleteBlog({
      blogId: data.id,
    });
    if (response.data?.status === "OK") {
      toast.success("Xóa blog thành công !");
      navigate(`/user-blog/user/${userId}/blog/list`);
    } else {
      toast.error("Ops! Có lỗi.");
    }
  };

  return (
    <Modal isShowModal={isShowModal}>
      <div className="modal-content py-10 text-left px-6">
        <div className="flex justify-between items-center pb-3 text-3xl">
          <p className="font-bold">Xác nhận xóa blog {data?.name}</p>
          <div
            className="modal-close cursor-pointer z-50"
            onClick={() => setIsShowModal(false)}
          >
            <svg
              className="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>

        <div className="my-5">
          <p className="text-[#1f5e39]">
            Xóa blog đồng nghĩa blog này cũng bị xóa vĩnh viễn.
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-end pt-2 gap-x-2">
          <span onClick={() => setIsShowModal(false)}>
            <ButtonCancel content={"Hủy"} />
          </span>
          <ButtonSuccess content={"Xác nhận"} handleSubmit={handleDelete}/>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBlogScreen