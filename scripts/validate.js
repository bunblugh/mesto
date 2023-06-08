import { FormValidator } from './FormValidator.js';

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
};

const formElement = document.querySelector('.popup__form_type_add');

const formValidator = new FormValidator(settings, formElement);

formValidator.enableValidation();