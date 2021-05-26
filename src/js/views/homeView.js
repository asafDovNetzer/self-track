class HomeView {
  _parentEl = document.querySelector(`.container`);

  render() {
    this._clear();

    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML(`afterbegin`, markup);
  }

  _clear() {
    this._parentEl.innerHTML = ``;
  }

  _generateMarkup() {
    return `
      <div class="trackers">
        <div class="trackers_window">
          <div class="trackers_container_overlay">
            <div class="trackers_container">
            <h1 style="grid-area: 1 / 1 / 3 / 4; padding: 40px 40px; color: rgb(13, 137, 209); text-align: center; line-height: 80px;" >Create your first stopwatch or counter to begin</h1>
            </div>
          </div>
          <div class="trackers_panel btn__panel"></div>
        </div>
       </div>
      <div class="data">
      <h1 style="grid-area: 1 / 1 / 3 / 4; padding: 40px 40px; color: rgb(13, 137, 209); text-align: center; line-height: 80px;" >You have to select A moniter to desplay data</h1>
      </div>
      <div class="raters">
        <div class="raters_container_overlay">
          <div class="raters_container">
          <h1 style="grid-area: 1 / 1 / 3 / 4; padding: 40px 40px; color: rgb(13, 137, 209); text-align: center; line-height: 80px;" >Create your first rater to begin</h1>
          </div>
        </div>
        <div class="raters_panel btn__panel"></div>
      </div>
      <div class="copyrights">
        <div class="copyrights_p">
          <p>&copy; All copyrights belong to Asaf Dov Netzer</p>
        </div>
      </div>
      `;
  }
}

export default new HomeView();
