import { deleteCard } from './api.js'; 

const createCard = (cardData, userId) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Показываем кнопку удаления только если карточка создана вами
  if (cardData.owner._id === userId) {
    deleteButton.style.display = "block";  // Показываем кнопку удаления
    deleteButton.addEventListener("click", () => deleteCard(cardData._id)); // Обработчик удаления
  } else {
    deleteButton.style.display = "none";  // Скрываем кнопку удаления
  }

  return cardElement;
};

export { createCard };
