import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    
    this.setEventListeners(); // seems easier to do this here instead of calling it separately each time in index.js 

    this._photoViewerImage= document.querySelector('.photo-viewer__image');
    this._photoViewerCaption= document.querySelector('.photo-viewer__caption');
  }

  open({ name, link }) {
    this._photoViewerImage.src= link;
    this._photoViewerImage.alt= name;
    this._photoViewerCaption.textContent= name;

    super.open();
  }
}