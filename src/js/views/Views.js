import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
// import { getDateObject } from "../helpers.js";

export default class View {
  render(data, strach = false) {
    if (!data) return;
    console.log(data);

    this._data = data;

    if (data.length !== 0) this._clear();

    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML(`afterbegin`, markup);
    this._parentEl.classList.add(`full_container`);

    if (!strach) return;

    const childElements = this._selectFirstLevelChildren();
    // console.log(childElements);
    childElements.forEach((el) => (el.style.opacity = 0));

    setTimeout(function () {
      childElements.forEach((el) => (el.style.opacity = 1));
    }, 300);
  }

  setDate(date) {
    // console.log(date);
    const { day, month, year } = date;
    // console.log(day);
    this._date.day = day || day === 0 ? day : this._date.day;
    this._date.month = month || month === 0 ? month : this._date.month;
    this._date.year = year || year === 0 ? year : this._date.year;
    // this._date = date;
  }

  _clear() {
    this._parentEl.innerHTML = ``;
  }

  closeView() {
    const childElements = this._selectFirstLevelChildren();
    const parentEl = this._parentEl;
    childElements.forEach((el) => (el.style.opacity = 0));

    setTimeout(function () {
      parentEl.classList.remove(`full_container`);
    }, 700);
  }

  _selectFirstLevelChildren() {
    const children = Array.from(this._parentEl.childNodes).filter(
      (child) => child.nodeType == 1
    );
    return children;
  }

  updateUI(newData = false) {
    if (newData) {
      this._data = newData;
    }

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
}
