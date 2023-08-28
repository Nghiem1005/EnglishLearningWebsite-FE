import React, { useEffect, useState } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputComponent from "../../../components/Input/InputComponent";
import { useQueryCustom } from "../../../hooks";
import { thunkTestTypes } from "../../../constants/thunkTypes";
import { practiceService } from "../../../services/practice";
import { timeWorkTestData } from "../../../constants/defaultData";

const DetailTest = () => {
  const [indexSwitchBox, setIndexSwitchBox] = useState(1);
  const [chooseData, setChooseData] = useState({
    partIds: [],
    timer: null,
  });
  const [postComment, setPostComment] = useState({
    value: "",
    images: [],
  });
  const navigate = useNavigate();
  const { testId } = useParams();
  const { isLoading, isError, data } = useQueryCustom(
    thunkTestTypes.GET_DETAIL_TEST,
    () => practiceService.getTest({ testId })
  );

  const handlePost = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/test/1/work`);
  };

  const handleDataChecked = (e) => {
    if (e.target.checked) {
      const isHasInIds = chooseData.partIds.findIndex(
        (partId) => partId === e.target.value
      );
      if (isHasInIds === -1) {
        chooseData.partIds.push(e.target.value);
      }
    } else if (!e.target.checked) {
      const isHasInIds = chooseData.partIds.findIndex(
        (partId) => partId === e.target.value
      );
      if (isHasInIds !== -1) {
        chooseData.partIds.splice(isHasInIds, 1);
      }
    }
    setChooseData({ ...chooseData });
  };

  if (isLoading || isError) return;
  return (
    <section className="mt-4 gap-y-4 min-h-[36vh] max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10">
      <div className="p-5 bg-white rounded-xl border-[2px] border-[#40ebe6] shadow-[4px_10px_0_0_#c4c4c4]">
        <div className="text-[14px] mb-1 flex flex-wrap gap-x-1 mt-3">
          {data?.data?.partResponseDTOS?.map((partExam) => (
            <span
              className="py-[2px] px-2 bg-[#eee] text-[#1e2022] rounded-lg"
              key={partExam?.id}
            >
              #{partExam?.type}
            </span>
          ))}
        </div>
        <h1 className="mt-4 inline-flex h-[max-content] items-center gap-x-4 text-[#35509a] font-bold text-[2rem]">
          {data?.data?.name}
        </h1>
        <div className="text-[16px] mb-6 flex flex-wrap gap-x-3 mt-3">
          <span
            className={`${
              indexSwitchBox === 1
                ? "text-[#35509a] bg-[#e8f2ff]"
                : "border-black border-[1px] hover:bg-[#e7eaf3] bg-[#eee] text-[#1e2022] hover:border-[#eee]"
            } py-1 px-3 rounded-2xl cursor-pointer font-medium`}
            onClick={() => setIndexSwitchBox(1)}
          >
            Thông tin đề thi
          </span>
          <span
            className={`${
              indexSwitchBox === 2
                ? "text-[#35509a] bg-[#e8f2ff]"
                : "border-black border-[1px] hover:bg-[#e7eaf3] bg-[#eee] text-[#1e2022] hover:border-[#eee]"
            } py-1 px-3 rounded-2xl cursor-pointer font-medium`}
            onClick={() => setIndexSwitchBox(2)}
          >
            Đáp án/Transcript
          </span>
        </div>
        <span className="block font-bold">
          Bộ đề thi: IELTS C18 Full Test 1
        </span>
        <span className="block">
          <BsFillClockFill
            className="inline-block align-[-2px] mr-1 font-bold"
            size={16}
          />
          Thời gian làm bài: {Math.floor(data?.data?.period / 60)} phút |{" "}
          {data?.data?.partResponseDTOS?.length} phần thi |{" "}
          {data?.data?.totalQuestion} câu hỏi
        </span>
        <span className="block">
          <FaUserEdit
            className="inline-block align-[-2px] mx-1 font-bold"
            size={16}
          />
          {data?.data?.totalUser} người đã luyện tập đề thi này
        </span>
        <span className="text-[#cd4747] text-[18px] italic mt-2 block">
          Chú ý: để được quy đổi sang scaled score (ví dụ trên thang điểm 990
          cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế độ làm FULL TEST.
        </span>
        <div className="p-4 my-4 mx-[auto] bg-[#d8f0e2] border-[#c8ead6] rounded-lg text-[#1f5e39] align-middle">
          <FcIdea className="inline-block align-[-4px] mr-4" size={20} />
          Pro tips: Hình thức luyện tập từng phần và chọn mức thời gian phù hợp
          sẽ giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp
          lực hoàn thành bài thi.
        </div>
        <form className="mt-4 text-[18px] block" onSubmit={handleSubmit}>
          <span className="italic ">Chọn phần thi bạn muốn làm</span>
          <div className="flex flex-wrap gap-6 mt-5">
            {data?.data?.partResponseDTOS?.map((partExam, index) => (
              <div className="flex items-start gap-x-2" key={partExam?.id}>
                <input
                  className="checked:bg-white w-4 h-4 mt-[6px]"
                  type="checkbox"
                  value={partExam?.id}
                  name={partExam?.id}
                  onChange={handleDataChecked}
                />
                <span className="flex flex-col">
                  Part {partExam?.serial}({partExam?.totalQuestion} câu hỏi)
                  <span className="py-[1px] px-3 bg-[#eee] text-[#1e2022] text-[14px] rounded-lg text-center w-[max-content]">
                    #{partExam?.type}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <span className="block mt-4">Giới hạn thời gian</span>
          <select
            className="text-[#677788] border-[1px] focus:shadow-[0_0_0_0.2rem_rgba(53,80,154,.25)] outline-none focus:border-[#7c93d2] border-[#bdc5d1] rounded-md mt-2 w-full p-1"
            onChange={(e) =>
              setChooseData({ ...chooseData, timer: e.target.value })
            }
          >
            <option className="" value disabled selected>
              -- Chọn thời gian --
            </option>
            {timeWorkTestData.map((time) => (
              <option value={time.value}>{time.description}</option>
            ))}
          </select>
          {chooseData.partIds.length > 0 && chooseData.timer !== null ? (
            <Link
              to={`/test/${testId}/work?part=${chooseData.partIds.join(
                ","
              )}&time=${chooseData.timer / 60}`}
              className="inline-block mt-3 h-[max-content] text-[20px] font-medium text-center px-4 py-2 border-[#35509a] border-[1px] rounded-lg hover:bg-[#35509a] text-[#35509a] hover:text-white cursor-pointer"
            >
              Luyện thi
            </Link>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default DetailTest;
