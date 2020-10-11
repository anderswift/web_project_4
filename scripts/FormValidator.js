export class FormValidator {
  constructor(formElement, settings) {
    this._formElement= formElement;
    this._inputSelector= settings.inputSelector;
    this._submitButtonSelector= settings.submitButtonSelector;
    this._inactiveButtonClass= settings.inactiveButtonClass;
    this._inputErrorClass= settings.inputErrorClass;
    this._errorClass= settings.errorClass;
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


  _checkInputValidity(input) {
    if (input.validity.valid) this._hideError(input);
    else this._showError(input, input.validationMessage); 
  }


  _toggleButtonState() {
    const inputs= Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const button= this._formElement.querySelector(this._submitButtonSelector);
    
    const somethingIsInvalid= inputs.some((input) => {
      return !input.validity.valid;
    });
  
    if (somethingIsInvalid) button.classList.add(this._inactiveButtonClass);
    else button.classList.remove(this._inactiveButtonClass);
  }


  _setupValidationListeners() {
    const inputs= Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }


  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._setupValidationListeners();
  }
}


