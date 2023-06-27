import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageName = this._popup.querySelector('.popup__image-name');
    }

    open(link, title) {
        this._popupImage.src = link;
        this._popupImage.alt = title;
        this._popupImageName.textContent = title;
    }
}