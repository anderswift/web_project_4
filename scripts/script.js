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

const initialCards = [
  { name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg" },
  { name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg" },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg" }
];

function addPhotoCard(cardObj, prepend= true) {
	
	// clone template for photo card 
	const newPhoto= photoTemplate.cloneNode(true);
	const newImage= newPhoto.querySelector(".photo__image");
	
	// add image src, alt and event listener for popup viewer
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
	
	

	// add photo to DOM
	if (prepend) photoContainer.prepend(newPhoto);
	else photoContainer.append(newPhoto);
	
}


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


function openProfileForm() {
	// load the existing content values into the form
	profileFormName.value= profileName.textContent;
	profileFormAbout.value= profileAbout.textContent;
	
	// fade in the profile form modal
	openPopup(profileForm);
}

function openPhotoForm() {
	// fade in the profile form modal
	openPopup(photoForm);
}

function openPhotoViewer(imageSrc, caption) {
	//load photo into viewer
	photoViewerImage.src= imageSrc;
	photoViewerImage.alt= caption;
	photoViewerCaption.textContent= caption;
	
	openPopup(photoViewer, true);
}


function exitPopup() {
	popup.classList.add('popup_hidden');
}


function profileSubmitHandler(e) {
	e.preventDefault(); 
	
	profileName.textContent= profileFormName.value;
	profileAbout.textContent= profileFormAbout.value;
	
	exitPopup();
}

function photoSubmitHandler(e) {
	e.preventDefault(); 
	
	const cardObj= [];
	cardObj.name= photoFormPlace.value;
	cardObj.link= photoFormImage.value;
	
	addPhotoCard(cardObj);
	
	exitPopup();
}


editInfoButton.addEventListener("click", openProfileForm);
addImageButton.addEventListener("click", openPhotoForm);

exitButtons.forEach((button) => {
	button.addEventListener("click", exitPopup);
});

profileForm.addEventListener('submit', profileSubmitHandler);
photoForm.addEventListener('submit', photoSubmitHandler);

initialCards.forEach((item) => {
	addPhotoCard(item, false);
});