/* function:
 * shows a validation error
 * parameters:
 * 	form (DOM element) - the form with the error
 * 	input (DOM element) - the input field with the error
 *  errorMsg (string) - the error message to be displayed
*/
function showError(form, input, errorMsg) {
  const errorInput= form.querySelector(`#${input.id}-error`);
  input.classList.add("modal__input_error");
  errorInput.textContent = errorMsg;
  errorInput.classList.add("modal__error_active");
}



/* function:
 * hides a validation error
 * parameters:
 * 	form (DOM element) - the form with the error
 * 	input (DOM element) - the input field with the error
*/
function hideError(form, input) {
  const errorInput= form.querySelector(`#${input.id}-error`);
  input.classList.remove("modal__input_error");
  errorInput.classList.remove("modal__error_active");
  errorInput.textContent= '';
}



/* function:
 * checks if an input's value is valid, and runs either hideError() or showError() as a result
 * parameters:
 * 	form (DOM element) - the form with the error
 * 	input (DOM element) - the input field with the error
*/
function checkInputValidity(form, input) {
  if (input.validity.valid) hideError(form, input);
  else showError(form, input, input.validationMessage); 
}



/* function:
 * checks if a forms has any invalid inputs, then disables/enables submit button as a result
 * parameters:
 * 	form (DOM element) - the form to check
*/
function toggleButtonState(form) {
  const inputs= Array.from(form.querySelectorAll(".modal__input"));
  const button= form.querySelector('.modal__button');
  
  const somethingIsInvalid= inputs.some((input) => {
    return !input.validity.valid;
  });
  console.log(somethingIsInvalid);

  if (somethingIsInvalid) button.classList.add("modal__button_disabled");
  else button.classList.remove("modal__button_disabled");
}



/* function:
 * sets up event listeners on user input to forms, which run validation functions checkInputValidity() and toggleButtonState()
 * parameters:
 * 	form (DOM element) - the form to set up validation on
*/
function setupValidationListeners(form) {

  const inputs= Array.from(form.querySelectorAll(".modal__input"));

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input); 
      toggleButtonState(form);
    });
  });
}



/* function:
 * finds any forms in DOM, disables submission for default validation and runs setupValidationListeners()
*/
function enableValidation() {
  const forms = Array.from(document.querySelectorAll(".modal"));
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });

    setupValidationListeners(form);
  });
}

enableValidation();