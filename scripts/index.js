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
}

function closePopup() {
    editPopup.classList.remove('popup_opened');
}

editPopup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        editPopup.classList.remove('popup_opened');
    }
})

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function saveProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}


editPopupForm.addEventListener('submit', saveProfileInfo);
