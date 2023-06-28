import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ submit }, popupSelector,) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const inputData = {};
        this._inputList.forEach(item => {
            inputData[item.name] = item.value;
        });
        return inputData;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}