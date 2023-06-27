import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ submit }, popupSelector,) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        let inputData = {};
        this._inputList.forEach(item => {
            inputData[item.name] = item.value;
        });
        return inputData;
    }

    setEventListeners() {
        document.querySelector('.popup__close-button_type_edit').addEventListener('click', () => super.close());
        document.querySelector('.popup__close-button_type_add').addEventListener('click', () => super.close());

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._getInputValues);
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}