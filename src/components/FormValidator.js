export class FormValidator {
  constructor(formElement, settings) {
    this._formElement= formElement;
    this._inputSelector= settings.inputSelector;
    this._submitButtonSelector= settings.submitButtonSelector;
    this._inactiveButtonClass= settings.inactiveButtonClass;
    this._inputErrorClass= settings.inputErrorClass;
    this._errorClass= settings.errorClass;

    // more efficient to do this here, so I don't have to query every time I run toggleButtonState
    this._inputs= Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._button= this._formElement.querySelector(this._submitButtonSelector);
  }


  _showError(input, errorMessage) {
    const errorInput= this._formElement.querySelector(`#${input.id}-error`);
    errorInput.textContent= errorMessage;
    errorInput.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }


  _hideError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorInput= this._formElement.querySelector(`#${input.id}-error`);
    errorInput.classList.remove(this._errorClass);
    errorInput.textContent= '';
  }


  checkInputValidity(input) {
    if (input.validity.valid) this._hideError(input);
    else this._showError(input, input.validationMessage); 
  }


  toggleButtonState() {
    const somethingIsInvalid= this._inputs.some((input) => {
      return !input.validity.valid;
    });
  
    if (somethingIsInvalid) this._button.classList.add(this._inactiveButtonClass);
    else this._button.classList.remove(this._inactiveButtonClass);
  }


  // after resetting form, validation messages should also reset
  _resetValidationMessages() {
    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }


  _setupValidationListeners() {  
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }


  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._formElement.addEventListener('reset', (e) => {
      this._resetValidationMessages();
    });


    this._setupValidationListeners();
  }
}


