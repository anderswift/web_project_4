// initial set of photo cards, to be loaded dynamically
export const initialCardData = [
  { place: 'Yosemite Valley', imgsrc: 'https://code.s3.yandex.net/web-code/yosemite.jpg' },
  { place: 'Lake Louise', imgsrc: 'https://code.s3.yandex.net/web-code/lake-louise.jpg' },
  { place: 'Bald Mountains', imgsrc: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg' },
  { place: 'Latemar', imgsrc: 'https://code.s3.yandex.net/web-code/latemar.jpg' },
  { place: 'Vanoise National Park', imgsrc: 'https://code.s3.yandex.net/web-code/vanoise.jpg' },
  { place: 'Lago di Braies', imgsrc: 'https://code.s3.yandex.net/web-code/lago.jpg' }
];

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
export const photoFormSelector= '.modal_form_photo';

// load all DOM elements objphotoFormSelectorects that will be worked with repeatedly
export const editInfoButton= document.querySelector('.profile__edit-info');
export const addImageButton= document.querySelector('.profile__add-image');

export const photoForm= document.querySelector(photoFormSelector);

export const profileForm= document.querySelector(profileFormSelector);
export const profileFormFields= {};
profileFormFields.name= profileForm.querySelector('.modal__input_type_name');
profileFormFields.about= profileForm.querySelector('.modal__input_type_about');