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

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editPopupForm = document.querySelector('.popup__form_type_edit');
const addPopupForm = document.querySelector('.popup__form_type_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = document.querySelector('.popup__close-button_type_edit');
const closeAddPopupButton = document.querySelector('.popup__close-button_type_add');
const savePopupButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupName = document.querySelector('.popup__input_text_name');
const popupDescription = document.querySelector('.popup__input_text_description');

function openPopup(a) {
    a.classList.add('popup_opened');
}

function closePopup(a) {
    a.classList.remove('popup_opened');
}

function saveProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(editPopup);
}

function createCard(item){
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__image').src = item.src;
    card.querySelector('.card__image').alt = item.name;
    card.querySelector('.card__text').textContent = item.name;
    console.log(card);
    return card;
}

function renderCards() {
    initialCards.forEach(item => {
        const cardHtml = createCard(item);
        cardsContainer.append(cardHtml);
    });
}

renderCards();

//при открытии значения профиля записываются в инпуты формы
editButton.addEventListener('click',() => {
    openPopup(editPopup);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
});
addButton.addEventListener('click',() => openPopup(addPopup));
closeEditPopupButton.addEventListener('click',() => closePopup(editPopup));
closeAddPopupButton.addEventListener('click',() => closePopup(addPopup));
editPopupForm.addEventListener('submit', saveProfileInfo);
//addPopupForm.addEventListener('submit', createCard);
