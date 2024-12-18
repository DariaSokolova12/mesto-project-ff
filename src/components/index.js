import "../index.css";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import {
  getUserInfo,
  updateUserInfo,
  getInitialCards,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./api.js";

getUserInfo()
  .then((userData) => {
    console.log("Данные пользователя:", userData);
  })
  .catch((err) => console.error("Ошибка загрузки пользователя:", err));

import {
  showLoading,
  hideLoading,
  handleSubmit,
  resetForm,
  checkResponse,
  handleError,
  updateUserInfoInDOM
} from "./utils.js";

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
   editProfileForm, 
   addForm, 
   avatarForm, 
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
   popupImageCaption
} from "./DOMElements.js";

import { clearValidation, enableValidation , validationConfig } from "./validation.js";
import { initializePopups, openPopupHandlers } from "./popup/index.js";
import { handleAddCardSubmit } from "./popup/addCardPopup.js";

// Валидация 
enableValidation(validationConfig);

// Инициализация попапов
initializePopups();

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
      const cardElement = createCard(cardData, userId);
      placesList.appendChild(cardElement);
    });
  } catch (err) {
    console.error(`Error loading data: ${err}`);
  }
};

// Инициализация данных 
loadUserInfoAndCards();

// Обработчик для формы редакцирования профиля 
const submitEditProfileForm = async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  showLoading(submitButton, "Сохранение...");
  try {
    const userData = await updateUserInfo(nameInput.value, jobInput.value);
    updateUserInfoInDOM(userData, profileTitle, profileJob);
    closeModal(modalEditProfile);
  } catch (err) {
    handleError(err);
  } finally {
    hideLoading(submitButton);
  }
};

// обработчики форм
editProfileForm.addEventListener("submit", submitEditProfileForm);
addForm.addEventListener("submit", handleAddCardSubmit);

// Очистка и открытие окна редактирования профиля
editButton.addEventListener("click", () => {
  clearValidation(editProfileForm ,validationConfig);
  openModal(modalEditProfile);
});

// Очистка и открытие окна добавления карточки 
addButton.addEventListener("click", () => {
  clearValidation(addForm, validationConfig);
  openModal(modalAddCard);
});

profileImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarForm);
});



