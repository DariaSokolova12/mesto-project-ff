import { addNewCard } from '../api.js';
import { createCard } from '../card.js';
import { closeModal , openModal} from '../modal.js';
import { clearValidation , setValidationListeners ,validationConfig } from '../validation.js';
import { handleSubmit } from '../utils.js';
import { addForm, placesList, cardLinkInput, cardNameInput, modalAddCard} from '../DOMElements.js';


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
    closeModal(addForm);
  }, evt);
};
// Функция для открытия попапа с очисткой ошибок
export const openAddCardPopup = () => {
  clearValidation(addForm ,validationConfig);
  setValidationListeners(addForm, validationConfig);
  openModal(modalAddCard);
};

// Инициализация обработчика отправки формы
export const initializeAddCardPopup = () => {
  modalAddCard.addEventListener("submit", handleAddCardSubmit);
};