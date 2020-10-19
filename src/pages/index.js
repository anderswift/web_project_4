import "./index.css";

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";

import { 
  initialCardData, 
  formSettings, 
  cardContainerSelector, 
  imagePopupSelector, profileFormSelector, photoFormSelector,
  editInfoButton, addImageButton,
  photoForm, profileForm, profileFormFields
 } from "../utils/constants.js";



 // create userInfo object to handle getting and setting profile information
const userInfo= new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });



// store photo popup callback
const openPhotoViewer= (data) => {
	photoViewerPopup.open(data);
}



// create Popup objects for photo viewer, profile form and photo form
const photoViewerPopup= new PopupWithImage(imagePopupSelector);

const profileFormPopup= new PopupWithForm(profileFormSelector, 
  (data) => {
    userInfo.setUserInfo(data);
    profileFormPopup.close();
  });

const photoFormPopup= new PopupWithForm(photoFormSelector, 
  (data) => {
    const card= new Card(data, openPhotoViewer);  
    const cardElement= card.generateCard();
    cardsList.addItem(cardElement);
    
    photoFormPopup.close();
  });



// create instances of FormValidator for each form
const photoValidator= new FormValidator(photoForm, formSettings);
const profileValidator= new FormValidator(profileForm, formSettings);



// add click event listeners to buttons that open forms
addImageButton.addEventListener("click", () => { 
  photoFormPopup.open(); 
});

editInfoButton.addEventListener('click', () => {
  const initialUserInfo= userInfo.getUserInfo();

  Object.keys(profileFormFields).forEach((field) => {
    profileFormFields[field].value= initialUserInfo[field];
    profileValidator.checkInputValidity(profileFormFields[field]);
  });
  profileValidator.toggleButtonState();

  profileFormPopup.open();
});




// create Section instance, generate and render Cards from initialCardData list
const cardsList= new Section({ 
  items: initialCardData,
  renderer: (item) => {
    const card= new Card(item, openPhotoViewer);  
    const cardElement= card.generateCard();
    cardsList.addItem(cardElement, false);
  }
}, cardContainerSelector);

cardsList.renderItems();



// start validation
photoValidator.enableValidation();
profileValidator.enableValidation();



// Without initial state of "display:none" popups briefly flash on screen while page is loading.
document.querySelectorAll('.popup').forEach((popup) => { popup.style.display= 'flex'; });
