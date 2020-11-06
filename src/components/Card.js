export class Card {
  constructor(setup, { handleClick, handleLike }) {
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
        e.target.parentNode.remove();
      });
    }
  }

  _setLikeListener() {
    this._element.querySelector('.photo__like').addEventListener('click', (e) => {

      // determine if user is liking or unliking photo
      const liked= !e.target.classList.contains('photo__like_on');

      this._handleLike(e.target.data, liked).then((response) => {
        e.target.classList.toggle('photo__like_on');
        e.target.querySelector('.photo__like-count').textContent= response.likes.length;
        e.target.blur();
      });
      
    });
  }

  _setPhotoPreviewListener(image) {
    image.addEventListener('click', (e) => {
      this._handleClick({link: this._link, name: this._name});
    });
  }

  generateCard(owner) {
    this._element= this._getTemplate();
    this._element.querySelector('.photo__caption').textContent= this._name;

    const image= this._element.querySelector('.photo__image');
    image.src= this._link;
    image.alt= this._name;

    const likeButton= this._element.querySelector('.photo__like');
    likeButton.data= this._id;

    if(this._likes.includes(owner)) likeButton.classList.add('photo__like_on');
    this._element.querySelector('.photo__like-count').textContent= this._likes.length;

    const deleteButton= this._element.querySelector('.photo__delete');
    if(this._owner === owner) deleteButton.data= this._id;
    else deleteButton.remove();


    this._setEventListeners(image);

    return this._element;
  }
}