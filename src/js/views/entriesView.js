import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class EntriesView extends View {
  _parentEl;
  _data;
  _date = {
    day: undefined,
    month: undefined,
    year: undefined,
  };

  selectParentElement() {
    this._parentEl = document.querySelector(`.entries__list`);
  }

  addHandlerExpandBtns(handler) {}

  _generateMarkup() {
    // console.log(this._data);
    const reversedArr = this._data[this._date.year][this._date.month][
      this._date.day
    ].info?.entries
      .slice()
      .reverse();

    if (!reversedArr) return ``;

    return reversedArr
      .map((entry) => {
        if (entry.fixedAt) return this._generateFixMarkup(entry);
        if (entry.from) return this._generateLapMarkup(entry);
        if (entry.output.number) return this._generateRatingMarkup(entry);
        if (entry.at) return this._generateCountChangeMarkup(entry);
      })
      .join(``);
  }

  _generateRatingMarkup(entry) {
    const madeAt = `${entry.at.dateDetail.hour}:${entry.at.dateDetail.minute}:${entry.at.dateDetail.second}`;

    return `
<li>
    <div class="fix entry">
      <div class="icon">
        <svg
          class="btn_icon"
          width="26"
          height="26"
          fill="currentColor"
        >
          <use
            href="${icons}#star-fill"
          />
        </svg>
      </div>
      <div class="fixed-at">
          <p>Made at:</p>
          <p>${madeAt}</p>
        </div>
      <div class="amount">
        <p>Description:</p>
        <p>${entry.output.description}</p>
      </div>
      <div class="total">
        <p>Total:</p>
        <p>${entry.output.number}</p>
      </div>
    </div>
  </li>`;
  }

  _generateCountChangeMarkup(entry) {
    const icon = entry.direction === -1 ? `dash-circle` : `plus-circle`;
    const sign = entry.direction === -1 ? `-` : `+`;
    const madeAt = `${entry.at.dateDetail.hour}:${entry.at.dateDetail.minute}:${entry.at.dateDetail.second}`;
    return `
<li>
    <div class="fix entry">
      <div class="icon">
        <svg
          class="btn_icon"
          width="26"
          height="26"
          fill="currentColor"
        >
          <use
            href="${icons}#${icon}"
          />
        </svg>
      </div>
      <div class="fixed-at">
          <p>Made at:</p>
          <p>${madeAt}</p>
        </div>
      <div class="amount">
        <p>Amount:</p>
        <p>${sign} ${entry.amount}</p>
      </div>
      <div class="total">
        <p>Total:</p>
        <p>${entry.output}</p>
      </div>
    </div>
  </li>`;
  }

  _generateLapMarkup(entry) {
    const from = `${entry.from.dateDetail.hour}:${entry.from.dateDetail.minute}:${entry.from.dateDetail.second}`;
    const to = entry.to
      ? `${entry.to.dateDetail.hour}:${entry.to.dateDetail.minute}:${entry.to.dateDetail.second}`
      : ``;
    const amount = entry.to
      ? `${entry.totalTime.object.hrs}:${entry.totalTime.object.min}:${entry.totalTime.object.sec}`
      : ``;
    const total = entry.to
      ? `${entry.to.output.object.hrs}:${entry.to.output.object.min}:${entry.to.output.object.sec}`
      : ``;

    return `<li>
    <div class="full entry">
      <div class="icon">
        <svg
          class="btn_icon"
          width="26"
          height="26"
          fill="currentColor"
        >
          <use
            href="${icons}#flag-fill"
          />
        </svg>
      </div>
      <div class="from-to">
      <p>To:</p>
        <p>${to}</p>
        <p>From:</p>
        <p>${from}</p>
      </div>
      <div class="amount">
        <p>Amount:</p>
        <p>${amount}</p>
      </div>
      <div class="total">
        <p>Total:</p>
        <p>${total}</p>
      </div>
    </div>
  </li>`;
  }

  _generateFixMarkup(entry) {
    const fixedAt = `${entry.fixedAt.dateDetail.hour}:${entry.fixedAt.dateDetail.minute}:${entry.fixedAt.dateDetail.second}`;
    const amount = `${entry.amount.object.hrs}:${entry.amount.object.min}:${entry.amount.object.sec}`;
    const total = `${entry.output.object.hrs}:${entry.output.object.min}:${entry.output.object.sec}`;
    const direction = entry.amount.direction === -1 ? `- ` : ``;
    return `<li>
      <div class="fix entry">
        <div class="icon">
          <svg
            class="btn_icon"
            width="26"
            height="26"
            fill="currentColor"
          >
            <use
              href="${icons}#wrench"
            />
          </svg>
        </div>
        <div class="fixed-at">
          <p>fixed at:</p>
          <p>${fixedAt}</p>
        </div>
        <div class="amount">
        <p>Amount</p>
        <p>${direction}${amount}</p>
      </div>
      <div class="total">
        <p>Total</p>
        <p>${total}</p>
      </div>
      </div>
    </li>`;
  }
}

export default new EntriesView();
