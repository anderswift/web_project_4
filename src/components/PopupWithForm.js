import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._handleSubmit= handleSubmit;

    this.setEventListeners(); // seems easier to do this here instead of calling it separately each time in index.js 

    this._inputs= this._popupItem.querySelectorAll('.modal__input');
    this._submit= this._popupItem.querySelector('.modal__button');
    this._submitText= this._submit.textContent;
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
    this._popupItem.reset();
    super.close();

    // delay reset of button until css transition complete
    setTimeout(() => { this._submit.textContent= this._submitText; }, 200); 
  }


  saving() {
    this._submit.textContent= 'Saving...'
  }
  
}