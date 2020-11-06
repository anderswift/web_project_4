import "./index.css";

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api.js";

import { 
  formSettings, 
  cardContainerSelector, 
  imagePopupSelector, profileFormSelector, avatarFormSelector, photoFormSelector,
  editInfoButton, editAvatarButton, addImageButton,
  photoForm, profileForm, avatarForm, profileFormFields,
  userId
 } from "../utils/constants.js";



const api= new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6/",
  headers: {
    authorization: "95a5b594-7318-496e-ada2-f96a00133f51",
    "Content-Type": "application/json"
  }
}); 



// store photo popup callback
const openPhotoViewer= (data) => {
	photoViewerPopup.open(data);
}

// store like callback
const updateCardLikes= (cardId, liked) => {
  if (liked) return api.addLike(cardId);
  else return api.removeLike(cardId);
}





// create Section instance
const cardsList= new Section({ 
  items: {},
  renderer: (item) => {
    const card= new Card(item, { handleClick: openPhotoViewer, handleLike: updateCardLikes });  
    const cardElement= card.generateCard(userId);
    cardsList.addItem(cardElement, false);
  }
}, cardContainerSelector);

// retrieve initial card data from api, generate and render Cards
api.getInitialCards().then((initialCardData) => {
  cardsList._items= initialCardData; /******** update this later *********/
  cardsList.renderItems();
}).catch((err) => {
  console.log(err);
});



 // create userInfo object to handle getting and setting profile information
const userInfo= new UserInfo({ 
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__about', 
  avatarSelector: '.profile__avatar' 
});

// set initial profile info from data retrieved from server
api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data.avatar);
});





// create Popup objects for photo viewer, profile form, avatar form and photo form
const photoViewerPopup= new PopupWithImage(imagePopupSelector);

const profileFormPopup= new PopupWithForm(profileFormSelector, 
  (data) => {
    api.setUserInfo(data).then((res) => {
      userInfo.setUserInfo(data);
      profileFormPopup.close();
    }).catch((err) => { console.log(err); });
  });

const avatarFormPopup= new PopupWithForm(avatarFormSelector, 
  (data) => {
    api.setUserAvatar(data).then((res) => {
      userInfo.setUserAvatar(data.avatar);
      avatarFormPopup.close();
    }).catch((err) => { console.log(err); });
  });

const photoFormPopup= new PopupWithForm(photoFormSelector, 
  (data) => {
    data._id= '12345678';
    data.owner= { };
    data.owner._id= userId;
    data.likes= [];
    const card= new Card(data, openPhotoViewer);  
    const cardElement= card.generateCard();
    cardsList.addItem(cardElement);
    
    photoFormPopup.close();
  });



// create instances of FormValidator for each form
const photoValidator= new FormValidator(photoForm, formSettings);
const profileValidator= new FormValidator(profileForm, formSettings);
const avatarValidator= new FormValidator(avatarForm, formSettings);


// add click event listeners to buttons that open forms
addImageButton.addEventListener("click", () => { 
  photoFormPopup.open(); 
});

editAvatarButton.addEventListener('click', () => {
  avatarFormPopup.open();
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



// start validation
photoValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();


// Without initial state of "display:none" popups briefly flash on screen while page is loading.
document.querySelectorAll('.popup').forEach((popup) => { popup.style.display= 'flex'; });
