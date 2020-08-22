let container= document.querySelector('.container');

let modal= document.querySelector(".modal");
let editInfoButton= container.querySelector(".profile__edit-info");
let exitButton= modal.querySelector(".modal__exit");

editInfoButton.addEventListener("click", function () {
	modal.classList.remove('modal_hidden');
});

exitButton.addEventListener("click", function () {
  modal.classList.add('modal_hidden');
});

