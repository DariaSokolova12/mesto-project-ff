import { addNewCard } from '../api.js';
import { createCard } from '../card.js';
import { closeModal } from '../modal.js';
import { clearAddCardValidation, enableAddCardValidation } from '../validation/addCardValidation.js';
import { handleSubmit, resetForm } from '../utils.js';
import { DOMElements } from '../DOMElements.js';

const {modalAddCard, placesList} = DOMElements;
const addCardForm = document.querySelector('.popup__form');

// Обработчик отправки формы
export const handleAddCardSubmit = (evt) => {
  handleSubmit(async () => {
    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    const newCard = await addNewCard(cardData);
    const cardElement = createCard(newCard);
    placesList.prepend(cardElement);
    resetForm(addCardForm);
    closeModal(modalAddCard);
  }, evt);
};
// Функция для открытия попапа с очисткой ошибок
export const openAddCardPopup = () => {
  clearAddCardValidation();
  enableAddCardValidation();
};

// Инициализация обработчика отправки формы
export const initializeAddCardPopup = () => {
  addCardForm.addEventListener("submit", handleAddCardSubmit);
};