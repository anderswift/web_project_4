export class Popup {

  constructor(popupSelector) {
    this._popupItem= document.querySelector(popupSelector); 
    this._popup= this._popupItem.parentElement;
    this._handleEscClose= this._handleEscClose.bind(this);
    this._handleClickClose= this._handleClickClose.bind(this);

    this._setEventListeners();
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _setEventListeners() {
    document.addEventListener('click', this._handleClickClose);
  }

  _handleClickClose(e) {
    if(e.target.classList.contains('popup__exit') || e.target.classList.contains('popup')) {
      this.close(); 
    }
  }

  _handleEscClose(e) {
    if(e.key === 'Escape') this.close();
  }

}
