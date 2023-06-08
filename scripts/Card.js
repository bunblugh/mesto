export class Card {

    constructor(data, templateSelector, deleteCard, likeCard, openPopupImage) {
        this._templateSelector = templateSelector;

        this._title = data.name;
        this._image = data.src;

        this._deleteCard = deleteCard;
        this._likeCard = likeCard;
        this._openPopupImage = openPopupImage;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._elementDeleteButton.addEventListener('click', this._deleteCard);
        this._elementLikeButton.addEventListener('click', this._likeCard);
        this._elementImage.addEventListener('click', this._openPopupImage);
    }

    generateCard() {
        this._element = this._getTemplate();

        this._elementDeleteButton = this._element.querySelector('.card__delete-button');
        this._elementLikeButton = this._element.querySelector('.card__like-button');
        this._elementImage = this._element.querySelector('.card__image');

        this._setEventListeners();

        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;
        this._element.querySelector('.card__text').textContent = this._title;

        return this._element;
    }

}