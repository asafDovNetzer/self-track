import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class TrackersSelectorView extends View {
  _data;

  setParentEl() {
    this._parentEl = document.querySelector(`.trackers_panel`);
  }

  addHandlerCreateBtns(handler) {
    this._parentEl.addEventListener(`click`, function (e) {
      e.preventDefault();
      const btnEl = e.target.closest(`.btn`);
      if (!btnEl) return;
      const btn = btnEl.classList[1];
      // console.log(btn);
      handler(btn);
    });
  }

  _generateMarkup() {
    return `
    <div class="sort">
      <div class="sort__cover">
        <h1 class="sort__label">SORT BY</h1>
      </div>
      <div class="sort__options">
        ${this._generateSortOptionsMarkup()}
      </div>
    </div>
    <div class="btn__div">
      <h1 class="btn__div-label">CREATE A</h1>
      <a class="btn btn__left" href="#">STOPWATCH</a>
      <a class="btn btn__right" href="#">COUNTER</a>
    </div>`;
  }

  _generateSortOptionsMarkup() {
    return this._data.sortBy
      .map((option) => {
        const isSelected = option.selected ? ` selected` : ``;
        return `<a class="sort__input${isSelected}" href="#">${option.type}</a>`;
      })
      .join(``);
  }
}

export default new TrackersSelectorView();
