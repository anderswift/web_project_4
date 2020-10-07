// load all DOM elements objects that will be worked with repeatedly
const profile= document.querySelector('.profile');
const editInfoButton= profile.querySelector(".profile__edit-info");
const profileName= profile.querySelector(".profile__name");
const profileAbout= profile.querySelector(".profile__about");
const addImageButton= profile.querySelector(".profile__add-image");

const photoContainer= document.querySelector('.photo-grid__list');
const photoTemplate= document.querySelector('#photo-template').content;

const popup= document.querySelector(".popup");
const exitButtons= popup.querySelectorAll(".popup__exit");
const photoViewer= popup.querySelector(".photo-viewer");
const photoViewerImage= photoViewer.querySelector(".photo-viewer__image");
const photoViewerCaption= photoViewer.querySelector(".photo-viewer__caption");

const profileForm= popup.querySelector(".modal_form_profile");
const profileFormName= profileForm.querySelector(".modal__input_type_name");
const profileFormAbout= profileForm.querySelector(".modal__input_type_about");

const photoForm= popup.querySelector(".modal_form_photo");
const photoFormPlace= photoForm.querySelector(".modal__input_type_place");
const photoFormImage= photoForm.querySelector(".modal__input_type_imgsrc");


// initial set of photo cards, to be loaded dynamically
const initialCards = [
  { name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg" },
  { name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg" },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg" }
];


/* function: adds a photo card to .photo-grid__list
 * parameters:
 * 	cardObj (object) - contains data for image src and caption
 * 	prepend (boolean) - indicates whether to prepend card to beginning of list (default) or add at the end
*/
function addPhotoCard(cardObj, prepend= true) {
	
	// clone template for photo card 
	const newPhoto= photoTemplate.cloneNode(true);
	const newImage= newPhoto.querySelector(".photo__image");
	
	// add image src, alt, and event listener for popup viewer
	newImage.src= cardObj.link;
	newImage.alt= cardObj.name;
	newImage.addEventListener("click", (e) => {
		e.preventDefault();
		openPhotoViewer(cardObj.link, cardObj.name);
	});
	
	// add caption content
	newPhoto.querySelector(".photo__caption").textContent= cardObj.name;
	
	// add like event to button
	newPhoto.querySelector(".photo__like").addEventListener("click", (e) => {
		e.target.classList.toggle("photo__like_on");
		e.target.blur();
	});
	
	// add like event to button
	newPhoto.querySelector(".photo__delete").addEventListener("click", (e) => {
		e.target.parentNode.remove();
	});
	
	// add the photo to the DOM
	if (prepend) photoContainer.prepend(newPhoto);
	else photoContainer.append(newPhoto);
}



/* function: opens a popup, making .popup and the active .popup__item visible
 * parameters:
 * 	item (DOM element) - indicates to the specific .popup__item to be made active
 * 	dark (boolean) - indicates whether to add .popup_dark class to make a 90% black overlay, vs. the default 50% black overlay
*/
function openPopup(item, dark= false) {
	
	// add class for darker overlay if necessary
	if (!dark) popup.classList.remove('popup_dark');
	else if(!popup.classList.contains('popup_dark')) popup.classList.add('popup_dark');

	// update which popup item is active (necessary to do here so as not to interfere with transitions)
	let active= popup.querySelector(".popup__item_active");
	if(active) active.classList.remove("popup__item_active");
	item.classList.add('popup__item_active');
	
	// fade in popup
	popup.classList.remove('popup_hidden');
}



/* function:
 * opens the profile edit form, calling openPopup()
*/
function openProfileForm() {

	// load the existing content values into the form
	profileFormName.value= profileName.textContent;
	profileFormAbout.value= profileAbout.textContent;
  
  toggleButtonState(profileForm);

	// fade in the profile form modal
	openPopup(profileForm);
}



/* function:
 * opens the add photo form, calling openPopup()
*/
function openPhotoForm() {

	// fade in the profile form modal
	openPopup(photoForm);
}



/* function: opens the photo viewer, calling openPopup()
 * parameters:
 * 	imageSrc (string) - the image src link
 * 	caption (string) - the caption
*/
function openPhotoViewer(imageSrc, caption) {
	
	//load photo into viewer
	photoViewerImage.src= imageSrc;
	photoViewerImage.alt= caption;
	photoViewerCaption.textContent= caption;
	
	openPopup(photoViewer, true);
}



/* function:
 * closes any popup
*/
function exitPopup() {
	popup.classList.add('popup_hidden');
}



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




/*
 * add click events to connect buttons to functions that open and close popups
*/
editInfoButton.addEventListener("click", openProfileForm);
addImageButton.addEventListener("click", openPhotoForm);

exitButtons.forEach((button) => {
	button.addEventListener("click", exitPopup);
});



/*
 * add submit events to profile and photo form
*/
profileForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	
	// update text content in profile with new data entered into form
	profileName.textContent= profileFormName.value;
	profileAbout.textContent= profileFormAbout.value;
	
	exitPopup();
});


photoForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	
	// run addPhotoCard() to add a photo card to the DOM with the data entered into form
	const cardObj= [];
	cardObj.name= photoFormPlace.value;
	cardObj.link= photoFormImage.value;
	addPhotoCard(cardObj);
	
	exitPopup();
});



// populate .photo-grid__list with initial array of photos and captions
initialCards.forEach((item) => {
	addPhotoCard(item, false);
});
  



popup.addEventListener("click", function (e) {
  if(e.target.classList.contains('popup')) exitPopup();
});

document.addEventListener("keyup", function (e) {
  if(e.key === 'Escape') exitPopup();
});