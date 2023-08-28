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

export const answerRequestDTOS = {
  content: "",
  correct: false,
};

export const questionRequestDTOS = {
  serial: 0,
  content: "",
  explainContent: "",
  answerRequestDTOS: [
    {
      content: "",
      correct: false,
    },
  ],
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
