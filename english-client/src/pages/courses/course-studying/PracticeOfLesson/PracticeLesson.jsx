import React, { useEffect, useState } from "react";
import { thunkPracticeTypes } from "../../../../constants/thunkTypes";
import { useQueryCustom } from "../../../../hooks";
import { useAuth } from "../../../../contexts/authProvider";
import { practiceService } from "../../../../services/practice";
import WorkPracticeModal from "./WorkPracticeModal";
import { useParams } from "react-router-dom";
import moment from "moment";

const PracticeLesson = ({ practiceData }) => {
  const [showModalWorkPractice, setShowModalWorkPractice] = useState({
    isShowModal: false,
    practiceData: null,
  });

  const { lectureId } = useParams();
  const auth = useAuth();

  const { data, isLoading, isError, refetch } = useQueryCustom(
    thunkPracticeTypes.GET_PRACTICE_SCORE_LESSON,
    () =>
      practiceService.getScorePracticeLesson({
        lessonId: lectureId,
        userId: auth?.user?.id,
      })
  );

  useEffect(() => {
    refetch();
  }, [lectureId]);

  if (isError || isLoading) return;
  return (
    <div className="bg-white pb-4">
      {data?.data && data?.data?.status !== "BAD_REQUEST" ? (
        <div className="mt-2">
          Bạn đã hoàn thành bài tập này rồi:
          <span className="text-[#1eb2a6] block">
            {" "}
            Lần 1
            {data?.data?.createDate &&
              `(${moment(data?.data?.createDate).format("DD-MM-YYYY")})`}
            : {data?.data?.result} câu đúng.
          </span>
          {/* <div
            className="mt-2 px-4 py-2 bg-[#1eb2a6] w-[max-content] rounded-sm text-white cursor-pointer hover:bg-[#1eb2a6]/90"
            onClick={() => {
              setShowModalWorkPractice({
                isShowModal: true,
                practiceData: practiceData,
              });
              setDataScore(null);
            }}
          >
            Làm lại bài tập
          </div> */}
        </div>
      ) : practiceData?.length > 0 ? (
        <div
          className="mt-2 px-4 py-2 bg-[#1eb2a6] w-[max-content] rounded-sm text-white cursor-pointer hover:bg-[#1eb2a6]/90"
          onClick={() => {
            setShowModalWorkPractice({
              isShowModal: true,
              practiceData: practiceData,
            });
          }}
        >
          Làm bài tập
        </div>
      ) : (
        <div className="mt-2">
          Bài học này hiện tại không có bài tập.
        </div>
      )}
      {showModalWorkPractice.isShowModal && (
        <WorkPracticeModal
          practiceData={showModalWorkPractice.practiceData.reverse()}
          isShowModal={showModalWorkPractice.isShowModal}
          setIsShowModal={() =>
            setShowModalWorkPractice({
              ...showModalWorkPractice,
              isShowModal: false,
            })
          }
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default PracticeLesson;
