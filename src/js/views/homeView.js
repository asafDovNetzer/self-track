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
            <div class="trackers_container"></div>
          </div>
          <div class="trackers_panel btn__panel"></div>
        </div>
       </div>
      <div class="data"></div>
      <div class="raters">
        <div class="raters_container_overlay">
          <div class="raters_container"></div>
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
