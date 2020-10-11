import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";


// load all DOM elements objects that will be worked with repeatedly
const profile= document.querySelector('.profile');
const editInfoButton= profile.querySelector('.profile__edit-info');
const profileName= profile.querySelector('.profile__name');
const profileAbout= profile.querySelector('.profile__about');
const addImageButton= profile.querySelector('.profile__add-image');

const cardContainer= document.querySelector('.photo-grid__list')

const popup= document.querySelector('.popup');
const exitButtons= popup.querySelectorAll('.popup__exit');
const photoViewer= popup.querySelector('.photo-viewer');
const photoViewerImage= photoViewer.querySelector('.photo-viewer__image');
const photoViewerCaption= photoViewer.querySelector('.photo-viewer__caption');

const profileForm= popup.querySelector('.modal_form_profile');
const profileFormName= profileForm.querySelector('.modal__input_type_name');
const profileFormAbout= profileForm.querySelector('.modal__input_type_about');

const photoForm= popup.querySelector('.modal_form_photo');
const photoFormPlace= photoForm.querySelector('.modal__input_type_place');
const photoFormImage= photoForm.querySelector('.modal__input_type_imgsrc');




/* 
 * Callback function that closes popup when escape key pressed
*/
const closePopupOnEsc= (e) => {
  if(e.target.classList.contains('popup')) exitPopup();
}



/* 
 * Callback function that closes popup when overlay clicked
*/
const closePopupOnClickAway= (e) => {
  if(e.key === 'Escape') exitPopup();
}



/*
 * Opens a popup, making .popup and the active .popup__item visible
 *
 * @param {HTMLelement} item - indicates to the specific .popup__item to be made active
 * @param {boolean} [dark= false] - indicates whether to use a 90% black overlay or the default 50% black overlay
*/
function openPopup(item, dark= false) {
	
	// add class for darker overlay if necessary
	if (!dark) popup.classList.remove('popup_dark');
	else if(!popup.classList.contains('popup_dark')) popup.classList.add('popup_dark');

	// update which popup item is active (necessary to do here so as not to interfere with transitions)
	const active= popup.querySelector('.popup__item_active');
	if(active) active.classList.remove('popup__item_active');
  item.classList.add('popup__item_active');
  
  // add listener with callback to close popup if user clicks on overlay
  popup.addEventListener('click', closePopupOnEsc);

  // add listener with callback to close popup if user presses escape key
  document.addEventListener('keyup', closePopupOnClickAway);
	
	// fade in popup
	popup.classList.remove('popup_hidden');
}



/* 
 * Opens the profile edit form, calling openPopup()
*/
function openProfileForm() {

	// load the existing content values into the form
	profileFormName.value= profileName.textContent;
	profileFormAbout.value= profileAbout.textContent;
  
  // run validation checks to ensure initial form state is correct
  const profileFields= [profileFormName, profileFormAbout];
  profileFields.forEach((field) => {
    if(field.validity) {
      field.classList.remove('modal__input_type_error');
      const errorInput= profileForm.querySelector(`#${field.id}-error`);
      errorInput.classList.remove('modal__error_active');
      errorInput.textContent= '';
    }
  });
  
  if(profileFormName.validity && profileFormAbout.validity)
    profileForm.querySelector('.modal__button').classList.remove('modal__button_disabled');

	// fade in the profile form modal
	openPopup(profileForm);
}



/* 
 * Opens the add photo form, calling openPopup()
*/
function openPhotoForm() {

	// fade in the profile form modal
	openPopup(photoForm);
}



/*
 * Opens the photo viewer, calling openPopup()
 *
 * @param {string} imageSrc - the image src link
 * @param {string} caption - the caption
*/
const openPhotoViewer= (imageSrc, caption) => {
	console.log('running');
	//load photo into viewer
	photoViewerImage.src= imageSrc;
	photoViewerImage.alt= caption;
	photoViewerCaption.textContent= caption;
	
	openPopup(photoViewer, true);
}



/* 
 * Closes any popup
*/
function exitPopup() {
  popup.classList.add('popup_hidden');
  
  // remove listener to close popup if user clicks on overlay
  popup.removeEventListener('click', closePopupOnEsc);

  // remove listener to close popup if user presses escape key
  document.removeEventListener('keyup', closePopupOnClickAway);
}



//add click events to connect buttons to functions that open and close popups
editInfoButton.addEventListener("click", openProfileForm);
addImageButton.addEventListener("click", openPhotoForm);


exitButtons.forEach((button) => {
	button.addEventListener('click', exitPopup);
});



//add submit event to profile form
profileForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	
	// update text content in profile with new data entered into form
	profileName.textContent= profileFormName.value;
	profileAbout.textContent= profileFormAbout.value;
	
	exitPopup();
});


//add submit event to photo form
photoForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	
  const card= new Card({ 
    name: photoFormPlace.value, 
    imageUrl: photoFormImage.value, 
    photoCallback: openPhotoViewer 
  });
	renderCard(cardContainer, card.generateCard());
	
	exitPopup();
});



/*
 * Adds a photo card to a container element
 * 
 * @param {HTMLelement} container - container element
 * @param {HTMLelement} cardHTML - photo card node ready to insert
 * @param {boolean} [prepend= true] - indicates whether to prepend card to beginning of list or add at the end
*/
function renderCard(container, cardElement, prepend= true) {
	// add the photo to the DOM
	if (prepend) container.prepend(cardElement);
	else container.append(cardElement);
}




// initial set of photo cards, to be loaded dynamically
const initialCards = [
  { name: 'Yosemite Valley', imageUrl: 'https://code.s3.yandex.net/web-code/yosemite.jpg' },
  { name: 'Lake Louise', imageUrl: 'https://code.s3.yandex.net/web-code/lake-louise.jpg' },
  { name: 'Bald Mountains', imageUrl: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg' },
  { name: 'Latemar', imageUrl: 'https://code.s3.yandex.net/web-code/latemar.jpg' },
  { name: 'Vanoise National Park', imageUrl: 'https://code.s3.yandex.net/web-code/vanoise.jpg' },
  { name: 'Lago di Braies', imageUrl: 'https://code.s3.yandex.net/web-code/lago.jpg' }
];


// populate .photo-grid__list with initial array of photos and captions
initialCards.forEach((setup) => {
  setup.photoCallback= openPhotoViewer;
  const card= new Card(setup);
	renderCard(cardContainer, card.generateCard(), false);
});



const forms = Array.from(document.querySelectorAll('.modal'));
forms.forEach((form) => { 
  const validator= new FormValidator(
    form, 
    {
      inputSelector: '.modal__input',
      submitButtonSelector: '.modal__button',
      inactiveButtonClass: 'modal__button_disabled',
      inputErrorClass: 'modal__input_type_error',
      errorClass: 'modal__error_active'
    }
  );
  validator.enableValidation();
});