export class Card {

  constructor(setup, { handleClick, handleLike, handleDelete }) {
    this._name= setup.name;
    this._link= setup.link;
    this._id= setup._id;
    this._owner= setup.owner._id;
    this._likes= setup.likes.map((user) => { return user._id; });

    setup.templateSelector ? 
      this._templateSelector= setup.templateSelector : 
      this._templateSelector= '#photo-template';

    this._handleClick= handleClick;
    this._handleLike= handleLike;
    this._handleDelete= handleDelete;
  }


  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
  }


  _setEventListeners(image) {
      this._setDeleteListener();
      this._setLikeListener();
      this._setPhotoPreviewListener(image);
  }


  _setDeleteListener() {
    const deleteButton= this._element.querySelector('.photo__delete');
    if(deleteButton) {
      deleteButton.addEventListener('click', (e) => {
        this._handleDelete(e.target.data);
      });
    }
  }

  _setLikeListener() {
    this._element.querySelector('.photo__like').addEventListener('click', this._handleLike);
  }


  _setPhotoPreviewListener(image) {
    image.addEventListener('click', (e) => {
      this._handleClick({link: this._link, name: this._name});
    });
  }


  generateCard(owner) {
    this._element= this._getTemplate();
    this._element.querySelector('.photo').id= this._id;
    this._element.querySelector('.photo__caption').textContent= this._name;

    const image= this._element.querySelector('.photo__image');
    image.onerror= this._removeCard; // remove cards with broken images from DOM
    image.src= this._link;
    image.alt= this._name;

    const likeButton= this._element.querySelector('.photo__like');
    likeButton.data= this._id; // store ID in button for easy access 

    if(this._likes.includes(owner)) likeButton.classList.add('photo__like_on');
    this._element.querySelector('.photo__like-count').textContent= this._likes.length;

    const deleteButton= this._element.querySelector('.photo__delete');
    if(this._owner === owner) deleteButton.data= this._id; // store ID in button for easy access 
    else deleteButton.remove();

    this._setEventListeners(image);

    return this._element;
  }

  _removeCard(e) {
    e.target.parentElement.remove();
  }

}