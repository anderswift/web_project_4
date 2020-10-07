/* function:
 * shows a validation error
 * parameters:
 * 	form (DOM element) - the form with the error
 * 	input (DOM element) - the input field with the error
 *  errorMsg (string) - the error message to be displayed
*/
function showError(form, input, inputErrorClass, errorClass, errorMsg) {
  const errorInput= form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorInput.textContent = errorMsg;
  errorInput.classList.add(errorClass);
}



/* function:
 * hides a validation error
 * parameters:
 * 	form (DOM element) - the form with the error
 * 	input (DOM element) - the input field with the error
*/
function hideError(form, input, inputErrorClass, errorClass) {
  const errorInput= form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorInput.classList.remove(errorClass);
  errorInput.textContent= '';
}



/* function:
 * checks if an input's value is valid, and runs either hideError() or showError() as a result
 * parameters:
 * 	form (DOM element) - the form with the error
 * 	input (DOM element) - the input field with the error
*/
function checkInputValidity(form, input, inputErrorClass, errorClass) {
  if (input.validity.valid) hideError(form, input, inputErrorClass, errorClass);
  else showError(form, input, inputErrorClass, errorClass, input.validationMessage); 
}



/* function:
 * checks if a forms has any invalid inputs, then disables/enables submit button as a result
 * parameters:
 * 	form (DOM element) - the form to check
*/
function toggleButtonState(form, inputSelector, submitButtonSelector, inactiveButtonClass) {
  const inputs= Array.from(form.querySelectorAll(inputSelector));
  const button= form.querySelector(submitButtonSelector);
  
  const somethingIsInvalid= inputs.some((input) => {
    return !input.validity.valid;
  });


  if (somethingIsInvalid) button.classList.add(inactiveButtonClass);
  else button.classList.remove(inactiveButtonClass);
}



/* function:
 * sets up event listeners on user input to forms, which run validation functions checkInputValidity() and toggleButtonState()
 * parameters:
 * 	form (DOM element) - the form to set up validation on
*/
function setupValidationListeners(setup, form) {

  const inputs= Array.from(form.querySelectorAll(setup.inputSelector));

  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, setup.inputErrorClass, setup.errorClass); //passing form, input objects so as avoid querying multiple times
      toggleButtonState(form, setup.inputSelector, setup.submitButtonSelector, setup.inactiveButtonClass);
    });
  });
}



/* function:
 * finds any forms in DOM, disables submission for default validation and runs setupValidationListeners()
 * parameters:
 * 	setup (object) - contains all relevant classes for form elements
*/
function enableValidation(setup) {
  const forms = Array.from(document.querySelectorAll(setup.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });

    setupValidationListeners(setup, form); //passing form object so as avoid querying multiple times
  });
}

enableValidation({
  formSelector: '.modal',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_active'
}); 