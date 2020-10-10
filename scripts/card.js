export class Card {
  constructor(setup) {
    this._name= setup.name;
    this._imageUrl= setup.imageUrl;
    this._photoCallback= setup.photoCallback;
    setup.templateSelector ? 
      this._templateSelector= setup.templateSelector : 
      this._templateSelector= '#photo-template';
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
      e.target.blur();
    });
  }

  _setPhotoPreviewListener(image) {
    image.addEventListener('click', (e) => {
      this._photoCallback(this._imageUrl, this._name);
    });
  }

  generateCard() {
    this._element= this._getTemplate();

    this._element.querySelector('.photo__caption').textContent= this._name;

    const image= this._element.querySelector('.photo__image');
    image.src= this._imageUrl;
    image.alt= this._name;

    this._setEventListeners(image);

    return this._element;
  }
}
