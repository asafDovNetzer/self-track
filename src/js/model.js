import { dayInMilli, hourInMilli } from "./config.js";
import {
  getDateObject,
  secondsToTime,
  createFullYearObject,
} from "./helpers.js";

export const state = {
  user: `asafnetzer`,
  subjects: [],
  currentSubject: ``,
  license: `family`,
  formObject: {},
};

export const setExpandObject = function (monitor = false) {
  state.currentSubject.trackers.forEach(
    (tracker) => (tracker.isSelected = false)
  );
  state.currentSubject.raters.forEach((rater) => (rater.isSelected = false));

  if (!monitor) {
    if (state.currentSubject.trackers.length === 0) {
      //add another turnery for rater.length when is//
      // console.log(`there are no monitors 404`);
      if (state.currentSubject.raters.length === 0) {
        console.log(`no trackers or raters 1`);
      } else {
        state.currentSubject.raters[0].isSelected = true;
        state.currentSubject.expandObject = state.currentSubject.raters[0];
      }
    } else {
      state.currentSubject.trackers[0].isSelected = true;
      state.currentSubject.expandObject = state.currentSubject.trackers[0];
    }
  }
  if (monitor) {
    state.currentSubject.expandObject = monitor;
    monitor.isSelected = true;
  }
};

export const deleteMonitor = function () {
  if (state.currentSubject.expandObject.type !== `rater`)
    state.currentSubject.trackers = state.currentSubject.trackers.filter(
      (tracker) => tracker.id !== state.currentSubject.expandObject.id
    );

  if (state.currentSubject.expandObject.type === `rater`)
    state.currentSubject.raters = state.currentSubject.raters.filter(
      (rater) => rater.id !== state.currentSubject.expandObject.id
    );

  setLocalStorage();
  setExpandObject();
};

export const enterSubject = function (number = 0) {
  state.currentSubject = state.subjects[number];
  // fixLocalStorage();
};

export const createformObject = function (monitor, isNew) {
  // const type = monitor.type === `stopwatch` ? `stop`
  const header = isNew
    ? `create a new ${monitor.type}`
    : `edit ${monitor.name}`;

  state.formObject = {
    header: header,
    errorMessage: ``,
    numberOfPages: 2,
    currentPage: 0,
    monitor: monitor,
    buttonSelect: `auto`,
  };
};

export const createRaterPrototype = function () {
  const rater = {
    type: `rater`,
    name: ``,
    description: ``,
    id: Date.now(),
    memory: [createFullYearObject()],
    isSelected: true,
    output: {
      number: 0,
      description: undefined,
    },
    rateDescriptions: [``, ``, ``, ``, ``],
    notification: `auto`,
  };

  rater.memory[state.currentSubject.now.year][state.currentSubject.now.month][
    state.currentSubject.now.day
  ].info = {
    fullDate: getDateObject(new Date(Date.now())),
    entries: [],
    output: {
      number: 0,
      description: undefined,
    },
  };

  return rater;
};

export const createCounterPrototype = function () {
  const counter = {
    type: `counter`,
    name: ``,
    description: ``,
    id: Date.now(),
    memory: [createFullYearObject()],
    isSelected: true,
    amount: 1,
    notification: `auto`,
  };

  counter.memory[state.currentSubject.now.year][state.currentSubject.now.month][
    state.currentSubject.now.day
  ].info = {
    fullDate: getDateObject(new Date(Date.now())),
    entries: [],
    output: 0,
  };

  return counter;
};

export const createStopwatchPrototype = function () {
  const stopwatch = {
    type: `stopwatch`,
    name: ``,
    description: ``,
    id: Date.now(),
    quickFixButtons: {
      amount: 10,
      unit: `min`,
    },
    memory: [createFullYearObject()],
    isRunning: false,
    isSelected: true,
    interval: 0,
    notification: `auto`,
  };

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info = {
    fullDate: getDateObject(new Date(Date.now())),
    entries: [],
    accum: 0,
    output: {
      inSeconds: 0,
      object: secondsToTime(0),
    },
  };

  return stopwatch;
};

export const updateFormData = function (data) {
  console.log(data);
  state.formObject.monitor.name = data.title;
  state.formObject.monitor.description = data.description;

  if (state.formObject.monitor.type === `counter`)
    state.formObject.monitor.amount = +data.btnFunctionality;

  if (state.formObject.monitor.type === `rater`) {
    state.formObject.monitor.rateDescriptions = data.rateDescriptions;
  }
};

export const submitForm = function () {
  if (
    state.formObject.monitor.type === `stopwatch` ||
    state.formObject.monitor.type === `counter`
  ) {
    submitTrackerForm();
  }
  if (state.formObject.monitor.type === `rater`) {
    submitRaterForm();
  }

  setExpandObject(state.formObject.monitor);

  setLocalStorage();
};

const submitTrackerForm = function () {
  if (
    !state.currentSubject.trackers.some(
      (tracker) => tracker.id === state.formObject.monitor.id
    )
  ) {
    state.currentSubject.trackers.push(state.formObject.monitor);
  }
};
const submitRaterForm = function () {
  if (
    !state.currentSubject.raters.some(
      (rater) => rater.id === state.formObject.monitor.id
    )
  ) {
    state.currentSubject.raters.push(state.formObject.monitor);
  }
};

export const changeFormAmount = function (amount) {
  state.formObject.monitor.quickFixButtons.amount = amount;
};
export const changeFormUnit = function (unit) {
  state.formObject.monitor.quickFixButtons.unit = unit;
};

export const changeCounterBtnFunc = function (value) {
  console.log(value);
  state.formObject.buttonSelect = value;
};

export const runStopwatches = function () {
  state.currentSubject.trackers.forEach((tracker) => {
    if (tracker.type === `stopwatch` && tracker.isRunning) {
      clearInterval(tracker.interval);
      startTicking(tracker);
    }
  });
};

export const trackerIdentifier = function (id, btn) {
  const [tracker] = state.currentSubject.trackers.filter(
    (tracker) => tracker.id === +id
  );
  setExpandObject(tracker);

  if (tracker.type === `stopwatch`) handleStopwatch(tracker, btn);
  if (tracker.type === `counter`) handleCounter(tracker, btn);
};

export const raterIdentifier = function (id, btn) {
  const [rater] = state.currentSubject.raters.filter(
    (rater) => rater.id === +id
  );
  setExpandObject(rater);

  if (!btn) return;

  handleRater(rater, btn);
};

const handleRater = function (rater, btn) {
  rater.memory[state.currentSubject.now.year][state.currentSubject.now.month][
    state.currentSubject.now.day
  ].info.output.number = +btn.slice(-1);

  rater.memory[state.currentSubject.now.year][state.currentSubject.now.month][
    state.currentSubject.now.day
  ].info.entries.push({
    at: {
      timestamp: Date.now(),
      dateDetail: getDateObject(new Date(Date.now())),
    },
    output: {
      number: +btn.slice(-1),
      description: rater.rateDescriptions[+btn.slice(-1) - 1],
    },
  });

  setLocalStorage();
};

const handleCounter = function (counter, btn) {
  if (btn === `left_btn`) {
    updateCount(counter, +1);
  }
  if (btn === `right_btn`) {
    updateCount(counter, -1);
  }
  setLocalStorage();
};

const updateCount = function (counter, direction) {
  counter.memory[state.currentSubject.now.year][state.currentSubject.now.month][
    state.currentSubject.now.day
  ].info.output += counter.amount * direction;

  counter.memory[state.currentSubject.now.year][state.currentSubject.now.month][
    state.currentSubject.now.day
  ].info.entries.push({
    amount: counter.amount,
    direction: direction,
    output:
      counter.memory[state.currentSubject.now.year][
        state.currentSubject.now.month
      ][state.currentSubject.now.day].info.output,
    at: {
      timestamp: Date.now(),
      dateDetail: getDateObject(new Date(Date.now())),
    },
  });
};

const handleStopwatch = function (stopwatch, btn) {
  if (btn === `left_btn`) {
    if (!stopwatch.isRunning) {
      startStopwatch(stopwatch);
    } else {
      pauseStopwatch(stopwatch);
    }
  }
  if (btn === `less`) {
    fixStopwatch(stopwatch, -1);
  }
  if (btn === `more`) {
    fixStopwatch(stopwatch, +1);
  }
  setLocalStorage();
};

const fixStopwatch = function (stopwatch, direction) {
  const output =
    stopwatch.memory[state.currentSubject.now.year][
      state.currentSubject.now.month
    ][state.currentSubject.now.day].info.output.inSeconds;
  const units = stopwatch.quickFixButtons.unit === `min` ? 60 : 1;
  let amount = stopwatch.quickFixButtons.amount * units * direction;

  if (direction < 0 && Math.abs(amount) > output) {
    amount = output * -1;
  }

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.entries.push({
    fixedAt: {
      timestamp: Date.now(),
      dateDetail: getDateObject(new Date(Date.now())),
    },
    amount: {
      inSeconds: Math.abs(amount),
      object: secondsToTime(Math.abs(amount)),
      direction: direction,
    },
    output: {
      inSeconds:
        stopwatch.memory[state.currentSubject.now.year][
          state.currentSubject.now.month
        ][state.currentSubject.now.day].info.output.inSeconds + amount,
      object: secondsToTime(
        stopwatch.memory[state.currentSubject.now.year][
          state.currentSubject.now.month
        ][state.currentSubject.now.day].info.output.inSeconds + amount
      ),
    },
  });

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.accum += amount;
  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.output.inSeconds += amount;
  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.output.object = secondsToTime(
    stopwatch.memory[state.currentSubject.now.year][
      state.currentSubject.now.month
    ][state.currentSubject.now.day].info.output.inSeconds
  );
};

const startTicking = function (stopwatch) {
  const lastLiveEntryI = stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.entries.findIndex(
    (entry) => entry.from && !entry.to
  );

  const tick = function () {
    const seconds =
      stopwatch.memory[state.currentSubject.now.year][
        state.currentSubject.now.month
      ][state.currentSubject.now.day].info.accum +
      Math.trunc(
        (Date.now() -
          stopwatch.memory[state.currentSubject.now.year][
            state.currentSubject.now.month
          ][state.currentSubject.now.day].info.entries[lastLiveEntryI].from
            .timestamp) /
          1000
      );
    stopwatch.memory[state.currentSubject.now.year][
      state.currentSubject.now.month
    ][state.currentSubject.now.day].info.output = {
      inSeconds: seconds,
      object: secondsToTime(seconds),
    };
  };

  tick();

  clearInterval(stopwatch.interval);
  stopwatch.interval = setInterval(tick, 1000);
};

const startStopwatch = function (stopwatch) {
  stopwatch.isRunning = true;

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.entries.push({
    from: {
      timestamp: Date.now(),
      dateDetail: getDateObject(new Date(Date.now())),
      output: {
        inSeconds:
          stopwatch.memory[state.currentSubject.now.year][
            state.currentSubject.now.month
          ][state.currentSubject.now.day].info.output.inSeconds,
        object: secondsToTime(
          stopwatch.memory[state.currentSubject.now.year][
            state.currentSubject.now.month
          ][state.currentSubject.now.day].info.output.inSeconds
        ),
      },
    },
  });
  startTicking(stopwatch);
};

const pauseStopwatch = function (stopwatch, timeOfPause = false) {
  stopwatch.isRunning = false;

  clearInterval(stopwatch.interval);

  const lastLiveEntryI = stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.entries.findIndex(
    (entry) => entry.from && !entry.to
  );
  const timeOfPauseV = timeOfPause ? timeOfPause : Date.now();

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.entries[lastLiveEntryI].to = {
    timestamp: timeOfPauseV,
    dateDetail: getDateObject(new Date(timeOfPauseV)),
    output: {
      inSeconds:
        stopwatch.memory[state.currentSubject.now.year][
          state.currentSubject.now.month
        ][state.currentSubject.now.day].info.output.inSeconds,
      object: secondsToTime(
        stopwatch.memory[state.currentSubject.now.year][
          state.currentSubject.now.month
        ][state.currentSubject.now.day].info.output.inSeconds
      ),
    },
  };

  const totalTimeInSeconds = Math.trunc(
    (stopwatch.memory[state.currentSubject.now.year][
      state.currentSubject.now.month
    ][state.currentSubject.now.day].info.entries[lastLiveEntryI].to.timestamp -
      stopwatch.memory[state.currentSubject.now.year][
        state.currentSubject.now.month
      ][state.currentSubject.now.day].info.entries[lastLiveEntryI].from
        .timestamp) /
      1000
  );

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.entries[lastLiveEntryI].totalTime = {
    inSeconds: totalTimeInSeconds,
    object: secondsToTime(totalTimeInSeconds),
  };

  stopwatch.memory[state.currentSubject.now.year][
    state.currentSubject.now.month
  ][state.currentSubject.now.day].info.accum += totalTimeInSeconds;
};

export const memoryCheck = function () {
  const gapFrom12pm =
    state.currentSubject.userPrefrences.hourOfReset * hourInMilli;

  const dateNow = Math.floor((Date.now() - gapFrom12pm) / dayInMilli);

  if (dateNow === state.currentSubject.lastLogIn.timestamp) return;

  console.log(`running fix`);

  const timeOfPause =
    (state.currentSubject.lastLogIn.timestamp + 1) * dayInMilli;

  state.currentSubject.trackers.forEach((tracker) => {
    if (tracker.isRunning) {
      pauseStopwatch(tracker, timeOfPause);
      console.log(`created last pause`);
    }
  });
  setDate();

  state.currentSubject.trackers.forEach((tracker) => {
    // tracker.memory[tracker.memory.length - 1]
    if (tracker.type === `stopwatch`) {
      tracker.memory[state.currentSubject.now.year][
        state.currentSubject.now.month
      ][state.currentSubject.now.day].info = {
        fullDate: getDateObject(new Date(Date.now())),
        entries: [],
        accum: 0,
        output: {
          inSeconds: 0,
          object: secondsToTime(0),
        },
      };
    }

    if (tracker.type === `counter`) {
      tracker.memory[state.currentSubject.now.year][
        state.currentSubject.now.month
      ][state.currentSubject.now.day].info = {
        fullDate: getDateObject(new Date(Date.now())),
        entries: [],
        output: 0,
      };
    }
  });

  state.currentSubject.raters.forEach((rater) => {
    rater.memory[state.currentSubject.now.year][state.currentSubject.now.month][
      state.currentSubject.now.day
    ].info = {
      fullDate: getDateObject(new Date(Date.now())),
      entries: [],
      output: {
        number: 0,
        description: undefined,
      },
    };
  });

  state.currentSubject.lastLogIn = {
    timestamp: dateNow,
    fullDate: getDateObject(new Date(Date.now())),
  };
  setLocalStorage();
};

const setLocalStorage = function () {
  // localStorage.setItem(`USER`, JSON.stringify(state.subjects));
  localStorage.setItem(`USER2`, JSON.stringify(state.subjects));
};

export const getLocalStorage = function () {
  // const storage = localStorage.getItem(`USER`);
  const storage = localStorage.getItem(`USER2`);
  if (storage) state.subjects = JSON.parse(storage);
  if (!storage) createNewSubject();
};

const createNewSubject = function () {
  state.subjects.push({
    name: `Asaf Dov Netzer`,
    type: `privat`,
    trackers: [],
    raters: [],
    userPrefrences: {
      sortBy: [
        { type: `auto`, selected: true },
        { type: `use`, selected: false },
        { type: `date`, selected: false },
        { type: `type`, selected: false },
      ],
      hourOfReset: 2,
    },
    expandObject: {
      type: undefined,
      name: undefined,
      description: undefined,
      memoryObject: {
        fullDate: undefined,
        entries: [],
        output: undefined,
      },
    },
    lastLogIn: {
      timestamp: 0,
      fullDate: ``,
    },
  });
};

export const setDate = function () {
  const dateObj = getDateObject(new Date(Date.now()));
  state.currentSubject.now = {
    day: dateObj.day - 1,
    month: dateObj.month - 1,
    year: dateObj.year - 2021,
  };
};

//fixLocalStorage = run once with set local storage at the end and then disable

const fixLocalStorage = function () {
  state.currentSubject.userPrefrences = {
    sortBy: [
      { type: `auto`, selected: true },
      { type: `use`, selected: false },
      { type: `date`, selected: false },
      { type: `type`, selected: false },
    ],
    hourOfReset: 2,
  };

  setLocalStorage();
  // console.log(state.currentSubject);
};

// const clearTracker = function (tracker) {
//   console.log(`cleartracker`);

//   //   tracker.todaysEntries = [];
//   tracker.output = {
//     inSeconds: 0,
//     string: secondsToTime(0),
//   };
//   tracker.accum = 0;
//   tracker.isRunning = false;

//   setLocalStorage();
// };

// const secondsToTime = function (seconds) {
//   const hrs = String(Math.trunc(seconds / 3600));
//   const min = String(Math.trunc(seconds / 60) % 60).padStart(2, 0);
//   const sec = String(seconds % 60).padStart(2, 0);

//   if (seconds > 3600) return `${hrs}:${min}:${sec}`;

//   if (seconds < 3600) return `${min}:${sec}`;
// };

// This is a stopwatch for trying things out, not for monitoring anything of real value.
