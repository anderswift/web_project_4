import "./index.css";

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { api } from "../components/Api.js";

import { 
  formSettings, 
  cardContainerSelector, 
  imagePopupSelector, profileFormSelector, avatarFormSelector, photoFormSelector, deleteFormSelector,
  editInfoButton, editAvatarButton, addImageButton,
  photoForm, profileForm, avatarForm, profileFormFields, deleteCardIdField
} from "../utils/constants.js";




// create userInfo object to handle getting and setting profile information
const userInfo= new UserInfo({ 
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__about', 
  avatarSelector: '.profile__avatar' 
});




// create Popup objects for photo viewer, delete card confirmation, profile form, avatar form
const photoViewerPopup= new PopupWithImage(imagePopupSelector);

const deleteFormPopup= new PopupWithForm(deleteFormSelector, 
  (data) => {
    deleteFormPopup.saving();
    api.deleteCard(data.id).then((response) => {
      document.getElementById(data.id).remove();
      deleteFormPopup.close();
    }).catch((err) => { console.log(err); });
  });

const profileFormPopup= new PopupWithForm(profileFormSelector, 
  (data) => {
    profileFormPopup.saving();
    api.setUserInfo(data).then((res) => {
      userInfo.setUserInfo(data);
      profileFormPopup.close();
    }).catch((err) => { console.log(err); });
  });
  
const avatarFormPopup= new PopupWithForm(avatarFormSelector, 
  (data) => {
    avatarFormPopup.saving();
    api.setUserAvatar(data).then((res) => {
      userInfo.setUserAvatar(data.avatar);
      avatarFormPopup.close();
    }).catch((err) => { console.log(err); });
  });




// store photo popup callback
const openPhotoViewer= (data) => {
  photoViewerPopup.open(data);
}

// store like callback
const updateCardLikes= (e) => {
  const cardId= e.target.data;
  const liked= !e.target.classList.contains('photo__like_on');
    
  api.updateLikes(cardId, liked).then((response) => {
    e.target.classList.toggle('photo__like_on');
    e.target.querySelector('.photo__like-count').textContent= response.likes.length;
    e.target.blur();
  }).catch((err) => {
    console.log(err);
  });
}

// store delete callback
const deleteCard= (cardId) => {
  deleteCardIdField.value= cardId;
  deleteFormPopup.open(); 
}

const cardCallbacks= { handleClick: openPhotoViewer, handleLike: updateCardLikes, handleDelete: deleteCard };




 // create instances of FormValidator for each form
const photoValidator= new FormValidator(photoForm, formSettings);
const profileValidator= new FormValidator(profileForm, formSettings);
const avatarValidator= new FormValidator(avatarForm, formSettings);

// start validation
photoValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();




// add click event listeners to buttons that open profile info and avatar forms
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
  
  
  
  


// set initial profile info from data retrieved from server
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData.avatar);
  return userData._id;
}).then((userId) => {

  return api.getInitialCards().then((initialCardData) => {
    // create Section instance
    const cardsList= new Section({ 
      items: initialCardData, // empty to start, so cardsList constant can exist independent of api calls
      renderer: (item) => {
        const card= new Card(item, cardCallbacks);  
        const cardElement= card.generateCard(userId);
        cardsList.addItem(cardElement, false);
      }
    }, cardContainerSelector);
    cardsList.renderItems();
    return { cardsList, userId };
  });

}).then(({ cardsList, userId }) => {

  // now that we have user id and cardsList has been created and populated with initial cards, create popup for 'New place' form
  const photoFormPopup= new PopupWithForm(photoFormSelector, 
  (data) => {
    photoFormPopup.saving();
    api.addCard(data).then((response) => {
      const card= new Card(response, cardCallbacks);  
      const cardElement= card.generateCard(userId);
      cardsList.addItem(cardElement);
      
      photoFormPopup.close();
    }).catch((err) => { console.log(err); });
  });

  // add click event listeners to button to open 'New place' form
  addImageButton.addEventListener("click", () => { 
    photoFormPopup.open(); 
  });


}).catch((err) => {
  console.log(err);
});




// Without initial state of "display:none" popups briefly flash on screen while page is loading
document.querySelectorAll('.popup').forEach((popup) => { popup.style.display= 'flex'; });