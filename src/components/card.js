import { likeCardApi, dislikeCard, deleteCard } from './api.js'; 
import { openImage } from './index.js';

// Функция для создания карточки
const createCard = (cardData, userId , openImage) => {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Показываем кнопку удаления только если карточка создана владельцем
  if (cardData.owner._id === userId) {
    deleteButton.style.display = "block";  // Показываем кнопку удаления
    deleteButton.addEventListener("click", () =>  handleDeleteCard(cardElement,cardData._id)); // Обработчик удаления
  } else {
    deleteButton.style.display = "none";  // Скрываем кнопку удаления
  };

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик нажатия на кнопку лайк
  likeButton.addEventListener("click", (event) => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      handleDislikeCard(cardData._id, likeButton);  // Снимаем лайк
    } else {
      handleLikeCard(cardData._id, likeButton);  // Ставим лайк
    }
  });

  cardImage.addEventListener("click", () => {
    openImage(cardImage);
  });

  return cardElement;
};


// Функция для удаления карточки
const handleDeleteCard = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
};


// Функция для постановки лайка
const handleLikeCard = (cardId, likeButton) => {
  likeCardApi(cardId)  
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
