import "./index.css";

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCardData } from "../utils/constants.js";


// load all DOM elements objects that will be worked with repeatedly
const profile= document.querySelector('.profile');
const editInfoButton= profile.querySelector('.profile__edit-info');
const addImageButton= profile.querySelector('.profile__add-image');

const cardContainerSelector= '.photo-grid__list';




const profileForm= document.querySelector('.modal_form_profile');
const profileFormName= profileForm.querySelector('.modal__input_type_name');
const profileFormAbout= profileForm.querySelector('.modal__input_type_about');

const photoForm= document.querySelector('.modal_form_photo');
const photoFormPlace= photoForm.querySelector('.modal__input_type_place');
const photoFormImage= photoForm.querySelector('.modal__input_type_imgsrc');



const photoViewerPopup= new PopupWithImage('.photo-viewer');
const profileFormPopup= new Popup('.modal_form_profile');
const photoFormPopup= new Popup('.modal_form_photo');

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
 * Opens the profile edit form
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
	profileFormPopup.open();
}



/* 
 * Opens the add photo form
*/
function openPhotoForm() {

	// fade in the profile form modal
	photoFormPopup.open();
}



/*
 * Opens the photo viewer
 *
 * @param {string} imageSrc - the image src link
 * @param {string} caption - the caption
*/
const openPhotoViewer= (imageSrc, caption) => {
	//load photo into viewer
	
	
	photoViewerPopup.open({ image: imageSrc, caption: caption });
}



// add click events to connect buttons to functions that open and close popups
editInfoButton.addEventListener("click", openProfileForm);
addImageButton.addEventListener("click", openPhotoForm);




// add submit event to profile form
profileForm.addEventListener('submit', (e) => {
	e.preventDefault(); 
	
  // update text content in profile with new data entered into form
  userInfo.setUserInfo({ name: profileFormName.value, about: profileFormAbout.value });
	
	profileFormPopup.close();
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
	
	photoFormPopup.close();
});







// start validation
photoValidator.enableValidation();
profileValidator.enableValidation();



/* Without initial state of "display:none" popups briefly flash on screen
 * while page is loading. This turns off that rule after the page has loaded.
 * The only other way I found to avoid this was to toggle multiple classes to show/hide a popup.  
 */
document.querySelectorAll('.popup').forEach((popup) => { popup.style.display= 'flex'; });
