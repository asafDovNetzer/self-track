export const todayBegining = function () {
  const now = new Date(Date.now());
  //   const aDay = 86400000;
  const midWay = new Date(now.setHours(2));

  return midWay.setMinutes(0);
};

export const getDateObject = function (date) {
  return {
    second: String(date.getSeconds()).padStart(2, 0),
    minute: String(date.getMinutes()).padStart(2, 0),
    hour: String(date.getHours()).padStart(2, 0),
    day: +String(date.getDate()).padStart(2, 0),
    month: +String(date.getMonth() + 1).padStart(2, 0),
    year: date.getFullYear(),
  };
};

export const checkForError = function (title) {
  const stringLength = [...title].length;
  const minLength = 3;
  const maxLength = 18;
  if (stringLength < maxLength && stringLength > minLength) return false;

  const error = stringLength > maxLength ? `long` : `short`;
  //   console.log(error);

  return `* title too ${error}... The title must be 3-17 charecters long`;
};

export const secondsToTime = function (seconds) {
  return {
    hrs: String(Math.trunc(seconds / 3600)).padStart(2, 0),
    min: String(Math.trunc(seconds / 60) % 60).padStart(2, 0),
    sec: String(seconds % 60).padStart(2, 0),
  };
};

export const createFullYearObject = function () {
  return [
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
    ],
    [
      {
        num: `01`,
        info: undefined,
      },
      {
        num: `02`,
        info: undefined,
      },
      {
        num: `03`,
        info: undefined,
      },
      {
        num: `04`,
        info: undefined,
      },
      {
        num: `05`,
        info: undefined,
      },
      {
        num: `06`,
        info: undefined,
      },
      {
        num: `07`,
        info: undefined,
      },
      {
        num: `08`,
        info: undefined,
      },
      {
        num: `09`,
        info: undefined,
      },
      {
        num: 10,
        info: undefined,
      },
      {
        num: 11,
        info: undefined,
      },
      {
        num: 12,
        info: undefined,
      },
      {
        num: 13,
        info: undefined,
      },
      {
        num: 14,
        info: undefined,
      },
      {
        num: 15,
        info: undefined,
      },
      {
        num: 16,
        info: undefined,
      },
      {
        num: 17,
        info: undefined,
      },
      {
        num: 18,
        info: undefined,
      },
      {
        num: 19,
        info: undefined,
      },
      {
        num: 20,
        info: undefined,
      },
      {
        num: 21,
        info: undefined,
      },
      {
        num: 22,
        info: undefined,
      },
      {
        num: 23,
        info: undefined,
      },
      {
        num: 24,
        info: undefined,
      },
      {
        num: 25,
        info: undefined,
      },
      {
        num: 26,
        info: undefined,
      },
      {
        num: 27,
        info: undefined,
      },
      {
        num: 28,
        info: undefined,
      },
      {
        num: 29,
        info: undefined,
      },
      {
        num: 30,
        info: undefined,
      },
      {
        num: 31,
        info: undefined,
      },
    ],
  ];
};
