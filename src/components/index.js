import "../index.css";
import { initialCards } from "./cards";
import { createCard } from "./card";
import { openModal, closeModal } from "./modal";
import {enableValidation ,clearValidation} from "./validation";

// DOM узлы
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileJob = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const modalEditProfile = document.querySelector(".popup_type_edit");
const editProfileForm = modalEditProfile.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');
const modalAddCard = document.querySelector(".popup_type_new-card");
const addForm = modalAddCard.querySelector(".popup__form");
const cardNameInput = addForm.querySelector('input[name="place-name"]');
const cardLinkInput = addForm.querySelector('input[name="link"]');
const editFormElement = document.forms["edit-profile"];

/**
 * Отрисовывает инициализирующие карточные элементы
 */
const renderInitialCards = () => {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData);
    placesList.appendChild(cardElement);
  });
};
// Инициализация карточек при загрузке страницы
renderInitialCards();

/**
 * Открывает модальное окно редактирования профиля
 */
const openModalEditProfile = () => {
  openModal(modalEditProfile);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
};

/**
 * Открывает модальное окно добавления места
 */
const openModalAddCard = () => {
  openModal(modalAddCard);
};

/**
 * Обработчик отправки формы редактирования профиля
 */
const submitEditProfileForm = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editProfileForm.reset();

  closeModal(modalEditProfile);
};

/**
 * Обработчик отправки формы добавления места
 */
const submitAddForm = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const addCard = createCard(cardData);

  placesList.prepend(addCard);
  addForm.reset();
  closeModal(modalAddCard);
};

// Установка слушателя на кнопку открытия формы редактирования профиля
editButton.addEventListener("click", () => {
  clearValidation(editFormElement,enableValidation);
  openModal(modalEditProfile);
});

// Установка слушателя на кнопку открытия формы добавления карточки
addButton.addEventListener("click", () => {
  clearValidation(modalAddCard,enableValidation);
  openModal(modalAddCard);
});

// События для открытия модальных окон
editButton.addEventListener("click", openModalEditProfile);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addButton.addEventListener("click", openModalAddCard);
addForm.addEventListener("submit", submitAddForm);
