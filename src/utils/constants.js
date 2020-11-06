export const userId= 'b37fe6643c10107d4cbaa30f';

export const formSettings= {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_active'
};

export const cardContainerSelector= '.photo-grid__list';
export const imagePopupSelector= '.photo-viewer';
export const profileFormSelector= '.modal_form_profile';
export const avatarFormSelector= '.modal_form_avatar';
export const photoFormSelector= '.modal_form_photo';

// load all DOM elements objphotoFormSelectorects that will be worked with repeatedly
export const editInfoButton= document.querySelector('.profile__edit-info');
export const editAvatarButton= document.querySelector('.profile__edit-avatar');
export const addImageButton= document.querySelector('.profile__add-image');

export const photoForm= document.querySelector(photoFormSelector);
export const avatarForm= document.querySelector(avatarFormSelector);
export const profileForm= document.querySelector(profileFormSelector);
export const profileFormFields= {};
profileFormFields.name= profileForm.querySelector('.modal__input_type_name');
profileFormFields.about= profileForm.querySelector('.modal__input_type_about');