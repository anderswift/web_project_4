import "./index.css";

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCardData } from "../utils/constants.js";


// load all DOM elements objects that will be worked with repeatedly
const profile= document.querySelector('.profile');
const editInfoButton= profile.querySelector('.profile__edit-info');
const profileName= profile.querySelector('.profile__name');
const profileAbout= profile.querySelector('.profile__about');
const addImageButton= profile.querySelector('.profile__add-image');

const cardContainerSelector= '.photo-grid__list';

const exitButtons= document.querySelectorAll('.popup__exit');

const photoViewer= document.querySelector('.photo-viewer');
const photoViewerImage= photoViewer.querySelector('.photo-viewer__image');
const photoViewerCaption= photoViewer.querySelector('.photo-viewer__caption');

const profileForm= document.querySelector('.modal_form_profile');
const profileFormName= profileForm.querySelector('.modal__input_type_name');
const profileFormAbout= profileForm.querySelector('.modal__input_type_about');

const photoForm= document.querySelector('.modal_form_photo');
const photoFormPlace= photoForm.querySelector('.modal__input_type_place');
const photoFormImage= photoForm.querySelector('.modal__input_type_imgsrc');


const userInfo= new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});


// settings for form validation objects
const formSettings= {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_active'
};
// create instances of FormValidator for each form
const photoValidator= new FormValidator(photoForm, formSettings);
const profileValidator= new FormValidator(profileForm, formSettings);








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
 * Opens a popup, making .popup visible
 *
 * @param {HTMLelement} item - indicates to the specific .popup__item to be made active
*/
function openPopup(item) {
  
  // add listener with callback to close popup if user clicks on overlay
  document.addEventListener('click', closePopupOnEsc);

  // add listener with callback to close popup if user presses escape key
  document.addEventListener('keyup', closePopupOnClickAway);
	
	// fade in popup
	item.parentElement.classList.add('popup_active');
}



/* 
 * Opens the profile edit form, calling openPopup()
*/
function openProfileForm() {

  // load the existing content values into the form
  const info= userInfo.getUserInfo();
	profileFormName.value= info.name;
	profileFormAbout.value= info.about;
  
  // run validation checks to ensure initial form state is correct
  const profileFields= [profileFormName, profileFormAbout];
  profileFields.forEach((field) => {
    profileValidator.checkInputValidity(field);
  });
  
  profileValidator.toggleButtonState();

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
	//load photo into viewer
	photoViewerImage.src= imageSrc;
	photoViewerImage.alt= caption;
	photoViewerCaption.textContent= caption;
	
	openPopup(photoViewer);
}



/* 
 * Closes any popup
*/
function exitPopup() {
  const activePopup= document.querySelector('.popup_active');
  activePopup.classList.remove('popup_active');
  
  // remove listener to close popup if user clicks on overlay
  activePopup.removeEventListener('click', closePopupOnEsc);

  // remove listener to close popup if user presses escape key
  document.removeEventListener('keyup', closePopupOnClickAway);
}





// add click events to connect buttons to functions that open and close popups
editInfoButton.addEventListener("click", openProfileForm);
addImageButton.addEventListener("click", openPhotoForm);

exitButtons.forEach((button) => {
	button.addEventListener('click', exitPopup);
});


// add submit event to profile form
profileForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	
  // update text content in profile with new data entered into form
  userInfo.setUserInfo({ name: profileFormName.value, about: profileFormAbout.value });
	
	exitPopup();
});


const cardsList= new Section({ 
  items: initialCardData,
  renderer: (item) => {
    item.photoCallback= openPhotoViewer; 
    const card= new Card(item);  
    const cardElement= card.generateCard();
    cardsList.addItem(cardElement, false);
  }
}, cardContainerSelector);
cardsList.renderItems();


// add submit event to photo form
photoForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
  
  const card= new Card({ name: photoFormPlace.value, imageUrl: photoFormImage.value, photoCallback: openPhotoViewer });  
  const cardElement= card.generateCard();
  cardsList.addItem(cardElement);
	
	exitPopup();
});







// start validation
photoValidator.enableValidation();
profileValidator.enableValidation();



/* Without initial state of "display:none" popups briefly flash on screen
 * while page is loading. This turns off that rule after the page has loaded.
 * The only other way I found to avoid this was to toggle multiple classes to show/hide a popup.  
 */
document.querySelectorAll('.popup').forEach((popup) => { popup.style.display= 'flex'; });
