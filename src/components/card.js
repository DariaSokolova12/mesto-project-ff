import { likeCardApi, dislikeCard, deleteCard } from './api.js'; 

// Функция для создания карточки
const createCard = (cardData, userId) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Отображаем количество лайков
  likeCount.textContent = cardData.likes.length;

  // Показываем кнопку удаления только если карточка создана вами
  if (cardData.owner._id === userId) {
    deleteButton.style.display = "block";  // Показываем кнопку удаления
    deleteButton.addEventListener("click", () => handleDeleteCard(cardData._id)); // Обработчик удаления
  } else {
    deleteButton.style.display = "none";  // Скрываем кнопку удаления
  }

  // Обработчик нажатия на кнопку лайк
  likeButton.addEventListener("click", (event) => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      handleDislikeCard(cardData._id, likeButton);  // Снимаем лайк
    } else {
      handleLikeCard(cardData._id, likeButton);  // Ставим лайк
    }
  });

  return cardElement;
};

// Функция для удаления карточки
const handleDeleteCard = (cardId) => {
  deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
    })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
};

// Функция для постановки лайка
const handleLikeCard = (cardId, likeButton) => {
  likeCardApi(cardId)  // Используем импортированную функцию likeCardApi для отправки запроса на сервер
    .then((updatedCard) => {
      likeButton.classList.add('card__like-button_is-active');
      const likeCount = likeButton.nextElementSibling;  // Получаем элемент с количеством лайков
      likeCount.textContent = updatedCard.likes.length;  // Обновляем количество лайков
    })
    .catch((err) => console.log(`Ошибка при постановке лайка: ${err}`));
};

// Функция для снятия лайка
const handleDislikeCard = (cardId, likeButton) => {
  dislikeCard(cardId)
    .then((updatedCard) => {
      likeButton.classList.remove('card__like-button_is-active');
      const likeCount = likeButton.nextElementSibling;  // Получаем элемент с количеством лайков
      likeCount.textContent = updatedCard.likes.length;  // Обновляем количество лайков
    })
    .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
};


export { createCard };
