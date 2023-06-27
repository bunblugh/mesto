export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClickOutside = () => {
        this._popup.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        })
    }

    setEventListeners() {
        this._handleClickOutside();

        document.querySelector('.popup__close-button_type_edit').addEventListener('click', () => this.close());
        document.querySelector('.popup__close-button_type_add').addEventListener('click', () => this.close());
        document.querySelector('.popup__close-button_type_full-image').addEventListener('click', () => this.close());
    }
}