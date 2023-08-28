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


export const markedAnswerData = {
  period: 0,
  partResultRequestDTOS: [
    {
      partId: 0,
      resultRequestDTOS: [
        {
          questionId: 0,
          choice: 0,
        },
      ],
    },
  ],
};

export const functionPipeData = (data) => {
  const arrayQuestion = [];
  data?.map((partExam) => {
    arrayQuestion.push({
      partId: partExam?.id,
      question: [],
    });
    partExam?.questionPhraseResponseDTOS?.map((questions) =>
      questions?.questionResponseDTOS?.map((question) =>
        arrayQuestion?.map((item) =>
          item.partId === partExam?.id
            ? {
                ...item,
                question: item.question.push({
                  questionId: question?.id,
                  choice: 0,
                }),
              }
            : item
        )
      )
    );
  });

  const initialMarkedData = {
    partResultRequestDTOS: data?.reduce((accPartExam, partExam) => {
      const result = arrayQuestion.filter(
        (item) => item.partId === partExam?.id
      );
      return [
        ...accPartExam,
        {
          partId: partExam?.id,
          resultRequestDTOS: result[0]?.question,
        },
      ];
    }, []),
  };
  return initialMarkedData;
};

export const newMarkedDataFunction = ({
  markedAnswer,
  partId,
  questionId,
  value,
}) => {
  const newMarkedAnswer = markedAnswer?.partResultRequestDTOS?.reduce(
    (acc, partResult) => {
      if (partId === partResult.partId) {
        const resultAnswers = partResult?.resultRequestDTOS?.map(
          (resultQuestion) =>
            resultQuestion?.questionId === questionId
              ? {
                  ...resultQuestion,
                  choice: value,
                }
              : resultQuestion
        );
        return [
          ...acc,
          {
            ...partResult,
            resultRequestDTOS: resultAnswers,
          },
        ];
      } else {
      }
      return [...acc, partResult];
    },
    []
  );
  return newMarkedAnswer;
};

export const formatTime = (time) => {
  let hour = Math.floor(time / 3600)
  let minute = Math.floor((time - 3600 * hour) / 60);
  let seconds = Math.floor(time - 3600 * hour - minute * 60);
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (seconds < 10) seconds = "0" + seconds;
  return `${hour}:${minute}:${seconds}`;
};

export const formatAnswer = (answer) => {
  return answer === 1 ? 'A' : answer === 2 ? 'B' : answer === 3 ? 'C' : answer === 4 ? 'D' : null
}



