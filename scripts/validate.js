const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active'
};

const showError = (formElement, inputElement, errorMessage, settings) => {
    inputElement.classList.add(settings.inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideError = (formElement, inputElement, settings) => {
    inputElement.classList.remove(settings.inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideError(formElement, inputElement, settings);
    }
};


const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        toggleButtonDisabled(buttonElement, settings);
    } else {
        toggleButtonEnabled(buttonElement, settings);
    }
}

function toggleButtonDisabled (buttonElement, settings) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
}

function toggleButtonEnabled (buttonElement, settings) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
}

enableValidation(settings);