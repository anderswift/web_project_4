import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._handleSubmit= handleSubmit;

    this.setEventListeners(); // seems easier to do this here instead of calling it separately each time in index.js 

    this._inputs= this._popupItem.querySelectorAll('.modal__input');
  }

  _getInputValues() {
    const object= {};
    this._inputs.forEach((input) => {
      const name= input.getAttribute("name").split('-').pop();
      const value= input.value;
      object[name]= value;
    });
    return object;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupItem.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
  }
}