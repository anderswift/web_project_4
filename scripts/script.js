let profile= document.querySelector('.profile');
let editInfoButton= profile.querySelector(".profile__edit-info");
let profileName= profile.querySelector(".profile__name");
let profileAbout= profile.querySelector(".profile__about");

let modal= document.querySelector(".modal");
let modalForm= modal.querySelector(".modal__form");
let modalName= modal.querySelector(".modal__input_name");
let modalAbout= modal.querySelector(".modal__input_about");
let exitButton= modal.querySelector(".modal__exit");


function openProfileForm() {
	modalName.value= profileName.textContent;
	modalAbout.value= profileAbout.textContent;
	
	modal.classList.remove('modal_hidden');
}


function exitProfileForm() {
	modal.classList.add('modal_hidden');
}


function formSubmitHandler(e) {
	e.preventDefault(); 
	
	profileName.textContent= modalName.value;
	profileAbout.textContent= modalAbout.value;
	
	exitProfileForm();
}


editInfoButton.addEventListener("click", openProfileForm);
exitButton.addEventListener("click", exitProfileForm);
modalForm.addEventListener('submit', formSubmitHandler);
