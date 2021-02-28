import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import View from "./Views.js";

class NavigatorView extends View {
  _parentEl = document.querySelector(`.app_navigator`);
  _data;

  addHandlerNavBtns(handler) {
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
  <button class="btn raters_nav">
    <h1>
      raters
    </h1>
  </button>
  <button class="btn data_nav">
  <h1>
    data
  </h1>
 </button>
  <button class="btn trackers_nav">
    <h1>
      trackers
    </h1>
  </button>
  <button class="btn overview_nav">
    <h1>
      overview
    </h1>
   </button>`;
  }
}

export default new NavigatorView();
