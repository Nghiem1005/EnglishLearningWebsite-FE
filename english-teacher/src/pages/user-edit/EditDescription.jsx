import React, { useEffect, useState } from "react";
import { useQueryCustom } from "../../hooks";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { userCommonService } from "../../services/user";
import { useAuth } from "../../contexts/authProvider";
import {
  HtmlEditor,
  Image,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import { toast } from "react-toastify";

const EditDescription = () => {
  const [description, setDesCription] = useState(null);
  const auth = useAuth();
  const {
    isLoading,
    isError,
    data,
    refetch: r1,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: auth?.user?.id })
  );

  useEffect(() => {
    if (data) {
      setDesCription(data.data.data.description);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data?.data?.data?.name);
    formData.append("phone", data?.data?.data?.phone);
    formData.append("email", data?.data?.data?.email);
    formData.append("description", description);
    formData.append("role", data?.data?.data?.role);
    formData.append("enable", true);
    const { data: dataRes } = await userCommonService.updateUser({
      userId: auth.user.id,
      updateData: formData,
    });
    if (dataRes.status === "OK") {
      r1();
      toast.success("Thêm mô tả bản thân thành công!");
    } else {
     toast.error('Ops! Có lỗi.')
    }
  };

  if (isLoading || isError) return;
  return (
    <>
      <div className="border-b border-gray-400">
        <div
          className="max-w-[30rem] md:max-w-[28rem] lg:max-w-[40rem] xl:max-w-[60rem] 
      2xl:max-w-[60rem] text-center mx-auto my-[16px]"
        >
          <h1 className="text-[24px] font-bold text-black">Mô tả bản thân</h1>
          <span className="text-[16px] text-black">
            Thêm những thành tựu, quá trình sự nghiệp của bạn.
          </span>
        </div>
      </div>
      <form
        className="px-2 py-[24px] max-w-[30rem] lg:max-w-[30rem] xl:max-w-[40rem] 
      2xl:max-w-[40rem] mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
            <RichTextEditorComponent
              height={400}
              value={description}
              change={(e) => {
                setDesCription(e.value);
              }}
            >
              <Inject services={[HtmlEditor, Toolbar, Image, QuickToolbar]} />
            </RichTextEditorComponent>
          </label>
        </div>
        <span className="w-full border-t block my-4 border-gray-400"></span>
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

export default EditDescription;
