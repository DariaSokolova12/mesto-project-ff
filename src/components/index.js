import "../index.css";
import { createCard } from "./card";
import { openModal, closeModal } from "./modal";
import { validationConfig, enableValidation, clearValidation } from "./validation";
import { getUserInfo, getInitialCards, addNewCard, updateUserInfo, deleteCard, likeCardApi, dislikeCard, updateAvatar } from './api.js';
import { DOMElements } from "./DOMElements.js";
// Загрузка данных о пользователе и карточках
const loadUserInfoAndCards = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) =>  {


      const userId = userData._id;

      profileTitle.textContent = userData.name;
      profileJob.textContent = userData.about;
      profileImage.src = userData.avatar;

      cards.forEach((cardData) => {
       const cardElement = createCard(cardData, userId); // Передаем ID пользователя
       placesList.appendChild(cardElement);
      });
    })
    
    .catch((err) => console.log(`Ошибка при загрузке данных ${err}`));
};

// Инициализация данных
loadUserInfoAndCards();

//Открывает модальное окно редактирования профиля 
const openModalEditProfile = () => {
  openModal(modalEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
};

// Открытие модального окна добавления карточки
const openModalAddCard = () => {
  openModal(modalAddCard);
};

// Обработчик отправки формы редактирования профиля
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  updateUserInfo(nameInput.value, jobInput.value)
    .then((updatedData) => {
      profileTitle.textContent = updatedData.name;
      profileJob.textContent = updatedData.about;
      profileImage.src = updatedData.avatar;
      closeModal(modalEditProfile);
    })
    .catch((err) => console.log(`Ошибка при редактировании профиля: ${err}`));
};

// Обработчик отправки формы добавления нового места
const submitAddForm = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addNewCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      placesList.prepend(cardElement);
      addForm.reset();
      closeModal(modalAddCard);
    })
    .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
};


// Установка слушателей для открытия модальных окон
editButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  openModal(modalEditProfile);
});

addButton.addEventListener("click", () => {
  clearValidation(addForm, validationConfig);
  openModal(modalAddCard);
});

// Добавление событий для отправки форм
editProfileForm.addEventListener("submit", submitEditProfileForm);
addForm.addEventListener("submit", submitAddForm);

// Включаем валидацию
enableValidation(validationConfig);

