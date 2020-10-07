// load all DOM elements objects that will be worked with repeatedly
const profile= document.querySelector('.profile');
const editInfoButton= profile.querySelector('.profile__edit-info');
const profileName= profile.querySelector('.profile__name');
const profileAbout= profile.querySelector('.profile__about');
const addImageButton= profile.querySelector('.profile__add-image');

const photoContainer= document.querySelector('.photo-grid__list');
const photoTemplate= document.querySelector('#photo-template').content;

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


// initial set of photo cards, to be loaded dynamically
const initialCards = [
  { name: 'Yosemite Valley', link: 'https://code.s3.yandex.net/web-code/yosemite.jpg' },
  { name: 'Lake Louise', link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg' },
  { name: 'Bald Mountains', link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://code.s3.yandex.net/web-code/latemar.jpg' },
  { name: 'Vanoise National Park', link: 'https://code.s3.yandex.net/web-code/vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://code.s3.yandex.net/web-code/lago.jpg' }
];


/**
 * Creates a cloned photo card from template, using data from the cardObj parameter
 * 
 * @param {object} cardObj - contains data for image src and caption
 * @return {HTMLElement} photo card
*/
function createPhotoCard(cardObj, prepend= true) {
	
	// clone template for photo card 
	const newPhoto= photoTemplate.cloneNode(true);
	const newImage= newPhoto.querySelector('.photo__image');
	
	// add image src, alt, and event listener for popup viewer
	newImage.src= cardObj.link;
	newImage.alt= cardObj.name;
	newImage.addEventListener('click', (e) => {
		e.preventDefault();
		openPhotoViewer(cardObj.link, cardObj.name);
	});
	
	// add caption content
	newPhoto.querySelector('.photo__caption').textContent= cardObj.name;
	
	// add like event to button
	newPhoto.querySelector('.photo__like').addEventListener('click', (e) => {
		e.target.classList.toggle('photo__like_on');
		e.target.blur();
	});
	
	// add like event to button
	newPhoto.querySelector('.photo__delete').addEventListener('click', (e) => {
		e.target.parentNode.remove();
	});
	
	return newPhoto;
}



/*
 * Adds a photo card to .photo-grid__list
 * 
 * @param {HTMLelement} cardHTML - photo card node ready to insert
 * @param {boolean} [prepend= true] - indicates whether to prepend card to beginning of list or add at the end
*/
function addPhotoCard(cardHTML, prepend= true) {
	// add the photo to the DOM
	if (prepend) photoContainer.prepend(cardHTML);
	else photoContainer.append(cardHTML);
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
  
  // can't run validation functions here because it's in a separate file, so have to recreate
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
function openPhotoViewer(imageSrc, caption) {
	
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
	
	// run addPhotoCard() to add a photo card to the DOM with the data entered into form
	const cardObj= [];
	cardObj.name= photoFormPlace.value;
	cardObj.link= photoFormImage.value;
	const cardHTML= createPhotoCard(cardObj);
	addPhotoCard(cardHTML);
	
	exitPopup();
});



// populate .photo-grid__list with initial array of photos and captions
initialCards.forEach((item) => {
	const cardHTML= createPhotoCard(item);
	addPhotoCard(cardHTML, false);
});



// close popup if user clicks on overlay
popup.addEventListener('click', function (e) {
  if(e.target.classList.contains('popup')) exitPopup();
});

// close popup if user presses escape key
document.addEventListener('keyup', function (e) {
  if(e.key === 'Escape') exitPopup();
});