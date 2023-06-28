import './index.css';

import { settings } from '../utils/validate.js';
import { initialCards } from '../utils/cards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

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
        popupProfile.close();
    }
}, popupProfileSelector);

const popupNewPlace = new PopupWithForm({
    submit: (cardData) => {
        renderInitialCards.addItem(getCard(cardData));
        popupNewPlace.close();
    }
}, popupNewPlaceSelector);

const popupFullImage = new PopupWithImage(popupFullImageSelector);

popupProfile.setEventListeners();
popupNewPlace.setEventListeners();
popupFullImage.setEventListeners();

const renderInitialCards = new Section({
    renderer: (item) => {
        const cardElement = getCard(item);
        renderInitialCards.addItem(cardElement);
    }
}, cardsContainer);

renderInitialCards.renderItems(initialCards);

function handleCardClick(name, link) {
    popupFullImage.open(name, link);
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

