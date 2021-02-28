import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

import ModelWindowView from "./modelWindowView.js";

class FormView extends ModelWindowView {
  _data;

  addHandlerToggle(handler) {
    const selectionsEl = document.querySelectorAll(`.form_selection`);

    selectionsEl.forEach((selection) => {
      selection.addEventListener(`change`, function (e) {
        // console.log(e.target.value);
        handler(e.target.value, e.target.classList[1]);
      });
    });
    // console.log(selectionsEl);
  }

  addHandlerFormBtns(handler) {
    this._parentEl.addEventListener(`click`, function (e) {
      const btnEl = e.target.closest(`.btn`);
      if (!btnEl) return;
      let btn = btnEl.classList[1];
      // console.log(btn);
      if (btn === `dot_icon`) {
        // console.log(btnEl.dataset.id);
        btn = +btnEl.dataset.id;
      }
      handler(btn);
    });
  }

  _generateMarkup() {
    const leftButtonText = this._data.currentPage !== 0 ? `back` : `cancel`;
    const rightButtonText =
      this._data.currentPage === this._data.numberOfPages - 1
        ? `finish`
        : `next`;
    return `
    <div class="model_content">
        <div class="header">
          <h1>${this._data.header}</h1>
        </div>
        <div class="content">${this._generateFormMarkup()}</div>
        <nav class="form_nav">
          <button class="btn left active">${leftButtonText}</button>
          <div class="dots_container">${this._generateDots()}</div>
          <button class="btn right active">${rightButtonText}</button>
        </nav>
      </div>`;
  }

  _generateDots() {
    let string = ``;

    for (let i = 0; i < this._data.numberOfPages; i++) {
      const dotActive = i === this._data.currentPage ? ` active` : ``;

      string =
        string +
        `</button>
      <button class="dot">
        <svg class="btn dot_icon${dotActive}" data-id="${i}" width="10" height="10" fill="currentColor">
          <use
            href="${icons}#circle-fill"
          />
        </svg>
      </button>`;
    }
    return string;
  }

  getFormData(collector) {
    const title = document.querySelector(`.title_input`);
    const description = document.querySelector(`.description_input`);
    const btnFunctionality = document.querySelector(`.btn_functionality_input`);
    const rateDescriptions = document.querySelectorAll(`.rate_description`);
    // console.log(rateDescriptions);
    const descArr = Array.from(rateDescriptions).map((desc) => desc.value);
    // console.log(descArr);
    const data = {
      title: title.value,
      description: description.value,
      btnFunctionality: btnFunctionality?.value,
      rateDescriptions: descArr.reverse(),
    };

    collector(data);
  }

  _generateFormMarkup() {
    if (this._data.monitor.type === `stopwatch`)
      return this._generateStopwatchFormMarkup();
    if (this._data.monitor.type === `counter`)
      return this._generateCounterFormMarkup();
    if (this._data.monitor.type === `rater`)
      return this._generateRaterFormMarkup();
  }

  _generateRaterFormMarkup() {
    return `
    <div class="page-0${
      this._data.currentPage !== 0 ? ` hidden` : ``
    }" data-page="0">
    <div class="first_column">
      <label>Title</label>
      <input
        class="title_input"
        value="${this._data.monitor.name}"
        name="title"
        type="text"
        placeholder="Should be between 3-17 characters"
      />
      <p>${this._data.errorMessage}</p>

      <label>Description</label>
      <textarea
        class="description_input"
        name="description"
        cols="40"
        rows="5"
        placeholder="e.g. tracking how much TV i watch..."
      >${this._data.monitor.description}</textarea>
    </div>
    <div class="second_column_3">
              <label>Rating Description</label>
              <p>
                Give a short description to each of the five rating options (unnecessary).
              </p>
              <div class="descriptions">
                
                  <input class="rate_description" value="${
                    this._data.monitor.rateDescriptions[4]
                  }" type="text" placeholder="e.g very difficult..">
                  <div>

                    <svg
                    class="icon"
                    width="16"
                    height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
      <svg
      class="icon"
      width="16"
      height="16"
      fill="currentColor"
      >
      <use
      href="${icons}#star-fill
      "
      />
    </svg>
    <svg
    class="icon"
    width="16"
    height="16"
    fill="currentColor"
    >
    <use
    href="${icons}#star-fill
    "
    />
  </svg>
  <svg
  class="icon"
  width="16"
  height="16"
  fill="currentColor"
  >
  <use
  href="${icons}#star-fill
  "
  />
</svg>
<svg
class="icon"
width="16"
height="16"
fill="currentColor"
>
<use
href="${icons}#star-fill
"
/>
</svg>
</div>
                  <input class="rate_description" value="${
                    this._data.monitor.rateDescriptions[3]
                  }" type="text" placeholder="e.g somewhat difficult..">
                  <div>

                    <svg
                    class="icon"
                    width="16"
                    height="16"
                    fill="currentColor"
                    >
                    <use
                    href="${icons}#star-fill
        "
        />
      </svg>
      <svg
      class="icon"
        width="16"
        height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
      <svg
        class="icon"
        width="16"
        height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
      <svg
      class="icon"
      width="16"
      height="16"
      fill="currentColor"
      >
      <use
      href="${icons}#star-fill
      "
      />
    </svg>
  </div>
          
                  <input class="rate_description" value="${
                    this._data.monitor.rateDescriptions[2]
                  }" type="text" placeholder="e.g moderate">
                  <div>

                    <svg
                    class="icon"
                    width="16"
                    height="16"
                    fill="currentColor"
                    >
                    <use
                    href="${icons}#star-fill
                    "
                    />
                  </svg>
                  <svg
                  class="icon"
        width="16"
        height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
      <svg
      class="icon"
        width="16"
        height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
    </div>
      
                  <input class="rate_description" value="${
                    this._data.monitor.rateDescriptions[1]
                  }" type="text" placeholder="e.g pretty easy..">
                  <div>

                    <svg
                    class="icon"
                    width="16"
                    height="16"
                    fill="currentColor"
                    >
                    <use
                    href="${icons}#star-fill
        "
        />
      </svg>
      <svg
      class="icon"
        width="16"
        height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
    </div>
            
                  <input class="rate_description" value="${
                    this._data.monitor.rateDescriptions[0]
                  }" type="text" placeholder="e.g very easy..">
                  <svg
        class="icon"
        width="16"
        height="16"
        fill="currentColor"
        >
        <use
        href="${icons}#star-fill
        "
        />
      </svg>
               
              </div>
            </div>
  </div>
  <div class="page-1${this._data.currentPage !== 1 ? ` hidden` : ``}">
      <div class="notification">
        <h1>notification:</h1>
        <select class="form_selection notify">
          <option value="auto">Auto</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>`;
  }

  _generateStopwatchFormMarkup() {
    const amount = this._data.monitor.quickFixButtons.amount;
    const unit = this._data.monitor.quickFixButtons.unit;

    return `
    <div class="page-0${
      this._data.currentPage !== 0 ? ` hidden` : ``
    }" data-page="0">
    <div class="first_column">
      <label>Title</label>
      <input
        class="title_input"
        value="${this._data.monitor.name}"
        name="title"
        type="text"
        placeholder="Should be between 3-17 characters"
      />
      <p>${this._data.errorMessage}</p>

      <label>Description</label>
      <textarea
        class="description_input"
        name="description"
        cols="40"
        rows="5"
        placeholder="e.g. tracking how much TV i watch..."
      >${this._data.monitor.description}</textarea>
    </div>
    <div class="second_column">
      <label>Quick-fix Buttons</label>
      <p>
        These buttons help you fix the stopwatch's value with a single
        click.
      </p>
      <div class="btn__preview">
        <div class="left">+ ${amount} ${unit}</div>
        <div class="right">${amount} ${unit} -</div>
      </div>
      <div class="btn__function">
        <select class="form_selection amount" name="amount">
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
        <select class="form_selection unit" name="unit">
          <option value="min">minutes</option>
          <option value="sec">seconds</option>
        </select>
      </div>
    </div>
  </div>
  <div class="page-1${this._data.currentPage !== 1 ? ` hidden` : ``}">
      <div class="notification">
        <h1>notification:</h1>
        <select class="form_selection notify">
          <option value="auto">Auto</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>`;
  }

  _generateCounterFormMarkup() {
    console.log(this._data);

    return `
    <div class="page-0${
      this._data.currentPage !== 0 ? ` hidden` : ``
    }" data-page="0">
      <div class="first_column">
        <label>Title</label>
        <input
          class="title_input"
          value="${this._data.monitor.name}"
          name="title"
          type="text"
          placeholder="Should be between 3-17 characters"
        />
        <p>${this._data.errorMessage}</p>

        <label>Description</label>
        <textarea
          class="description_input"
          name="description"
          cols="40"
          rows="5"
          placeholder="e.g. tracking how many cups of coffee i drink..."
        >${this._data.monitor.description}</textarea>
      </div>
      <div class="second_column_2">
        <label>Button control</label>
        <p>
          Choose what the buttons add or reduce from the count.
        </p>
        <select class="form_selection btn_functionality">
          <option value="auto"${
            this._data.buttonSelect === `auto` ? ` selected` : ``
          }>Auto</option>
          <option value="custom">Custom</option>
        </select>
        <div class="btn__preview_container">
        <div class="btn__preview-disabled ${
          this._data.buttonSelect !== `auto` ? `disabled` : ``
        }">
        <button class="form_btn">
        <svg
        class="form_btn_icon"
        width="55"
        height="55"
        fill="currentColor"
        >
        <use
        href="${icons}#plus-circle"
        />
        </svg>
        </button>
        <input type="number" value="1" readonly>
        <button class="form_btn">
        <svg
        class="form_btn_icon"
        width="55"
        height="55"
        fill="currentColor"
        >
        <use
        href="${icons}#dash-circle"
        />
        </svg>
        </button>
        </div>
        <div class="btn__preview ${
          this._data.buttonSelect === `auto` ? `disabled` : ``
        }">
        <button class="form_btn">
        <svg
        class="form_btn_icon"
        width="55"
        height="55"
        fill="currentColor"
        >
        <use
        href="${icons}#plus-circle"
        />
        </svg>
        </button>
        <input class="btn_functionality_input" type="number" value="1">
        <button class="form_btn">
        <svg
        class="form_btn_icon"
        width="55"
        height="55"
        fill="currentColor"
        >
        <use
        href="${icons}#dash-circle"
        />
        </svg>
        </button>
        </div>
        </div>
      </div>
    </div>
    <div class="page-1${this._data.currentPage !== 1 ? ` hidden` : ``}">
      <div class="notification">
        <h1>notification:</h1>
        <select class="form_selection notify">
          <option value="auto">Auto</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>`;
  }
}

export default new FormView();
