export class Card {
  constructor(setup, handleClick) {
    this._place= setup.name;
    this._imgsrc= setup.link;
    this._id= setup._id;
    this._owner= setup.owner._id;
    this._likes= setup.likes;

    setup.templateSelector ? 
      this._templateSelector= setup.templateSelector : 
      this._templateSelector= '#photo-template';

    this._handleClick= handleClick;
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
    this._element.querySelector('.photo__delete').addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });
  }

  _setLikeListener() {
    this._element.querySelector('.photo__like').addEventListener('click', (e) => {
      e.target.classList.toggle('photo__like_on');
      console.log(e.target.data);
      e.target.blur();
    });
  }

  _setPhotoPreviewListener(image) {
    image.addEventListener('click', (e) => {
      this._handleClick({imgsrc: this._imgsrc, place: this._place});
    });
  }

  generateCard(owner) {
    this._element= this._getTemplate();
    this._element.querySelector('.photo__caption').textContent= this._place;

    const image= this._element.querySelector('.photo__image');
    image.src= this._imgsrc;
    image.alt= this._place;
    this._element.querySelector('.photo__like').data= this._id;
    if(this._owner === owner) console.log('owned');
    else console.log('not owned');

    console.log(this._likes.length);

    if(this._likes.includes(owner)) console.log('liked');
    else console.log('not liked');


    this._setEventListeners(image);

    return this._element;
  }
}