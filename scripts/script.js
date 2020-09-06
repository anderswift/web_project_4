const profile= document.querySelector('.profile');
const editInfoButton= profile.querySelector(".profile__edit-info");
const profileName= profile.querySelector(".profile__name");
const profileAbout= profile.querySelector(".profile__about");
const addImageButton= profile.querySelector(".profile__add-image");

const photoContainer= document.querySelector('.photo-grid__list');
const photoTemplate= document.querySelector('#photo-template').content;

const popup= document.querySelector(".popup");
const exitButtons= popup.querySelectorAll(".modal__exit");

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
	let newPhoto= photoTemplate.cloneNode(true);
	
	// add details from object parameter
	newPhoto.querySelector(".photo__caption").textContent= cardObj.name;
	newPhoto.querySelector(".photo__image").src= cardObj.link;
	newPhoto.querySelector(".photo__image").alt= cardObj.name;
	
	// add like event to button
	newPhoto.querySelector(".photo__like").addEventListener("click", (e) => {
		e.target.classList.toggle("photo__like_on");
		e.target.blur();
	});

	// add photo to DOM
	if (prepend) photoContainer.prepend(newPhoto);
	else photoContainer.append(newPhoto);
	
}


function openModal(form) {
	let active= popup.querySelector(".popup__item_active");
	if(active) active.classList.remove("popup__item_active");
	form.classList.add('popup__item_active');
	popup.classList.remove('popup_hidden');
}


function openProfileForm() {
	profileFormName.value= profileName.textContent;
	profileFormAbout.value= profileAbout.textContent;
	
	openModal(profileForm);
}

function openPhotoForm() {
	openModal(photoForm);
}


function exitForm() {
	popup.classList.add('popup_hidden');
}


function profileSubmitHandler(e) {
	e.preventDefault(); 
	
	profileName.textContent= profileFormName.value;
	profileAbout.textContent= profileFormAbout.value;
	
	exitForm();
}

function photoSubmitHandler(e) {
	e.preventDefault(); 
	
	const cardObj= [];
	cardObj.name= photoFormPlace.value;
	cardObj.link= photoFormImage.value;
	
	addPhotoCard(cardObj);
	
	exitForm();
}


editInfoButton.addEventListener("click", openProfileForm);
addImageButton.addEventListener("click", openPhotoForm);

exitButtons.forEach((button) => {
	button.addEventListener("click", exitForm);
});

profileForm.addEventListener('submit', profileSubmitHandler);
photoForm.addEventListener('submit', photoSubmitHandler);

initialCards.forEach((item) => {
	addPhotoCard(item, false);
});
