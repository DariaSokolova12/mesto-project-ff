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

import { DOMElements } from "./DOMElements.js";
import { enableValidation } from "./validation/Validation.js";
import { initializePopups, openPopupHandlers } from "./popup/index.js";

// Инициализация попапов
initializePopups();

// Обработчики для попапов
DOMElements.editButton.addEventListener('click', openPopupHandlers.editProfile);
DOMElements.addButton.addEventListener('click', openPopupHandlers.addCard);
DOMElements.avatarEditButton.addEventListener('click', openPopupHandlers.avatar);

// Загрузка информации о пользователе и карточек 
const loadUserInfoAndCards = async () => {
  try {
    const [userData, cards] = await Promise.all([getUserInfo(), getInitialCards()]);
    const userId = userData._id;

    DOMElements.profileTitle.textContent = userData.name;
    DOMElements.profileJob.textContent = userData.about;
    DOMElements.profileImage.src = userData.avatar;

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, userId);
      DOMElements.placesList.appendChild(cardElement);
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
    const userData = await updateUserInfo(DOMElements.nameInput.value, DOMElements.jobInput.value);
    updateUserInfoInDOM(userData, DOMElements.profileTitle, DOMElements.profileJob);
    closeModal(DOMElements.modalEditProfile);
  } catch (err) {
    handleError(err);
  } finally {
    hideLoading(submitButton);
  }
};

// Обработчик добавления нового места 
const submitAddForm = (evt) => {
  handleSubmit(async () => {
    const cardData = {
      name: DOMElements.cardNameInput.value,
      link: DOMElements.cardLinkInput.value,
    };
    const newCard = await addNewCard(cardData);
    const cardElement = createCard(newCard);
    DOMElements.placesList.prepend(cardElement);
    resetForm(DOMElements.addForm);
    closeModal(DOMElements.modalAddCard);
  }, evt);
};

// обработчики форм
DOMElements.editProfileForm.addEventListener("submit", submitEditProfileForm);
DOMElements.addForm.addEventListener("submit", submitAddForm);

// Очистка и открытие окна редактирования профиля
DOMElements.editButton.addEventListener("click", () => {
  clearValidation(DOMElements.editProfileForm);
  openModal(DOMElements.modalEditProfile);
});

// Очистка и открытие окна добавления карточки 
DOMElements.addButton.addEventListener("click", () => {
  clearValidation(DOMElements.addForm);
  openModal(DOMElements.modalAddCard);
});

// Валидация 
enableValidation(validationConfig);

