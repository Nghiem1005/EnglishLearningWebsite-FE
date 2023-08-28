export const timeWorkTestData = [
  {
    value: 600,
    description: "10 phút",
  },
  {
    value: 1200,
    description: "20 phút",
  },
  {
    value: 1800,
    description: "30 phút",
  },
  {
    value: 2400,
    description: "40 phút",
  },
  {
    value: 3000,
    description: "50 phút",
  },
  {
    value: 3600,
    description: "60 phút",
  },
  {
    value: 4200,
    description: "70 phút",
  },
  {
    value: 4800,
    description: "80 phút",
  },
  {
    value: 5400,
    description: "90 phút",
  },
  {
    value: 6000,
    description: "100 phút",
  },
  {
    value: 6600,
    description: "100 phút",
  },
  {
    value: 7200,
    description: "120 phút",
  },
];

export const pointCourseData = [
  {
    name: "TOEIC",
    data: [
      {
        value: 550,
        description: "550+",
      },
      {
        value: 600,
        description: "600+",
      },
      {
        value: 650,
        description: "650+",
      },
      {
        value: 700,
        description: "700+",
      },
      {
        value: 850,
        description: "850+",
      },
      {
        value: 900,
        description: "900+",
      },
      {
        value: 950,
        description: "950+",
      },
    ],
  },
  {
    name: "IELTS",
    data: [
      {
        value: 1,
        description: "1+",
      },
      {
        value: 2,
        description: "2+",
      },
      {
        value: 3,
        description: "3+",
      },
      {
        value: 4,
        description: "4+",
      },
      {
        value: 5,
        description: "5+",
      },
      {
        value: 6,
        description: "6+",
      },
      {
        value: 7,
        description: "7+",
      },
      {
        value: 8,
        description: "8+",
      },
      {
        value: 9,
        description: "9+",
      },
    ],
  },
  {
    name: "THPTQG",
    data: [
      {
        value: 1,
        description: "1+",
      },
      {
        value: 2,
        description: "2+",
      },
      {
        value: 3,
        description: "3+",
      },
      {
        value: 4,
        description: "4+",
      },
      {
        value: 5,
        description: "5+",
      },
      {
        value: 6,
        description: "6+",
      },
      {
        value: 7,
        description: "7+",
      },
      {
        value: 8,
        description: "8+",
      },
      {
        value: 9,
        description: "9+",
      },
    ],
  },
];

export const answerRequestDTOS = {
  content: "",
  correct: false,
};

export const questionRequestDTOS = {
  serial: 0,
  content: "",
  explainContent: "",
  answerRequestDTOS: [{ ...answerRequestDTOS }],
};

export const questionPhraseRequestDTOS = {
  document: [],
  serial: 0,
  questionRequestDTOS: [
    {
      serial: 0,
      content: "",
      explainContent: "",
      answerRequestDTOS: [
        {
          content: "",
          correct: false,
        },
      ],
    },
  ],
};

export const partRequestDTOS = {
  description: "",
  type: null,
  questionPhraseRequestDTOS: [
    {
      document: [],
      serial: 0,
      questionRequestDTOS: [
        {
          serial: 0,
          content: "",
          explainContent: "",
          answerRequestDTOS: [
            {
              content: "",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
};

export const initialObjectCreateExam = {
  name: "",
  period: 10,
  partRequestDTOS: [
    {
      description: "",
      type: null,
      questionPhraseRequestDTOS: [
        {
          document: [],
          serial: 0,
          questionRequestDTOS: [
            {
              serial: 0,
              content: "",
              explainContent: "",
              answerRequestDTOS: [
                {
                  content: "",
                  correct: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const formatUpdateExam = (dataPractice, document, setDocument) => {
  return {
    id: dataPractice?.exam?.id,
    name: dataPractice?.exam?.name,
    period: dataPractice?.exam?.period,
    partRequestDTOS: dataPractice?.partExam?.map((partExam, indexPartExam) => {
      setDocument([...document, { image: [null], audio: [null] }]);
      return {
        description: partExam?.description,
        serial: 0,
        type: partExam?.type,
        questionPhraseRequestDTOS: partExam?.questionPhraseResponseDTOS?.map(
          (questionPhrase) => {
            setDocument((prevState) => {
              console.log(questionPhrase);
              prevState[indexPartExam].audio = questionPhrase?.document?.filter(
                (document) => document?.includes(".mp3")
              );
              prevState[indexPartExam].image = questionPhrase?.document?.filter(
                (document) => document?.includes(".png")
              );
              return prevState;
            });
            return {
              document: [],
              image: questionPhrase?.document,
              serial: 0,
              questionRequestDTOS: questionPhrase?.questionResponseDTOS?.map(
                (question) => ({
                  content: question?.content,
                  explainContent: question?.explainContent,
                  serial: 0,
                  answerRequestDTOS: question?.answerResponseDTOS?.map(
                    (answer) => ({
                      content: answer?.content,
                      correct: answer?.correct,
                      serial: 0,
                    })
                  ),
                })
              ),
            };
          }
        ),
      };
    }),
  };
};

export const formatAnswer = (answer) => {
  return answer === 1
    ? "A"
    : answer === 2
    ? "B"
    : answer === 3
    ? "C"
    : answer === 4
    ? "D"
    : null;
};

export const changeColorPartExam = (indexPartExam) =>
  indexPartExam === 0
    ? "bg-[#eff7f7]"
    : indexPartExam === 1
    ? "bg-[#f2fae8]"
    : indexPartExam === 2
    ? "bg-[#e8e9f6]"
    : indexPartExam === 3
    ? "bg-[#f9eef4]"
    : indexPartExam === 4
    ? "bg-[#ebf9f0]"
    : indexPartExam === 5
    ? "bg-[#f4ebf8]"
    : "bg-[#f9f1ee]";
