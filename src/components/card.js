import { openModal } from "./modal";

const createCard = (cardData) => {
  // Создание нового карточного элемента
  const cardTemplate = document.querySelector("#card-template").content;
  // Клонируем шаблон карточного элемента
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  // Получаем элементы карточного элемента
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // Устанавливаем значения карточного элемента
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  // Добавляем обработчик удаления карточного элемента
  const deleteIcon = cardElement.querySelector(".card__delete-button");
  deleteIcon.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  // Добавляем обработчик нажатия на кнопку "Like"
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (event) => likeCard(event));
  // Добавляем обработчик нажатия на картинку
  cardImage.addEventListener("click", () => clickHandleImage(cardData));
  
  return cardElement;
}

/**
 * Обработчик клика по изображению
 */
const clickHandleImage = (cardData) => {
  const previewImage = document.querySelector(".popup__image");
  const previewImageModal = document.querySelector(".popup_type_image");
  const captionModal = document.querySelector(".popup__caption");
  // Проверяем, что элементы модального окна существуют
  if (previewImage && previewImageModal && captionModal) {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    captionModal.textContent = cardData.name;
    openModal(previewImageModal); // Открытие модального окна с изображением
  } else {
    console.error(
      "Не удалось найти элементы модального окна просмотра изображения",
    );
  }
};

/**
 * Удаление карточного элемента
 */
const deleteCard = (cardElement) => {
  if (cardElement) cardElement.remove();
};

/**
 * Обработчик нажатия на кнопку "Like"
 */
const likeCard = (evt) => {
  const cardLikeButton = evt.target;
  cardLikeButton.classList.toggle("card__like-button_is-active");
};

// Экспортируем функции для использования в других файлах
export { createCard };
