const showError = (formElement, inputElement, errorMessage) => {
    inputElement.classList.add('popup__input_type_error');
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
};


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save-button_disabled');
        formPopupProfile.removeEventListener('submit', saveProfileInfo);
        formPopupNewPlace.removeEventListener('submit', renderNewCard);
    } else {
        buttonElement.classList.remove('popup__save-button_disabled');
        formPopupProfile.addEventListener('submit', saveProfileInfo);
        formPopupNewPlace.addEventListener('submit', renderNewCard);
    }
}

enableValidation();