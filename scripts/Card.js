export class Card {

    constructor(data, templateSelector, openPopupImage) {
        this._templateSelector = templateSelector;

        this._title = data.name;
        this._image = data.link;

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

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        this._elementLikeButton.classList.toggle('card__like-button_active');
    }

    _setEventListeners() {
        this._elementDeleteButton.addEventListener('click', () => this._deleteCard(event));
        this._elementLikeButton.addEventListener('click', () => this._likeCard(event));
        this._elementImage.addEventListener('click', () => this._openPopupImage(this._title, this._image));
    }

    generateCard() {
        this._element = this._getTemplate();

        this._elementDeleteButton = this._element.querySelector('.card__delete-button');
        this._elementLikeButton = this._element.querySelector('.card__like-button');
        this._elementImage = this._element.querySelector('.card__image');

        this._setEventListeners();

        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._element.querySelector('.card__text').textContent = this._title;

        return this._element;
    }

}