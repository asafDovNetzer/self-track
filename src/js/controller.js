import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import * as helpers from "./helpers.js";
import TrackersView from "./views/trackersView.js";
import RatersView from "./views/ratersView.js";
import TrackersSelectorView from "./views/trackersSelectorView.js";
import RatersSelectorView from "./views/ratersSelectorView.js";
import FormView from "./views/formView.js";
import ExpandView from "./views/expandView.js";
import EntriesView from "./views/entriesView.js";
import formView from "./views/formView.js";
import NavigatorView from "./views/navigatorView.js";
import expandView from "./views/expandView.js";
import HomeView from "./views/homeView.js";
import ratersView from "./views/ratersView.js";

const signinbtn = document.querySelector(`.user`);
const pin = document.querySelector(`.password`);
// const signupbtn = document.querySelector(`.btn--signup`);

const updateOnClick = function (id, btn) {
  model.trackerIdentifier(id, btn);
  TrackersView.updateUI(model.state.currentSubject.trackers);
  refreshDataView();

  if (!btn) scrollToView(`.data`);
  // console.log(model.state.currentSubject);
};

const controlRater = function (id, btn) {
  model.raterIdentifier(id, btn);
  RatersView.updateUI(model.state.currentSubject.raters);
  refreshDataView();
  console.log(model.state.currentSubject.raters);

  if (!btn) scrollToView(`.data`);
};

const everySecond = function () {
  TrackersView.updateTime();
  if (!model.state.currentSubject.expandObject.type) return;
  ExpandView.updateTime();
};

const controlExpandView = function (btn) {
  if (btn === `delete__btn`) {
    model.deleteMonitor();
    // console.log(model.state.currentSubject.expandObject);
    TrackersView.render(model.state.currentSubject.trackers);
    RatersView.render(model.state.currentSubject.raters);
    refreshDataView();
  }
  if (btn === `edit__btn`) {
    openForm(model.state.currentSubject.expandObject);
  }
  if (btn === `up__btn`) scrollToView(`.trackers`);
};

const controlTrackersSelector = function (btn) {
  // console.log(btn);
  if (btn === `btn__left`) {
    openForm(model.createStopwatchPrototype());
  }
  if (btn === `btn__right`) {
    openForm(model.createCounterPrototype());
  }
};

const controlRatersSelector = function (btn) {
  console.log(btn);
  if (btn === `btn__left`) {
    openForm(model.createRaterPrototype());
  }
};

const openForm = function (tracker, isNew = true) {
  model.createformObject(tracker, isNew);

  FormView.openModel(model.state.formObject, 2);
  FormView.addHandlerToggle(controlFormSelect);
};

const controlFormSelect = function (value, selection) {
  console.log(value, selection);
  if (selection === `unit`) {
    model.changeFormUnit(value);
  }
  if (selection === `amount`) {
    model.changeFormAmount(value);
  }
  if (selection === `btn_functionality`) {
    model.changeCounterBtnFunc(value);
  }
  formView.updateUI();
};

const controlFormButton = function (btn) {
  const lastPage =
    model.state.formObject.currentPage ===
    model.state.formObject.numberOfPages - 1;
  const firstPage = model.state.formObject.currentPage === 0;

  if (btn === `right` && lastPage) {
    model.submitForm();
    FormView.closeModel();
    TrackersView.render(model.state.currentSubject.trackers);
    RatersView.render(model.state.currentSubject.raters);
    refreshDataView();
  }
  if (btn === `right` && !lastPage) {
    FormView.getFormData(inspectFormData);
    FormView.updateUI();
  }
  if (btn === `left` && !firstPage) {
    model.state.formObject.currentPage--;
    FormView.updateUI();
  }
  if (btn === `left` && firstPage) {
    FormView.closeModel();
  }
  if (typeof btn === `number`) {
    model.state.formObject.currentPage = btn;
    FormView.updateUI();
  }
};

const inspectFormData = function (data) {
  if (helpers.checkForError(data.title)) {
    model.state.formObject.errorMessage = helpers.checkForError(data.title);
    FormView.updateUI();
  }

  if (!helpers.checkForError(data.title)) {
    model.state.formObject.currentPage++;
    model.state.formObject.errorMessage = ``;
    model.updateFormData(data);
    FormView.updateUI();
  }
};

const controlNav = function (btn) {
  const string = `.` + btn.slice(0, -4);

  scrollToView(string);
};

const scrollToView = function (className) {
  const top =
    document.querySelector(className).offsetTop -
    document.querySelector(`.header_container`).offsetHeight;

  window.scrollTo({
    top: top,
    left: 0,
    behavior: `smooth`,
  });
};

const controlExpandSelector = function (value, classList) {
  console.log(value, classList);
  if (classList === `day`) {
    const obj = { day: +value - 1, month: undefined, year: undefined };
    expandView.setDate(obj);
    EntriesView.setDate(obj);
  }
  if (classList === `month`) {
    const obj = { day: undefined, month: +value - 1, year: undefined };
    expandView.setDate(obj);
    EntriesView.setDate(obj);
  }
  if (classList === `year`) {
    const obj = { day: undefined, month: undefined, year: +value - 1 };
    expandView.setDate(obj);
    EntriesView.setDate(obj);
  }
  refreshDataView();
};

const init = function () {
  model.getLocalStorage();
  console.log(model.state);
  model.enterSubject();

  HomeView.render();
  setParentElements();

  model.setDate();
  model.memoryCheck();
  model.setExpandObject();

  NavigatorView.render(`1`);
  NavigatorView.addHandlerNavBtns(controlNav);
  // OverviewView.render(`1`, false);

  model.runStopwatches();
  TrackersView.setDate(model.state.now);
  RatersView.setDate(model.state.now);
  expandView.setDate(model.state.now);
  EntriesView.setDate(model.state.now);

  TrackersView.render(model.state.currentSubject.trackers, true);
  TrackersView.addHandlerTrackerBtns(updateOnClick);
  // console.log(model.state.currentSubject);
  RatersView.render(model.state.currentSubject.raters);
  RatersView.addHandlerRatersBtns(controlRater);

  FormView.addHandlerFormBtns(controlFormButton);

  refreshDataView();
  ExpandView.addHandlerExpandBtns(controlExpandView);

  TrackersSelectorView.render(model.state.currentSubject.userPrefrences);
  TrackersSelectorView.addHandlerCreateBtns(controlTrackersSelector);
  RatersSelectorView.render(model.state.currentSubject.userPrefrences);
  RatersSelectorView.addHandlerCreateBtns(controlRatersSelector);

  const interval = setInterval(everySecond, 1000);
};

signinbtn.addEventListener(`click`, function (e) {
  // console.log(pin.value);
  if (pin.value === `6546`) init();
});

const setParentElements = function () {
  TrackersView.setParentEl();
  ExpandView.setParentEl();
  TrackersSelectorView.setParentEl();
  RatersSelectorView.setParentEl();
  ratersView.setParentEl();
};

const refreshDataView = function () {
  if (!model.state.currentSubject.expandObject.type) return;

  ExpandView.render(model.state.currentSubject.expandObject);
  EntriesView.selectParentElement();
  EntriesView.render(model.state.currentSubject.expandObject.memory);
  ExpandView.addHandlerToggle(controlExpandSelector);
};
