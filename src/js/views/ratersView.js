import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class RatersView extends View {
  _data;
  _date = {
    day: undefined,
    month: undefined,
    year: undefined,
  };

  setParentEl() {
    this._parentEl = document.querySelector(`.raters_container`);
    this._expandedEl = document.querySelector(`.data`);
  }

  addHandlerRatersBtns(handler) {
    this._parentEl.addEventListener(`click`, function (e) {
      const rater = e.target.closest(`.rater`);
      const btnEl = e.target.closest(`.star`);
      const btn = btnEl ? btnEl.classList[1] : false;

      if (!rater) return;

      handler(rater.id, btn);
    });
  }

  _handleHover() {
    this._parentEl.addEventListener(`mouseover`, function (e) {
      const rater = e.target.closest(`.rater`);
      const btns = rater?.querySelectorAll(`.star`);
      const btn = e.target.closest(`.star`);
      const use = btn?.querySelector(`use`);
      if (!use) return;
      const starNumber = +btn.classList[1].slice(-1);

      for (let i = 0; i < 5; i++) {
        const useInst = btns[i].querySelector(`use`);
        const icon = starNumber >= i + 1 ? `star-fill` : `star`;

        useInst.href.baseVal = `${icons}#${icon}`;
      }
    });
    this._parentEl.addEventListener(`mouseout`, function (e) {
      const rater = e.target.closest(`.rater`);
      const btns = rater?.querySelectorAll(`.star`);
      const btn = e.target.closest(`.star`);
      const use = btn?.querySelector(`use`);

      if (!use) return;

      for (let i = 0; i < 5; i++) {
        const useInst = btns[i].querySelector(`use`);
        const icon = i < rater.dataset.rate ? `star-fill` : `star`;
        useInst.href.baseVal = `${icons}#${icon}`;
      }
    });
  }

  _generateMarkup() {
    this._handleHover();

    return this._data.map((rater) => this._generateRaterMarkup(rater)).join(``);
  }

  _generateRaterMarkup(rater) {
    const selectionMarker = rater.isSelected ? ` selected` : ``;
    const output =
      rater.memory[this._date.year][this._date.month][this._date.day].info
        .output;
    return `
    <div class="tracker rater${selectionMarker}" data-rate="${
      output.number
    }"  id="${rater.id}">
    <div class="tracker_header">
        <h1>${rater.name}</h1>
      </div>
      <div class="rater_body">
      ${this._generateStarsMarkup(output, rater)}
      </div>
      </div>`;
  }

  _generateStarsMarkup(output, rater) {
    let html = ``;
    for (let i = 0; i < 5; i++) {
      const icon = i + 1 > output.number ? `star` : `star-fill`;
      const hoverObj = rater.rateDescriptions[i]
        ? ` data-title="${rater.rateDescriptions[i]}"`
        : ``;
      //   console.log(icon);

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
    return html;
  }
}

export default new RatersView();
