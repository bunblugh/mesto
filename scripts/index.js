const popupProfile = document.querySelector('.popup_type_edit');
const popupNewPlace = document.querySelector('.popup_type_add');
const popupFullImage = document.querySelector('.popup_type_full-image');

const formPopupProfile = document.querySelector('.popup__form_type_edit');
const formPopupNewPlace = document.querySelector('.popup__form_type_add');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const buttonClosePopupProfile = document.querySelector('.popup__close-button_type_edit');
const buttonClosePopupNewPlace = document.querySelector('.popup__close-button_type_add');
const buttonClosePopupFullImage = document.querySelector('.popup__close-button_type_full-image');

const buttonSavePopupNewPlace = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupName = document.querySelector('.popup__input_text_name');
const popupDescription = document.querySelector('.popup__input_text_description');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupByEsc);
    popup.addEventListener('click', closePopupByClickOutside);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupByEsc);
    popup.removeEventListener('click', closePopupByClickOutside);
}

function closePopupByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closePopupByClickOutside(event) {
    if (event.target === event.currentTarget) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function saveProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}


function deleteCard(event) {
    event.target.closest('.card').remove();
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_active');
}

function openPopupImage(event) {
    openPopup(popupFullImage);

    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupImageName.textContent = event.target.alt;
}

function addCardEventListeners(card) {
    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteCard);
    const cardLikeButton = card.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', likeCard);
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', openPopupImage);
}

function getCard(item) {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardText = card.querySelector('.card__text');

    cardImage.src = item.src;
    cardImage.alt = item.name;
    cardText.textContent = item.name;

    addCardEventListeners(card);

    return card;
}

function renderInitialCards() {
    initialCards.forEach(item => {
        const cardHtml = getCard(item);
        cardsContainer.append(cardHtml);
    });
}

function renderNewCard(event) {
    event.preventDefault();

    const inputImageName = document.querySelector('.popup__input_text_image-name');
    const inputImageSrc = document.querySelector('.popup__input_text_image-source');

    const newCard =
    {
        name: inputImageName.value,
        src: inputImageSrc.value
    }
    cardsContainer.prepend(getCard(newCard));

    closePopup(popupNewPlace);

    event.target.reset();

    const addNewPlaceButton = document.querySelector('.popup__save-button_type_add');
    addNewPlaceButton.classList.add('popup__save-button_disabled');
    addNewPlaceButton.setAttribute('disabled', '');
}

renderInitialCards();

buttonEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
});

buttonAdd.addEventListener('click', () => openPopup(popupNewPlace));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupNewPlace.addEventListener('click', () => closePopup(popupNewPlace));
buttonClosePopupFullImage.addEventListener('click', () => closePopup(popupFullImage));
formPopupProfile.addEventListener('submit', saveProfileInfo);
formPopupNewPlace.addEventListener('submit', renderNewCard);
