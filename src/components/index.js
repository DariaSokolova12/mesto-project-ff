import "../index.css";
import { createCard } from "./card.js";
import { openModal } from "./modal.js";
import {
  getUserInfo,
  getInitialCards
} from "./api.js";

import { 
   profileTitle,
   profileJob,
   profileImage, 
   editButton,
   addButton,
   avatarEditButton,
   modalEditProfile,
   modalAddCard,
   popupTypeImage,
   modalAvatar,
   editProfilePopup, 
   cardPopup, 
   avatarPopup, 
   nameInput, 
   jobInput, 
   cardNameInput, 
   cardLinkInput, 
   avatarInput, 
   placesList,
   popupForm,
   deletePopup,
   avatarFormElement,
   newPlaceElement,
   popupImage,
   popupImageCaption,
   popupInput
} from "./DOMElements.js";

import { clearValidation, enableValidation , validationConfig } from "./validation.js";
import { initializePopups, openPopupHandlers } from "./popup/index.js";
import { handleAddCardSubmit } from "./popup/addCardPopup.js";

// Валидация 
enableValidation(validationConfig);

// Инициализация попапов
initializePopups();


//Функция открытия окна с кртинкой 
 export const openImage = (cardImg) => {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openModal(popupTypeImage);
};


// Обработчики для попапов
editButton.addEventListener('click', openPopupHandlers.editProfile);
addButton.addEventListener('click', openPopupHandlers.addCard);
profileImage.addEventListener('click', openPopupHandlers.avatar);

//Плавное открытие попапов
const popupList = document.querySelectorAll(".popup");
popupList.forEach((popup) => popup.classList.add("popup_is-animated"));

// Загрузка информации о пользователе и карточек 
const loadUserInfoAndCards = async () => {
  try {
    const [userData, cards] = await Promise.all([getUserInfo(), getInitialCards()]);
    const userId = userData._id;

    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.setAttribute(
      "style",
      `background-image: url('${userData.avatar}')`
    );

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, userId ,openImage);
      placesList.appendChild(cardElement);
    });
  } catch (err) {
    console.error(`Error loading data: ${err}`);
  }
};

// Инициализация данных 
loadUserInfoAndCards();



