import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class ExpandView extends View {
  _parentEl = document.querySelector(`.data`);
  _data;
  _date = {
    day: undefined,
    month: undefined,
    year: undefined,
  };

  setParentEl() {
    this._parentEl = document.querySelector(`.data`);
  }

  addHandlerExpandBtns(handler) {
    this._parentEl.addEventListener(`click`, function (e) {
      const btnEl = e.target.closest(`.btn`);
      if (!btnEl) return;
      const btn = btnEl.classList[1];

      handler(btn);
    });
  }

  addHandlerToggle(handler) {
    const selectionsEl = document.querySelectorAll(`.expand_selection`);
    // console.log(selectionsEl);
    selectionsEl.forEach((selection) => {
      // console.log(`1`);
      selection.addEventListener(`change`, function (e) {
        // console.log(e.target.value);
        handler(e.target.value, e.target.classList[0]);
      });
    });
    // console.log(selectionsEl);
  }

  updateTime() {
    if (this._data.type === `counter` || this._data.type === `rater`) return;

    if (
      !this._data?.memory[this._date.year][this._date.month][this._date.day]
        .info
    )
      return;

    const rightEl = this._parentEl.querySelector(`.right`);
    const timeEl = rightEl.querySelector(`.time`);
    const hrsEl = timeEl.querySelector(`.hrs`);
    const minEl = timeEl.querySelector(`.min`);
    const secEl = timeEl.querySelector(`.sec`);

    if (!rightEl) return;
    const time = this._data.memory[this._date.year][this._date.month][
      this._date.day
    ].info.output.object;

    hrsEl.querySelector(`h1`).textContent = time.hrs;
    minEl.querySelector(`h1`).textContent = time.min;
    secEl.querySelector(`h1`).textContent = time.sec;
  }

  _generateDayOptionsMarkup() {
    const dayArr = [];
    for (
      let i = 0;
      i < this._data.memory[this._date.year][this._date.month].length;
      i++
    ) {
      dayArr.push(`${(i + 1).toString().padStart(2, 0)}`);
    }
    return dayArr
      .map(
        (day, i) =>
          `<option value="${day}"${
            i === this._date.day ? ` selected` : ``
          }>${day}</option>`
      )
      .join(``);
  }

  _generateMonthOptionsMarkup() {
    const monthArr = [];
    for (let i = 0; i < 12; i++) {
      monthArr.push(`${(i + 1).toString().padStart(2, 0)}`);
    }
    return monthArr
      .map(
        (month, i) =>
          `<option value="${month}"${
            i === this._date.month ? ` selected` : ``
          }>${month}</option>`
      )
      .join(``);
  }

  _generateYearOptionsMarkup() {
    return `<option value="2021">2021</option>`;
  }

  _generateMainMarkup() {
    if (this._data.type === `stopwatch`) return this._generateTimeMarkup();
    if (this._data.type === `counter`) return this._generateCountMarkup();
    if (this._data.type === `rater`) return this._generateRateMarkup();
  }

  _generateMarkup() {
    return `
    <div class="expand_header">
          <h1>${this._data.name}</h1>
        </div>
    <div class="column left">
          <div class="day_select">
            <select class="day expand_selection">
            ${this._generateDayOptionsMarkup()}
            </select>
            <select class="month expand_selection">
            ${this._generateMonthOptionsMarkup()}
            </select>
            <select class="year expand_selection">
            ${this._generateYearOptionsMarkup()}
            </select>
          </div>
          <div class="description">
            <p>${this._data.description}</p>
          </div>
          <div class="notes">
          <h2>NOTES</h2>
              <svg class="btn_icon" width="26" height="26" fill="currentColor">
                <use
                  href="${icons}#stickies"
                />
              </svg>
          </div>
          <div class="notes_list">
            <ul>
              <li>
                <div class="note_icon">
                  <svg
                    class="btn_icon"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <use
                      href="${icons}#sticky"
                    />
                  </svg>
                </div>
                <p>Note 1: coming soon...</p>
              </li>
              <li>
                <div class="note_icon">
                  <svg
                    class="btn_icon"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <use
                      href="${icons}#sticky"
                    />
                  </svg>
                </div>
                <p>Note 2: coming soon...</p>
              </li>
              <li>
                <div class="note_icon">
                  <svg
                    class="btn_icon"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <use
                      href="${icons}#sticky"
                    />
                  </svg>
                </div>
                <p>Note 3: coming soon...</p>
              </li>
              <li>
                <div class="note_icon">
                  <svg
                    class="btn_icon"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <use
                      href="${icons}#sticky"
                    />
                  </svg>
                </div>
                <p>Note 4: coming soon...</p>
              </li>
              <li>
                <div class="note_icon">
                  <svg
                    class="btn_icon"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <use
                      href="${icons}#sticky"
                    />
                  </svg>
                </div>
                <p>Note 5: coming soon...</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="column right">
        ${this._generateMainMarkup()}
        <ul class="entries__list"></ul>
        </div>
        <div class="btn_panel">
          <button type="button" class="btn edit__btn">
            <svg class="btn_icon" width="32" height="32" fill="currentColor">
              <use
                href="${icons}#pencil-square"
              />
            </svg>
          <button type="button" class="btn delete__btn">
            <svg class="btn_icon" width="40" height="40" fill="currentColor">
              <use
                href="${icons}#trash"
              />
            </svg>
          </button>
        </div>`;
  }

  _generateTimeMarkup() {
    const timeObject = this._data.memory[this._date.year][this._date.month][
      this._date.day
    ].info?.output.object;

    if (!timeObject) return ``;

    return `
    <div class="time">
            <div class="hrs">
              <div class="clock_shape">
                <h1>${timeObject.hrs}</h1>
              </div>
            </div>
            <div class="dots">
              <h1>:</h1>
            </div>
            <div class="min">
              <div class="clock_shape">
                <h1>${timeObject.min}</h1>
              </div>
            </div>
            <div class="dots">
              <h1>:</h1>
            </div>
            <div class="sec">
              <div class="clock_shape">
                <h1>${timeObject.sec}</h1>
              </div>
            </div>
          </div>`;
  }

  _generateCountMarkup() {
    const output = this._data.memory[this._date.year][this._date.month][
      this._date.day
    ].info?.output;

    if (!output) return ``;

    return `
    <div class="count">
            <div class="clock_shape">
              <h1>${output}</h1>
            </div>
          </div>`;
  }

  _generateRateMarkup() {
    const output = this._data.memory[this._date.year][this._date.month][
      this._date.day
    ].info?.output;

    if (!output) return ``;

    let html = `
    <div class="rate">`;
    for (let i = 0; i < 5; i++) {
      // console.log(`1`);
      const icon = i + 1 > output.number ? `star` : `star-fill`;
      const hoverObj = this._data.rateDescriptions[i]
        ? ` data-title="${this._data.rateDescriptions[i]}"`
        : ``;

      html += `<button class="star star-${i + 1}">
      <div class="btn"${hoverObj}>
      </div>
      <svg
      class="star_icon"
      width="28"
      height="28"
      fill="currentColor"
      >
      <use
      href="${icons}#${icon}
      "
      />
      </svg>
</button>`;
    }
    html += `</div>`;
    return html;
  }
}

export default new ExpandView();
