import '../pages/index.css';

import { settings } from './validate.js';
import { initialCards } from './cards.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupProfileSelector = document.querySelector('.popup_type_edit');
const popupNewPlaceSelector = document.querySelector('.popup_type_add');
const popupFullImageSelector = document.querySelector('.popup_type_full-image');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupName = document.querySelector('.popup__input_text_name');
const popupDescription = document.querySelector('.popup__input_text_description');

const cardsContainer = document.querySelector('.cards');


const inputImageName = document.querySelector('.popup__input_text_image-name');
const inputImageSrc = document.querySelector('.popup__input_text_image-source');

const formElementTypeAdd = document.querySelector('.popup__form_type_add');
const formElementTypeEdit = document.querySelector('.popup__form_type_edit');

const formValidatorTypeAdd = new FormValidator(settings, formElementTypeAdd);
const formValidatorTypeEdit = new FormValidator(settings, formElementTypeEdit);
formValidatorTypeAdd.enableValidation();
formValidatorTypeEdit.enableValidation();

const userInfo = new UserInfo(profileName, profileDescription);

const popupProfile = new PopupWithForm({
    submit: (userData) => {
        userInfo.setUserInfo(userData);
        profileName.textContent = popupName.value;
        profileDescription.textContent = popupDescription.value;
        popupProfile.close();
    }
}, popupProfileSelector);

const popupNewPlace = new PopupWithForm({
    submit: () => {
        const newCard =
        {
            name: inputImageName.value,
            link: inputImageSrc.value
        }
        cardsContainer.prepend(getCard(newCard));

        popupNewPlace.close();
    }
}, popupNewPlaceSelector);

const popupFullImage = new PopupWithImage(popupFullImageSelector);

popupProfile.setEventListeners();
popupNewPlace.setEventListeners();
popupFullImage.setEventListeners();

const renderInitialCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = getCard(item);
        renderInitialCards.addItem(cardElement);
    }
}, cardsContainer);

renderInitialCards.renderItems();

function handleCardClick(link, title) {
    popupFullImage.open(link, title);
}

function getCard(item) {
    const card = new Card(item, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

buttonEdit.addEventListener('click', () => {
    formValidatorTypeEdit.resetValidation();
    popupProfile.open();
    const userData = userInfo.getUserInfo();
    popupName.value = userData.username;
    popupDescription.value = userData.about;
});

buttonAdd.addEventListener('click', () => {
    formValidatorTypeAdd.resetValidation();
    popupNewPlace.open();
});

