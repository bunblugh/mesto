const initialCards = [
    {
        name: 'Карачаевск',
        src: "images/karchaevsk.jpg"
    },
    {
        name: 'Гора Эльбрус',
        src: "images/elbrus.jpg"
    },
    {
        name: 'Домбай',
        src: "images/dombai.jpg"
    },
    {
        name: 'Гора Эльбрус',
        src: "images/elbrus2.jpg"
    },
    {
        name: 'Домбай',
        src: "images/dombai2.jpg"
    },
    {
        name: 'Карачаево-Черкессия',
        src: "images/karchaevsk2.jpg"
    }
];

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_full-image');

const editPopupForm = document.querySelector('.popup__form_type_edit');
const addPopupForm = document.querySelector('.popup__form_type_add');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const closeEditPopupButton = document.querySelector('.popup__close-button_type_edit');
const closeAddPopupButton = document.querySelector('.popup__close-button_type_add');
const closeImagePopupButton = document.querySelector('.popup__close-button_type_full-image');

const savePopupButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupName = document.querySelector('.popup__input_text_name');
const popupDescription = document.querySelector('.popup__input_text_description');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function saveProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(editPopup);
}


function deleteCard(event) {
    event.target.closest('.card').remove();
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_active');
}

function openPopupImage(event) {
    openPopup(imagePopup);

    const popupImage = document.querySelector('.popup__image');
    const popupImageName = document.querySelector('.popup__image-name');

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

    card.querySelector('.card__image').src = item.src;
    card.querySelector('.card__image').alt = item.name;
    card.querySelector('.card__text').textContent = item.name;

    addCardEventListeners(card);

    return card;
}

function renderCards() {
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
        name: `${inputImageName.value}`,
        src: `${inputImageSrc.value}`
    }
    cardsContainer.prepend(getCard(newCard));

    closePopup(addPopup);
}

renderCards();

editButton.addEventListener('click', () => {
    openPopup(editPopup);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
});

addButton.addEventListener('click', () => openPopup(addPopup));
closeEditPopupButton.addEventListener('click', () => closePopup(editPopup));
closeAddPopupButton.addEventListener('click', () => closePopup(addPopup));
closeImagePopupButton.addEventListener('click', () => closePopup(imagePopup));
editPopupForm.addEventListener('submit', saveProfileInfo);
addPopupForm.addEventListener('submit', renderNewCard);
