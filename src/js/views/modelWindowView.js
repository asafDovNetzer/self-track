export default class ModelWindowView {
  _overlayEl = document.querySelector(`.overlay`);
  _bodyEl = document.querySelector(`body`);
  _parentEl = document.querySelector(`.model_window`);
  _data;

  openModel(data, size) {
    this._parentEl.classList.remove(`hidden`);
    this._overlayEl.classList.remove(`hidden`);
    this._bodyEl.classList.add(`freeze`);

    this._parentEl.style.width = `${500 * size}px`;
    this._parentEl.style.height = `${190 * size}px`;

    this._data = data;
    console.log(`openmodel`);
    this.rendor();
  }

  closeModel() {
    this._clear();
    console.log(`clearmodel`);

    this._overlayEl.classList.add(`hidden`);
    this._parentEl.classList.add(`hidden`);
    this._bodyEl.classList.remove(`freeze`);
  }

  rendor() {
    this._clear();

    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML(`afterbegin`, markup);
  }

  _clear() {
    this._parentEl.innerHTML = ``;
  }

  updateUI() {
    const newMarkup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll(`*`));
    const curElements = Array.from(this._parentEl.querySelectorAll(`*`));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  addHandlerExpandBtns(handler) {
    // this._parentEl.addEventListener(`click`, function (e) {
    //   const btnEl = e.target.closest(`.btn`);
    //   if (!btnEl) return;
    //   const btn = btnEl.classList[1];
    //   handler(btn);
    // });
  }

  _clear() {
    this._parentEl.innerHTML = ``;
  }
}
