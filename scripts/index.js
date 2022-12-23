const editPopup = document.querySelector('.popup');
const editPopupForm = document.querySelector('.popup__content');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupName = document.querySelector('.popup__name');
const popupDescription = document.querySelector('.popup__description');

function openPopup() {
    editPopup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

function closePopup() {
    editPopup.classList.remove('popup_opened');
}

function saveProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
editPopupForm.addEventListener('submit', saveProfileInfo);
