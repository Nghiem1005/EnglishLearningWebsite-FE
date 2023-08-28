import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../../components";
import { useParams } from "react-router-dom";
import VariantFormNew from "./PracticeVariantFormNew";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { FaFileAudio } from "react-icons/fa";
import { AiFillFileImage } from "react-icons/ai";
import { toast } from "react-toastify";
import { examService } from "../../../../services/exam";
import { useAuth } from "../../../../contexts/authProvider";
import { API } from "../../../../api/baseUrl";
import axios from "axios";
import { practiceService } from "../../../../services/practice";
import { thunkPracticeTypes } from "../../../../constants/thunkTypes";
import { useQueryCustom } from "../../../../hooks/useQueryCustom";

const EditPractice = () => {
  const [dataUpdatePractice, setDataUpdatePractice] = useState({
    name: "",
    exams: [
      {
        document: null,
        type: "",
        questionResponseDTOS: [
          {
            content: "",
            document: null,
            answerResponseDTOS: [
              {
                content: "",
                correct: false,
              },
            ],
          },
        ],
      },
    ],
  });

  const [typeExam, setTypeExam] = useState(["none"]);
  const [count, setCount] = useState([1]);
  const [countExam, setCountExam] = useState(1);
  const [countAnswer, setCountAnswer] = useState([1]);
  const { lessonId, examId } = useParams();
  const [audio, setAudio] = useState([]);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const auth = useAuth();
  const { isLoading, data, refetch, isError } = useQueryCustom(
    thunkPracticeTypes.GET_PRACTICE,
    () => practiceService.getPracticeByExam({ examId })
  );

  useEffect(() => {
    if (!!data) {
      const formatData = {
        name: data.data.data[0].partExamResponseDTO.name,
        exams: data.data.data.reduce(
          (acc, exam) => [
            ...acc,
            {
              partExamId: exam.partExamResponseDTO.id,
              document: exam.partExamResponseDTO.documents,
              questionResponseDTOS:
                exam.partExamResponseDTO.questionResponseDTOS,
              type: exam.partExamResponseDTO.type,
            },
          ],
          []
        ),
      };
      setDataUpdatePractice(formatData);
      formatData.exams.forEach((exam, index) => {
        typeExam[index] = exam.type;
        setTypeExam(typeExam);
        setCount((prev) => {
          prev.push(exam.questionResponseDTOS.length);
          return prev;
        });
        setAudio((prev) => {
          prev.push(null);
          return prev;
        });
        setImage((prev) => {
          prev.push(null);
          return prev;
        });
        if (exam.type === "READING") {
          setImage((prevImages) =>
            prevImages.map((image, i) =>
              i === index
                ? exam.document
                : image
            )
          );
        } else if (exam.type === "LISTENING") {
          setAudio((prevAudios) =>
            prevAudios.map((audio, i) =>
              i === index
                ? exam.document
                : audio
            )
          );
        }
      });
    }
  }, [data]);

  const increaseExam = () => {
    let tmpList = dataUpdatePractice.exams;
    tmpList.push({
      document: null,
      type: "",
      questionResponseDTOS: [
        {
          content: "",
          document: null,
          answerResponseDTOS: [
            {
              content: "",
              correct: false,
            },
          ],
        },
      ],
    });
    setImage((prev) => {
      prev.push(null);
      return prev;
    });
    setAudio((prev) => {
      prev.push(null);
      return prev;
    });
    setTypeExam((prev) => {
      prev.push(null);
      return prev;
    });
    setCount((prev) => {
      prev.push(null);
      return prev;
    });
    setDataUpdatePractice(dataUpdatePractice);
    setCountExam(countExam + 1);
  };

  const increaseVariantForm = (index) => {
    let tmpList = dataUpdatePractice.exams[index].questionResponseDTOS;
    tmpList.push({
      content: "",
      document: null,
      answerResponseDTOS: [
        {
          content: "",
          correct: false,
        },
      ],
    });
    setDataUpdatePractice(dataUpdatePractice);
    setCount((prevCount) =>
      prevCount.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const uploadImage = (file, index) => {
    const { type } = file;
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/jpeg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setImage((prevImages) =>
          prevImages.map((image, i) => (i === index ? reader.result : image))
        );
      };
      setDataUpdatePractice((prev) => {
        prev.exams[index].document = file;
        prev.exams[index].type = "READING";
        return prev;
      });
    } else {
      setImage((prevImages) =>
        prevImages.map((image, i) => (i === index ? null : image))
      );
    }
  };

  const uploadAudio = (file, index) => {
    setAudio((prevAudios) =>
      prevAudios.map((audio, i) =>
        i === index ? URL.createObjectURL(file) : audio
      )
    );
    setDataUpdatePractice((prev) => {
      prev.exams[index].document = file;
      prev.exams[index].type = "LISTENING";
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    let isValid = true;
    e.preventDefault();
    for (const items in dataUpdatePractice) {
      if (items === "exams") {
        for (const exam in dataUpdatePractice[items]) {
          if (exam === "type") {
            if (
              (!dataUpdatePractice[exam] && !dataUpdatePractice["document"]) ||
              (dataUpdatePractice[exam] && !dataUpdatePractice["document"])
            ) {
              isValid = false;
            }
          } else if (exam === "questionResponseDTOS") {
            dataUpdatePractice[exam].forEach((item) => {
              if (!item.content) {
                isValid = false;
                return;
              }
            });
          } else {
            isValid = true;
          }
        }
      }
    }

    if (!isValid) {
      toast.warning("Các trường không được bỏ trống");
    } else {
      const { name, exams } = dataUpdatePractice;
      const result = exams.map((exam) => {
        const { partExamId, document, questionResponseDTOS, type } = exam;
        const answerFormat = questionResponseDTOS.reduce(
          (acc, question) => [
            ...acc,
            {
              content: question.content,
              answerRequestDTOS: question.answerResponseDTOS,
            },
          ],
          []
        );
        const formatData = {
          name,
          type,
          questionRequestDTOS: answerFormat,
        };
        const formData = new FormData();
        formData.append("document", document);
        formData.append(
          "partExamRequestDTO",
          new Blob([JSON.stringify(formatData)], { type: "application/json" })
        );
        return API.put(`/api/v1/partExam?id=${partExamId}`, formData);
      });

      try {
        const response = await axios.all(result);
        const isSuccess = response.every(
          (partExam) => partExam.data.status == "OK"
        );
        if (isSuccess) {
          toast.success(`Chỉnh sửa practice ${examId} thành công!`);
        } else {
          toast.error("Có lỗi!");
        }
      } catch (error) {
        toast.error("Có lỗi!");
      }
    }
  };

  // PartExam - Exam - Exercise

  if (isLoading) return;
  return (
    <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-3">
        <Header title="Tạo practice" category={`Lesson ${lessonId}`} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center bg-gray-50 ">
          <div className="w-full">
            <div className="px-6">
              <h1 className="font-bold mb-1">Tên Practice</h1>
              <div className="mt-1">
                <textarea
                  id="title"
                  name="title"
                  rows={3}
                  className={`mt-1 resize-none w-full border rounded-md border-gray-300 shadow-sm focus:border-[${"currentColor"}] focus:ring-indigo-500 sm:text-sm p-2 focus:outline-none`}
                  placeholder="Tên Practice"
                  required
                  value={dataUpdatePractice.name}
                  onChange={(e) =>
                    setDataUpdatePractice({
                      ...dataUpdatePractice,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="mt-1 md:col-span-2 md:mt-0">
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div>
                    {dataUpdatePractice.exams.map((exam, index) => (
                      <div className="space-y-6 bg-white sm:p-6">
                        <div className="px-6 py-8 rounded-xl border border-gray-200 flex flex-col gap-2 ">
                          <div>
                            <h1 className="font-bold mb-1">Tải đề </h1>
                          </div>
                          <div className="w-full flex gap-x-8">
                            <label
                              className="w-10 h-16 flex flex-col items-center content-center cursor-pointer"
                              onClick={() => {
                                typeExam[index] = "LISTENING";
                                setTypeExam(typeExam);
                              }}
                            >
                              <FaFileAudio className="w-full h-full text-red-300" />
                              <p>Audio</p>
                              <input
                                className="hidden"
                                type="file"
                                onChange={(e) =>
                                  uploadAudio(e.target.files[0], index)
                                }
                              />
                            </label>
                            <label
                              className="w-10 h-16 flex flex-col items-center content-center cursor-pointer"
                              onClick={() => {
                                typeExam[index] = "READING";
                                setTypeExam(typeExam);
                              }}
                            >
                              <AiFillFileImage className="w-full h-full text-blue-300" />
                              <p>Ảnh</p>
                              <input
                                className="hidden"
                                type="file"
                                onChange={(e) =>
                                  uploadImage(e.target.files[0], index)
                                }
                              />
                            </label>
                            {index > 0 ? (
                              <button
                                type="button"
                                className="px-1 text-[12px] py-[6px] inline-block h-[max-content] rounded-sm text-white bg-cyan-600"
                                onClick={() => {
                                  if (countExam > 1) {
                                    dataUpdatePractice.exams.splice(index, 1);
                                    setDataUpdatePractice(dataUpdatePractice);
                                    setCountExam(countExam - 1);
                                  }
                                }}
                              >
                                Xóa bộ câu hỏi
                              </button>
                            ) : null}
                          </div>
                          <div>
                            {typeExam[index] === "READING" ? (
                              <img
                                className="h-70 w-70"
                                src={image[index]}
                                alt=""
                              />
                            ) : typeExam[index] === "LISTENING" ? (
                              !!audio[index] ? (
                                <audio className="h-10" controls>
                                  <source src={audio[index]} />
                                </audio>
                              ) : null
                            ) : null}
                          </div>
                        </div>
                        <div
                          className="shadow px-6 py-2 rounded-xl border border-gray-200 "
                          id="style-form"
                        >
                          <div>
                            {exam.questionResponseDTOS?.map(
                              (answer, indexQuestion) => {
                                return (
                                  <VariantFormNew
                                    key={indexQuestion}
                                    indexExam={index}
                                    indexQuestion={indexQuestion}
                                    colorBorder={currentColor}
                                    closeEventHandle={() => {
                                      if (count[index] > 1) {
                                        dataUpdatePractice.exams[
                                          index
                                        ].questionResponseDTOS.splice(
                                          indexQuestion,
                                          1
                                        );
                                        setDataUpdatePractice(
                                          dataUpdatePractice
                                        );
                                        setCount((prevCount) =>
                                          prevCount.map((count, i) =>
                                            i === index ? count - 1 : count
                                          )
                                        );
                                      }
                                    }}
                                    answer={answer}
                                    countAnswer={countAnswer}
                                    setCountAnswer={setCountAnswer}
                                    dataUpdatePractice={dataUpdatePractice}
                                    setDataUpdatePractice={
                                      setDataUpdatePractice
                                    }
                                  />
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="block w-full mr-4 py-2 px-4 rounded-sm border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100"
                            onClick={() => increaseVariantForm(index)}
                          >
                            Thêm câu hỏi
                          </button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <button
                        type="button"
                        className="block w-full mr-4 py-2 px-4 mb-4 rounded-sm border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100"
                        onClick={() => increaseExam()}
                      >
                        Thêm bộ câu hỏi
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Link
                      to="/management/products"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Hủy
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      // onClick={getData}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPractice;
