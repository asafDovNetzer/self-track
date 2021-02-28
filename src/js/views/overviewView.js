import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class OverviewView extends View {
  // _parentEl = document.querySelector(`.header`);
  _data;

  setParentEl() {
    this._parentEl = document.querySelector(`.`);
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
    <div class="overview"></div>`;
  }
}

export default new OverviewView();
