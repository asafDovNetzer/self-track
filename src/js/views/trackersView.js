import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class TrackersView extends View {
  _data;
  _date = {
    day: undefined,
    month: undefined,
    year: undefined,
  };

  setParentEl() {
    this._parentEl = document.querySelector(`.trackers_container`);
    this._expandedEl = document.querySelector(`.data`);
  }

  addHandlerTrackerBtns(handler) {
    this._parentEl.addEventListener(`click`, function (e) {
      const tracker = e.target.closest(`.tracker`);
      const btnEl = e.target.closest(`.btn`);
      const btn = btnEl ? btnEl.classList[1] : false;

      handler(tracker.id, btn);
    });
  }

  updateTime() {
    this._data.forEach((tracker) => {
      //   console.log(tracker.id);
      if (tracker.type === `counter`) return;
      const restEl = document
        .getElementById(`${tracker.id}`)
        ?.querySelector(`.rest`);

      if (!restEl) return;
      const timeEl = restEl.querySelector(`.time`);
      const time =
        tracker.memory[this._date.year][this._date.month][this._date.day].info
          .output.object;

      timeEl.textContent = `${time.hrs}:${time.min}:${time.sec}`;
    });
  }

  _generateMarkup() {
    return this._data
      .map((tracker) => {
        if (tracker.type === `counter`) {
          return this._generateCounterMarkup(tracker);
        }
        if (tracker.type === `stopwatch`) {
          return this._generateStopwatchMarkup(tracker);
        }
      })
      .join(``);
  }

  _generateCounterMarkup(tracker) {
    const selectionMarker = tracker.isSelected ? ` selected` : ``;
    return `
    <div class="tracker counter${selectionMarker}" id="${tracker.id}">
    <div class="tracker_header">
        <h1>${tracker.name}</h1>
      </div>
      <div class="tracker_body">
      <div class="main_btns">
      <button class="btn left_btn">
      <svg
      class="btn_icon"
      width="55"
      height="55"
      fill="currentColor"
      >
      <use
      href="${icons}#plus-circle"
      />
      </svg>
      </button>
      </div>
      <div class="mid">
      <div class="count">
      <h1>${
        tracker.memory[this._date.year][this._date.month][this._date.day].info
          .output
      }</h1>
      </div>
      </div>
      <div class="main_btns">
      <button class="btn right_btn">
      <svg
      class="btn_icon"
      width="55"
      height="55"
      fill="currentColor"
      >
      <use
      href="${icons}#dash-circle"
      />
      </svg>
      </button>
      </div>
      </div>
      </div>`;
  }

  _generateStopwatchMarkup(tracker) {
    const selectionMarker = tracker.isSelected ? ` selected` : ``;
    const btnColor = tracker.isRunning ? ` active` : ``;
    const icon = tracker.isRunning ? `pause` : `caret-right`;
    const time =
      tracker.memory[this._date.year][this._date.month][this._date.day].info
        .output.object;
    const quickFixAmount = tracker.quickFixButtons.amount;
    const quickFixUnit = tracker.quickFixButtons.unit;

    return `
      <div class="tracker stopwatch${selectionMarker}" id="${tracker.id}">
      <div class="tracker_header">
          <h1>${tracker.name}</h1>
        </div>
        <div class="tracker_body">
        <div class="main_btns">
        <button class="btn left_btn${btnColor}">
        <svg
        class="btn_icon"
        width="55"
        height="55"
        fill="currentColor"
        >
        <use
        href="${icons}#${icon}"
        />
        </svg>
        </button>
        </div>
        <div class="rest">
        
        <div class="time">${time.hrs}:${time.min}:${time.sec}</div>
        <div class="btns">
        <button class="btn more">
        <span>+ ${quickFixAmount} ${quickFixUnit}</span>
        </button>
        <button class="btn less">
        <span>${quickFixAmount} ${quickFixUnit} -</span>
        </button>
        </div>
        </div>
        </div>
    </div>`;
  }
}

export default new TrackersView();
