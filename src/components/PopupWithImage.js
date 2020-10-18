import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);

    this._photoViewerImage= document.querySelector('.photo-viewer__image');
    this._photoViewerCaption= document.querySelector('.photo-viewer__caption');
  }

  open({ image, caption }) {
    this._photoViewerImage.src= image;
    this._photoViewerImage.alt= caption;
    this._photoViewerCaption.textContent= caption;

    super.open();
  }
}