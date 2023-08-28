import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authProvider";
import { userCommonService } from "../../services/user";
import { useQueryCustom } from "../../hooks";
import { toast } from "react-toastify";
import { thunkStudentTypes } from "../../constants/thunkTypes";

const ProfilePublic = () => {
  const [dataUpdateStudent, setDataUpdateStudent] = useState({
    description: "",
  });
  const auth = useAuth();
  const {
    isLoading: isLoading,
    data: data,
    refetch: r1,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: auth?.user?.id })
  );

  useEffect(() => {
    if (data) {
      setDataUpdateStudent({
        ...dataUpdateStudent,
        description: data?.data?.data?.description,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataUpdateStudent.description === "") {
      toast.warning("Không được để trống!");
    } else {
      const formData = new FormData();
      formData.append("description", dataUpdateStudent.description);
      formData.append("role", 1);
      const { data } = await userCommonService.updateUser({
        userId: auth.user.id,
      });
      if (data.status === "OK") {
        toast.success("Chỉnh sửa thoog tin thành công!");
        setDataUpdateStudent({
          ...dataUpdateStudent,
          description: data.data.description,
        });
      } else {
        toast.error("Có lỗi!");
      }
    }
  };
  if (isLoading) return;
  return (
    <div className="mt-4 p-6">
      <form onSubmit={handleSubmit}>
        <h1 className="text-sm font-bold">Thông tin công khai</h1>
        <div className="block sm:text-sm font-medium text-gray-700 mt-4">
          <RichTextEditorComponent
            height={500}
            value={dataUpdateStudent.description}
            change={(e) => {
              setDataUpdateStudent({
                ...dataUpdateStudent,
                description: e.value,
              });
            }}
          >
            <Inject services={[HtmlEditor, Toolbar, Image, QuickToolbar]} />
          </RichTextEditorComponent>
        </div>
        <span className="w-full border-t block my-10 border-gray-400"></span>
        <button
          type="submit"
          className="w-full md:w-[max-content] bg-[#1eb2a6] text-white font-semibold px-10 py-3 rounded-sm hover:opacity-70"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ProfilePublic;
